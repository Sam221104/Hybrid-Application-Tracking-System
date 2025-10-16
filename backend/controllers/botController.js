const Application = require('../models/Application');
const Logs = require('../models/Logs');
const User = require('../models/User');

// Run Bot Mimic: progress technical applications
exports.runBotMimic = async (req, res) => {
  try {
    // Fetch all technical applications that are not yet "offer"
    const applications = await Application.find({ status: { $ne: "offer" } })
      .populate('job')
      .populate('applicant');

    if (!applications.length) return res.json({ message: "No applications to update" });

    const statusFlow = ["applied", "reviewed", "interview", "offer"];
    const botUser = await User.findOne({ role: 'bot' });
    if (!botUser) return res.status(500).json({ error: "No bot user found" });

    for (let app of applications) {
      if (app.job.type !== "technical") continue; 

      const currentIndex = statusFlow.indexOf(app.status);
      if (currentIndex === -1 || currentIndex === statusFlow.length - 1) continue; 

      const nextStatus = statusFlow[currentIndex + 1];

      app.status = nextStatus;
      await app.save();
      if(nextStatus === 'rejected') {
          nextStatus = 'offer';
      }
      const botUser = await User.findOne({ role: 'bot' });
    const log = await Logs.create({
    application: app._id,
    updatedBy: botUser._id,
    role: 'bot',
    status: nextStatus,
    comment: `Automated update by Bot Mimic to ${nextStatus}`,
  });
    }
    console.log(`Bot Mimic updated ${applications.length} applications`);

    res.json({ message: "Bot Mimic run completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Logs.find()
      .populate({
        path: 'application',
        populate: [
          { path: 'job', select: 'title type' },
          { path: 'applicant', select: 'username' }
        ]
      })
      .populate('updatedBy', 'username role')
      .sort({ timestamp: -1 });

    // Format logs for frontend
    const formattedLogs = logs.map((log) => ({
      _id: log._id,
      jobTitle: log.application?.job?.title || "Unknown",
      applicant: log.application?.applicant?.username || "Unknown",
      status: log.status,
      comment: log.comment || "-",
      updatedBy: log.updatedBy?.username || "Unknown",
      timestamp: log.timestamp,
    }));

    res.json(formattedLogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
