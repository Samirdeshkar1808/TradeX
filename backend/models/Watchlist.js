const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const watchlistSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    stock: {
      type:Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },

    

},{timestamps:true});

watchlistSchema.index({ user: 1, stock: 1 },{ unique: true });

module.exports =  mongoose.model("Watchlist",watchlistSchema);