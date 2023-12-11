const asyncHandler = require("express-async-handler");

const Job = require("../models/jobModel");

const getJobs = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 30,
      position,
      company,
      location,
      sort,
    } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (position) {
      query.position = { $regex: new RegExp(position, "i") };
    }

    if (company) {
      query.company = { $regex: new RegExp(company, "i") };
    }

    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }

    const sortOptions = {};

    if (sort) {
      switch (sort) {
        case "position":
          sortOptions.position = 1;
          break;
        case "company":
          sortOptions.company = 1;
          break;
        case "location":
          sortOptions.location = 1;
          break;
        case "postedAt":
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
});

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
//     console.log(req);
//     // console.log(createdBy)
//     const { _id: createdBy } = req.user;
//     /*     console.log(typeof _id)
//     const createdBy = _id;
//     console.log(typeof createdBy)
//     console.log("createdBy:",createdBy)
//     console.log("_id:",_id) */
//     const jobData = { ...req.body, created_by: createdBy };
//     const job = await Job.create(jobData);
//     console.log(job);
//     res.status(201).json(job);
//     console.log(res);
//   } catch (err) {
//     // console.log('',res);
//     console.log(err.message);
//     res.status(400).json({ error: err.message });
//   }
//   // console.log(req.body.user);
//   // res.status(200).json({message: "request received"});
// });

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

// const updateJob = asyncHandler(async (req, res) => {
//   if (req?.user?.role === 'admin') {
//     return res.status(403).json({ message: 'Permission denied in setjob' });
//   }
//   try {
//     const { _id: updatedBy } = req?.user;

//     req.body.updated_by = updatedBy;

//     const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(job);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

const updateJob = asyncHandler(async (req, res) => {
  try {
    const { _id: updatedBy } = req.user;

    req.body.updated_by = updatedBy;

    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const deleteJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(400);
      throw new Error("Job not Found");
    }
    await Job.findByIdAndRemove(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const getJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId)
      .populate("created_by", "first_name last_name")
      .populate("updated_by", "first_name last_name");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
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
    res.status(500).json({ message: "Internal Server Error" });
  }
});
const getSkills = asyncHandler(async (req, res) => {
  try {
    const skills = await Job.distinct('skills');
    res.status(200).json({ skills });
    // console.log(skills)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skills' });
  }
});

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  getJob,
  getSkills
};
