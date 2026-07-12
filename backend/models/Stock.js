const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema({

    symbol: {
      type: String,
      required: true,
      unique:true,
      uppercase : true
    },

    companyName: {
      type: String,
      required: true,
    },

    currentPrice: {
      type: Number,
      required: true,
    },

    dayHigh:Number,

    dayLow:Number,

    change:Number,

    changePercent:Number,

    lastUpdated:Date

  },
  {timestamps: true}
);

module.exports =  mongoose.model("Stock", stockSchema);