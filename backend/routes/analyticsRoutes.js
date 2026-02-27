const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/analytics/sales
// Supports filters: ?category=Electronics&status=Completed&from=2024-01-01&to=2024-12-31
router.get("/sales", authMiddleware, async (req, res) => {
  try {
    const { category, status, from, to } = req.query;

    const filter = {};

    if (category && category !== "All") filter.category = category;
    if (status && status !== "All") filter.status = status;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const sales = await Sale.find(filter).sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;