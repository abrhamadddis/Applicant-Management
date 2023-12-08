const asyncHandler = require('express-async-handler')
const cron = require('node-cron');
const Job = require('../models/jobModel')

const getJobs = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, position, company, location, sort } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (position) {
      query.position = { $regex: new RegExp(position, 'i') };
    }

    if (company) {
    query.company = { $regex: new RegExp(company, 'i') };
    }

    if (location) {
    query.location = { $regex: new RegExp(location, 'i') };
    }

    const sortOptions = {};

    if (sort) {
      switch (sort) {
        case 'position':
          sortOptions.position = 1;
          break;
        case 'company':
          sortOptions.company = 1;
          break;
        case 'location':
          sortOptions.location = 1;
          break;
        case 'postedAt':
          sortOptions.postedAt = -1;
          break;
        default:
          sortOptions.postedAt = -1;
          break;
      }
    }

    const jobs = await Job.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortOptions);

    res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
})

// const setJob = asyncHandler(async (req, res) => {
//   try {
//     const job = await Job.create(req.body);
//     res.status(201).json(job);
//   } catch (err) {
//     res.status(400)
//     throw new Error('Missed required feiled or Wrong data typee')
//   }
// })

const setJob = asyncHandler(async (req, res) => {
  try {
    const { _id: createdBy } = req.user;
    const jobData = { ...req.body, created_by: createdBy };
    const job = await Job.create(jobData);

    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: 'Missed required field or wrong data type' });
  }
});


// const setJob = asyncHandler(async (req, res) => {
//   try {
//     const { _id: createdBy } = req.user;
//     const { user_id, ...jobData } = req.body;

//     const job = await Job.create({
//       ...jobData,
//       user_id,
//       created_by: createdBy,
//     });

//     res.status(201).json(job);
//   } catch (err) {
//     res.status(400).json({ error: 'Missed required field or wrong data type' });
//   }
// });

// const updateJob = asyncHandler(async (req, res) => {
//   try {
//     const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(job);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// })

const updateJob = asyncHandler(async (req, res) => {
  try {
    const { _id: updatedBy } = req.user;

    req.body.updated_by = updatedBy;

    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const updateJobsStatus = async () => {
  try {
    const today = new Date();

    const expiredJobs = await Job.find({ job_end_date: { $lt: today }, is_active: true });

    if (expiredJobs.length > 0) {
      await Job.updateMany(
        { _id: { $in: expiredJobs.map((job) => job._id) } },
        { $set: { is_active: false } }
      );
      console.log('Updated jobs status');
    }
  } catch (error) {
    console.error('Error updating jobs:', error);
  }
};

cron.schedule('0 0 * * *', updateJobsStatus);


const deleteJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if(!job) {
      res.status(400)
      throw new Error('Job not Found')
    }
    // await Job.findByIdAndRemove(req.params.id);

    job.is_archive = true;
    res.status(200).json({id: req.params.id});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

const getJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId)
      .populate('created_by', 'first_name last_name')
      .populate('updated_by', 'first_name last_name');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({
      company: job.company,
      title: job.title,
      experience: job.experience,
      location: job.location,
      created_by: job.created_by,
      updated_by: job.updated_by,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  getJob,
}