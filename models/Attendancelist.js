const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption")
const passportLocalMongoose = require("passport-local-mongoose")
const attendancelistSchema = new mongoose.Schema({
    student_id:{
        type: Number,
        required:true
    },
    student_name:{
        type: String,
        required: true
    },
    time:{
        type:Date,
        default:Date.now

    },
    date:{
        type: Date,
        default:Date.now
    },
    course:{
        type: String,
        required:true
    }
}, { timestamps: true },)


module.exports = mongoose.model("Attendancelist",attendancelistSchema)