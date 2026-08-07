const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate saved job records for the same user
savedJobSchema.index({ user: 1, job: 1 }, { unique: true });

const SavedJob = mongoose.model('SavedJob', savedJobSchema);
module.exports = SavedJob;
