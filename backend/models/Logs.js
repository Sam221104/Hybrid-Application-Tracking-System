const mongoose = require('mongoose');

const logs = new mongoose.Schema({
  application: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application', 
    required: true 
  },

  updatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  role: { 
    type: String, 
    enum: ['applicant', 'admin', 'bot'], 
    required: true 
  },

  status: { 
    type: String, 
    enum: ['applied', 'reviewed', 'interview', 'offer'] 
  },

  comment: { 
    type: String 
  },

  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Logs', logs);