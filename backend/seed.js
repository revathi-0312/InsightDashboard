require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Sale = require("./models/Sale");

const categories = ["Electronics", "Clothing", "Books", "Furniture"];
const statuses = ["Completed", "Pending", "Cancelled"];
const products = [
  "Laptop", "Mobile", "Shirt", "Table",
  "Chair", "Headphones", "Novel", "Watch"
];

const generateSales = () => {
  const sales = [];

  for (let i = 0; i < 50; i++) {
    sales.push({
      product: products[Math.floor(Math.random() * products.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: Math.floor(Math.random() * 5000) + 500,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
    });
  }

  return sales;
};

const User = require("./models/User");
const bcrypt = require("bcryptjs");

const seedData = async () => {
  try {
    await connectDB();

    await Sale.deleteMany(); // clear existing sales
    await Sale.insertMany(generateSales());

    await User.deleteMany(); // clear existing users
    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: hashedPassword
    });

    console.log("Database seeded successfully with sales and test user (admin@test.com / password123)");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();