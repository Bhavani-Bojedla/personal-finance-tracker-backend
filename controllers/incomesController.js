const Income = require("../Model/incomeSchema");
const User = require("../Model/userSchema");

// Create income
const createIncome = async (req, res) => {
  try {
    const { IncomeText, IncomeCost, IncomeDate, userId } = req.body;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const income = new Income({
      IncomeText,
      IncomeCost: Number(IncomeCost),
      IncomeDate,
      users: existingUser._id,
    });

    await income.save();
    existingUser.income.push(income._id);
    await existingUser.save();

    res.status(200).json(income);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Get incomes by user ID
const getIncomes = async (req, res) => {
  try {
    const userId = req.params.id;
    const income = await Income.find({ users: userId }).sort({ createdAt: -1 });
    if (income.length !== 0) {
      res.status(200).json({income});
    } else {
      res.status(200).json([]);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Delete income by ID
const deleteIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const income = await Income.findById(incomeId);
    if (!income) return res.status(404).json({ message: "Income not found" });

    const user = await User.findById(income.users);
    if (user) {
      user.income.pull(incomeId);
      await user.save();
    }

    await Income.findByIdAndDelete(incomeId);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { createIncome, getIncomes, deleteIncome };
