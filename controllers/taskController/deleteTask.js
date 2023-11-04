const knex = require("../../DB/db");

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    const task = knex("Task.tasks")
    .where({ id: id })
    .del()
    if (!task) {
        res.status(404).json({
            message: "Can not find task",
        })
    }
    res.status(200).json({
        message: "Task deleted successfully",
        task: task
    });
  } catch (err) {}
};
module.exports = { deleteTask };
