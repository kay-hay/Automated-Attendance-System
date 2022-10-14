const mongoose = require ("mongoose")

const courseSchema = new mongoose.Schema({
    
    courseCode: {
        type:String
    },
    courseName:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Courses",courseSchema);

