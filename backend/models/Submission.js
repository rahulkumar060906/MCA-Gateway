const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  subject: { type: String },
  answers: [{ question: String, answer: String }],
  totalScore: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);