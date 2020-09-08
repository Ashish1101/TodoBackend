const express = require('express');
const User = require('../Models/User');
const Task = require('../Models/Task')
const auth = require('../middleware/auth');
const TaskController = require('../controller/task')


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

router.delete('/:taskId', auth , TaskController.deleteTaskById )

//@desc Get Single post By id
//@access private

router.get('/:taskId' , auth , TaskController.getTaskById)

module.exports = router