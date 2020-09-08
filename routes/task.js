const express = require('express');
const User = require('../Models/User');
const Task = require('../Models/Task')
const auth = require('../middleware/auth');



const router = express.Router();

//@desc post a task
//route /task/
//access private

router.post('/' , auth , async (req, res) => { 
    try {
        const  {title , info} = req.body
        const task = await Task({
           title,
           info,
           user: req.user.id
        });

        await task.save();

        const userById = await User.findById(req.user.id);

        userById.tasks.push(task);

        await userById.save();

        res.json({msg : "task created"});

    } catch (err) {
        console.log(err.message);
        return res.status(500).send('server error')
    }
});

//@route /tasks/
//@desc GET all task by user
//@access private

router.get('/' , auth ,  async (req, res) => {
  try {

      const taskByUserId = await User.findById(req.user.id).populate('tasks');
      res.json(taskByUserId.tasks)

  } catch (err) {
      console.log(err.message);
      return res.status(500).send('server error')
  }
})

//@route /tasks/
//@desc delete a task
//@access private

router.delete('/:taskId', auth , async (req, res) => {
    try {
        const deleteTask = await Task.findOne(req.params.taskId);

        await deleteTask.remove();

        res.status(200).json({msg : "Task Deleted"});

    } catch (err) {
        console.log(err.messages);
        return res.status(500).send('server error')
    }
})

module.exports = router