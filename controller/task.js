
const Task = require('../Models/Task')

exports.getTaskById = async (req, res , next) => {

    try {
        const task = await Task.findById(req.params.taskId);
        res.json(task)
       
    } catch (err) {
        console.log(err.message)
    }
}

exports.deleteTaskById = async (req, res) => {
    try {
        const deleteTask = await Task.findById(req.params.taskId);

        await deleteTask.remove();

        res.status(200).json({msg : "Task Deleted"});

    } catch (err) {
        console.log(err.messages);
        return res.status(500).send('server error')
    }
}