
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const holdingSchema = new Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    stock: {
      type: Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    
    quantity: {
        type : Number,
        required : true,
        min: 0,
    },

    avgBuyPrice: {
      type: Number,
      required: true,
    },

},{timestamps:true});

module.exports = mongoose.model("Holding",holdingSchema);