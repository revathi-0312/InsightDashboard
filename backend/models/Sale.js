const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  product: String,
  category: String,
  amount: Number,
  status: String,
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Sale", saleSchema);