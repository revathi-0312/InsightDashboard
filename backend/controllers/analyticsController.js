const Sale = require("../models/Sale");

exports.getSalesData = async (req, res) => {
  try {
    const { startDate, endDate, category, status } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (category) filter.category = category;
    if (status) filter.status = status;

    const sales = await Sale.find(filter);

    res.json(sales);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};