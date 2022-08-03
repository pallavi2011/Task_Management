const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Task = require('../../models/Tasks');



// Get all tasks
router.get('/', async (req, res) => {
    let tasks = await Task.find({});
    res.send(tasks);
});

// Create a task
router.post('/',[
    check('task_description', 'task description is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {task_description} = req.body;
    try {
        let task = new Task({task_description});
        await task.save();
        
        res.status(200).json(task);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
    
});




module.exports = router;