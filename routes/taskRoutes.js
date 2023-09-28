const express = require('express');
const router = express.Router();
const { createTask } = require('../controllers/taskController/createTask');

router.post('/api/tasks', createTask);

module.exports = router;