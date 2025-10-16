const router = require('express').Router();
const jobsController = require('../controllers/jobsController');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, jobsController.createJob);

router.get('/', authMiddleware, jobsController.getJobs);

router.get('/:jobId/applications', authMiddleware, jobsController.getApplications);
router.patch('/:jobId', jobsController.updateJobStatus);

module.exports = router;
