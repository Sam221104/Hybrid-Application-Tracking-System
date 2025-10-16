const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Jobs', 
    required: true 
  },

  applicant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  resume: { 
    type: String 
  },

  status: { 
    type: String, 
    enum: [
      'applied', 
      'reviewed', 
      'interview', 
      'shortlisted', 
      'rejected', 
      'offer'
    ], 
    default: 'applied' 
  },

  appliedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Application', applicationSchema);
