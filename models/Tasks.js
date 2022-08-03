const mongoose = require('mongoose');
const User = require('../models/User');

const TaskSchema = new mongoose.Schema({
    task_description:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    assignedTo:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    statusLogs:[
        {   
            status:{
                type:String,
                enum:['created', 'in progress', 'completed', 'closed']
            },
            updatedAt:{
                type: Date,
                default: Date.now
            },
            updatedBy:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'user'
            }
            
        }
        

    ]
});

module.exports = Task = mongoose.model('task', TaskSchema);