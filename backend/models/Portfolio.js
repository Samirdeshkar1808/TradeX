const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    investedAmount:{
        type:Number,
        default:0
    },

    availableBalance:{
        type:Number,
        default:50000
    },

 }, {timestamps:true});

 module.exports = mongoose.model("Portfolio",portfolioSchema);