const express = require('express');
const router = express.Router();
const {
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidate,
  getAllCandidates,
} = require('../controllers/candidateController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, createCandidate);
router.put('/:id', authMiddleware, adminMiddleware, updateCandidate);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCandidate);
router.get('/:id', authMiddleware, adminMiddleware, getCandidate);
router.get('/', authMiddleware, adminMiddleware, getAllCandidates);

module.exports = router;
