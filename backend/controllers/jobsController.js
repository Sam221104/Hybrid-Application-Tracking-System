const Job = require('../models/Jobs');
const mongoose = require('mongoose');
const Application = require('../models/Application');
const Logs = require('../models/Logs');

exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });

    const { title, description, type, requirements, applicationDeadline, status, location } = req.body;
    const job = await Job.create({
      title,
      description,
      type,
      requirements,
      applicationDeadline: new Date(applicationDeadline),
      createdBy: new mongoose.Types.ObjectId(req.user._id),
      createdAt: new Date(),
      status: status || 'active',
      location: location || 'Remote',
    });
    console.log(job);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const { jobId } = req.query; // or req.params.jobId
    let filter = {};
    if (jobId) filter.job = jobId;

    const applications = await Application.find(filter)
      .populate("applicant", "username email")
      .populate("job", "title");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Application not found' });
    console.log("updateApplicationStatus called for", req.params.id);
    app.status = status;
    if (comment) app.comments.push(comment);
    await app.save();
    console.log("Creating log with updatedBy:", req.user?._id);
   try {
  await Logs.create({
    application: app._id,
    updatedBy: req.user._id,
    role: 'admin',
    status : status,
    comment: comment
      ? `Status updated to ${status} by admin: "Comment: ${comment}"`
      : `Status updated to ${status} by admin`,
  });
} catch (logErr) {
  console.error("Error creating log:", logErr);
}

    res.json({ message: 'Status updated successfully', app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { status: req.body.status },
      { new: true }
    );
     if (req.body.status === "closed") {
      await Application.updateMany(
        { job: job._id },
        { status: "closed" }
      );
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};