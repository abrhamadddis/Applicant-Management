// const mongoose = require('mongoose');

// const jobSchema = mongoose.Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   new: { type: Boolean, required: [true, 'This filed cant be empty'] },
//   featured: { type: Boolean, required: [true, 'This filed cant be empty'] },
//   location: { type: String },
//   job_type: { type: String },
//   experience: { type: String },
//   job_summary: { type: String },
//   job_end_date: { type: Date},
//   postedAt: { type: Date, default: Date.now },
//   responsibilities: { type: String },
//   requirements: { type: Array },
//   is_active: { type: Boolean, default: true },
//   created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// }, {
//   timestamps: true,
// });

// module.exports = mongoose.model('Job', jobSchema);


const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  title: { type: String, required: true },
  company: { type: String, required: true },
  new: { type: Boolean, required: [true, 'This filed cant be empty'] },
  featured: { type: Boolean, required: [true, 'This filed cant be empty'] },
  location: { type: String },
  job_type: { type: String },
  experience: { type: String },
  job_summary: { type: String },
  postedAt: { type: Date, default: Date.now },
  job_end_date: { type: Date, default: Date.now },
  responsibilities: { type: String },
  // skills: { type: String, enum: ['HTML', 'CSS', 'JavaScript', 'ReactJS'] },
  skills: [{ type: String, enum: ['HTML', 'CSS', 'JavaScript', 'ReactJS'] }],
  is_active: { type: Boolean, default: true },
  is_archive: { type: Boolean, default: false },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema);