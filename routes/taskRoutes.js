const express = require('express');
const router = express.Router();
const { createTask } = require('../controllers/taskController/createTask');
const { getTask } = require('../controllers/taskController/getTask');
const { deleteTask } = require('../controllers/taskController/deleteTask');
const { updateTasks } = require('../controllers/taskController/updateTask')

router.post('/api/tasks', createTask);
router.get('/api/tasks/:id', getTask);
router.put('/api/tasks/:id', updateTasks);
router.delete('/api/tasks/:id', deleteTask);

module.exports = router;