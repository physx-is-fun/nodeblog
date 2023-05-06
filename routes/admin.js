const express = require('express');
const router = express.Router();
const adminControllers = require('./../controllers/admin');
const rateLimit = require('./../middlewares/ratelimit');
const { authentication } = require('./../middlewares/authentication');
const { authorization } = require('./../middlewares/authorization');
const statusMonitor = require('express-status-monitor')({ path: '' });

//Simple, self-hosted module based on Socket.io and Chart.js to report realtime server metrics for Express-based node servers.
router.use(statusMonitor.middleware);

router.get('/', rateLimit.getAdmin, authentication, authorization, adminControllers.getAdmin);
router.get('/status', rateLimit.getStatusMonitor, authentication, authorization, statusMonitor.pageRoute);
router.get('/categories',rateLimit.getAdminCategories, authentication, authorization, adminControllers.getAdminCategories);
router.get('/headings',rateLimit.getAdminHeadings, authentication, authorization, adminControllers.getAdminHeadings);
router.get('/tags',rateLimit.getAdminTags, authentication, authorization, adminControllers.getAdminTags);
router.get('/posts', rateLimit.getAdminPosts, authentication, authorization, adminControllers.getAdminPosts);

module.exports = router;