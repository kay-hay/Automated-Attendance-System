const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const registrationSchema = new mongoose.Schema({
  email:{
        type: String,
        required:true,
        min: 6,
        max:255
    },
    lecturer_id:{
        type: Number,
        required:true,
        
    },
    password:{
        type: String,
        required:true,
        min: 6,
        max:1024
    },
    department:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default: Date.now
    }

})

registrationSchema.plugin(passportLocalMongoose, {usernameField: 'lecturer_id'})

module.exports = mongoose.model("Registration", registrationSchema);