const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({

    fullName:{
        type:String,
        required:true,
        trim : true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim : true
    },

    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },

 }, {timestamps:true}
);

module.exports =  mongoose.model("User",userSchema);