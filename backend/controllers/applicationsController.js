const Application = require('../models/Application');
const Job = require('../models/Jobs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Logs = require('../models/Logs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

exports.uploadResume = upload.single('resume');

exports.createApplication = async (req, res) => {
  try {
    if (req.user.role !== 'applicant')
      return res.status(403).json({ error: 'Only applicants can apply' });

    const { jobId, coverLetter } = req.body;
    if (!jobId) return res.status(400).json({ error: 'Job ID is required' });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    if (job.status === 'closed') {
      return res.status(400).json({ error: 'This job is closed and cannot accept applications.' });
    }

    const existing = await Application.findOne({ job: jobId, applicant: req.user._id });
    if (existing) return res.status(400).json({ error: 'Already applied for this job' });

    const applicationData = {
      job: jobId,
      applicant: req.user._id,
      comments: coverLetter ? [coverLetter] : [],
      status: 'applied',
    };

    if (req.file) applicationData.resume = req.file.path;

    const application = await Application.create(applicationData);
    await Logs.create({
  application: application._id,
  updatedBy: req.user._id,
  role: 'applicant',
  status: 'applied',
  comment: coverLetter || 'Application submitted by applicant',
});
    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title type description location createdAt')
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getApplicationsForJobs = async (req, res) => {
  try {
      const jobId = req.params.jobId;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "username")
      .populate("job", "title");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.getJobsForApplicants = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, comment } = req.body;
    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ error: "Application not found" });

    application.status = status;
    if (comment) {
      application.logs = application.logs || [];
      application.logs.push({
        status,
        comment,
        timestamp: new Date(),
        updatedBy: req.user?.username || "admin"
      });
    }
    await application.save();
    console.log("Creating log with updatedBy:", req.user?._id);
       try {
      await Logs.create({
        application: applicationId,
  updatedBy: req.user?._id || null,
        role: 'admin',
        status : status,
        comment: comment
          ? `Status updated to ${status} by admin: "Comment: ${comment}"`
          : `Status updated to ${status} by admin`,
      });
    } catch (logErr) {
      console.error("Error creating log:", logErr);
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};