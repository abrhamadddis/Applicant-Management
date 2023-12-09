const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true },
  phone_number: { type: Number },
  location: { type: String },
  source: { type: String, enum: ['Linkedin', 'Telegram_bot', 'Tiktok', 'Dereja', 'University'] },
  status: { type: String, enum: ['Rejected', 'Interviewed', 'Pending', 'Offered', 'Hired'] },
  status_updated_at:  { type: Date, default: Date.now },
  reason: { type: String },
  CV: { 
    data: Buffer,
    contentType: String
  },
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
