const asyncHandler = require('express-async-handler');
const Candidate = require('../models/candidateModel');

const createCandidate = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const { _id: createdBy } = req.user;
  const candidateData = { ...req.body, user_id: createdBy, created_by: createdBy };

  try {
    const existingCandidate = await Candidate.findOne({email: req.body.email});
    if (existingCandidate) {
      return res.status(400).json({ message: 'Candidate with this email already exists' });
    }

    const candidate = new Candidate(candidateData);
    await candidate.save();

    res.status(201).json({ message: 'Candidate created successfully' });
  } catch (error) {
    console.error('Error in createCandidate:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const updateCandidate = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Permission denied' });
  }
  try {
    const { _id: updatedBy } = req.user;
    req.body.updated_by = updatedBy;

    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(candidate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const deleteCandidate = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Permission denied' });
  }

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
      current_client,
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
      position,
      current_client,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const getAllCandidates = asyncHandler(async (req, res) => {
  try {
    const candidates = await Candidate.find();

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
