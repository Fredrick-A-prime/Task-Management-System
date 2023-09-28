const knex = require('../../DB/db');

const createTask = async (req, res) => {
    try {
        const newTask = await knex('Task.tasks').insert({ 
            ...req.body
        }).returning('*');
        res.status(201).json({
            message: "Task created successfully",
            newTask
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createTask };
