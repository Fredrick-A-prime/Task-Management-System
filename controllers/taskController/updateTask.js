const knex = require("../../DB/db");

const updateTasks = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await knex("Task.tasks")
      .where({ id: id })
      .update({ ...req.body });

    if (!task) {
      res.status(404).json({
        message: "Can not find task",
      });
    };
    res.status(200).json({
        message: "Task updated successfully",
        task: task
    });
  } catch (err) {
    res.status(500).json({
        message: 'error updating task',
        error: err.message
    })
  };
};
module.exports = { updateTasks };
