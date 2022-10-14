const mongoose = require ("mongoose")

const studentlistSchema = new mongoose.Schema({
    student_id:{ 
        type:Number,
        required: true

    },
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true 
    },
    course:{
        type:String,
        required: true
    },
    
}, { timestamps: true },
)
module.exports = mongoose.model("Studentlist", studentlistSchema);