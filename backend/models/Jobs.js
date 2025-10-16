const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String, 
    required: true 
  },

  type: { 
    type: String, 
    enum: ['technical', 'non-technical'], 
    required: true 
  },

  requirements: { 
    type: [String], 
    default: [] 
  },

  status: { 
    type: String, 
    enum: ['active', 'closed'], 
    default: 'active' 
  },

  location: { 
    type: String, 
    default: 'Remote' 
  },

  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  applicationDeadline: { 
    type: Date, 
    required: true 
  }
});

module.exports = mongoose.model('Jobs', jobSchema);
