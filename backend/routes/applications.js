const router = require('express').Router();
const auth = require('../middleware/auth');
const applicationsController = require('../controllers/applicationsController');

router.post(
  '/',
  auth,
  applicationsController.uploadResume,
  applicationsController.createApplication
);
router.get('/applicant', auth, applicationsController.getMyApplications);
router.get('/', auth, applicationsController.getJobsForApplicants);
router.get('/job/:jobId', auth, applicationsController.getApplicationsForJobs);
router.patch('/:applicationId', auth, applicationsController.updateApplicationStatus);

module.exports = router;
