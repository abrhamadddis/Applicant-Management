const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: Number },
  location: { type: String },
  source: { type: String, enum: ['Linkedin', 'Telegram_bot', 'Tiktok', 'Dereja', 'University'] },
  status: { type: String, enum: ['Rejected', 'Interviewed', 'Pending', 'Offered'] },
  reason: { type: String },
  CV: { type: String, default: '' },
  overall_feedback: { type: String },
  foreign_name: { type: String },
  position: { type: String },
  current_client:  { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Candidate', candidateSchema);
