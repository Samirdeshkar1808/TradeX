const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({

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

    orderType: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Completed", "Cancelled"],
      default: "Completed",
    },

},{timestamps:true});

module.exports =  mongoose.model("Order", OrderSchema);