const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true
    },


    date : {
        type: Date,
        default : Date.now 
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

const Task = mongoose.model('task' , taskSchema);

module.exports = Task;