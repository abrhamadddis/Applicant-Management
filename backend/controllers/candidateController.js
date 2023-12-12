const asyncHandler = require('express-async-handler');
const Candidate = require('../models/candidateModel');

const createCandidate = asyncHandler(async (req, res) => {
  const { _id: createdBy } = req.user;

  const {
    first_name,
    last_name,
    phone_number,
    location,
    source,
    status,
    reason,
    overall_feedback,
    foreign_name,
    job_title,
    position,
    current_client,
  } = req.body;

  const email = req.body.email;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: `Candidate with email ${email} already exists` });
    }

    const candidate = new Candidate({
      user_id: createdBy,
      created_by: createdBy,
      first_name,
      last_name,
      email,
      phone_number,
      location,
      source,
      status,
      reason,
      overall_feedback,
      foreign_name,
      job_title,
      position,
      current_client,
    });

    if (req.file) {
      candidate.CV = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await candidate.save();
    res.status(201).json({ message: 'Candidate created successfully', data: candidate });
  } catch (error) {
    console.error('Error in createCandidate:', error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});


const updateCandidate = asyncHandler(async (req, res) => {
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ message: 'Permission denied' });
  // }
  try {
    const { _id: updatedBy } = req.user;
    req.body.updated_by = updatedBy;

    if (req.body.status) {
      req.body.status_updated_at = new Date();
    }

    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(candidate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const deleteCandidate = asyncHandler(async (req, res) => {
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ message: 'Permission denied' });
  // }

  const candidateIdToDelete = req.params.id;

  try {
    const candidateToDelete = await Candidate.findById(candidateIdToDelete);
    if (!candidateToDelete) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    await Candidate.findByIdAndRemove(candidateIdToDelete);

    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error in deleteCandidate:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const getCandidate = asyncHandler(async (req, res) => {
  const candidateId = req.params.id;

  try {
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const {
      user_id,
      first_name,
      last_name,
      email,
      phone_number,
      location,
      source,
      status,
      reason,
      CV,
      overall_feedback,
      foreign_name,
      position,
      job_title,
      company,
    } = candidate;

    res.status(200).json({
      user_id,
      first_name,
      last_name,
      email,
      phone_number,
      location,
      source,
      status,
      reason,
      CV,
      overall_feedback,
      foreign_name,
      job_title,
      position,
      company,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const getAllCandidates = asyncHandler(async (req, res) => {
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
        case 'createdAt':
          sortOptions.createdAt = -1;
          break;
        default:
          sortOptions.createdAt = -1;
          break;
      }
    }

    const candidates = await Candidate.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortOptions);

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: 'No candidates found' });
    }
    // const mappedCandidates = candidates.map((candidate) => ({
    //   user_id: candidate.user_id,
    //   first_name: candidate.first_name,
    //   last_name: candidate.last_name,
    //   email: candidate.email
    // }));

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidate,
  getAllCandidates,
};
