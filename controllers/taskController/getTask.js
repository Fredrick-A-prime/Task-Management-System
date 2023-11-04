const knex = require('../../DB/db');

const getTask = async (req, res) => {
    try {
        const id = req.params.id;

        const task = await knex('Task.tasks').select('*').where({ id: id });
        if (task.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: "Task retrieved successfully",
            task: task
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving task",
            error: error.message
        });
    }
}

module.exports = { getTask };