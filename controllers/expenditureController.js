const Expenditure = require("../Model/expenditureSchema");
const User = require("../Model/userSchema");

const createExpenditure = async (req, res) => {
  try {
    const { ExpenditureText, ExpenditureDate, ExpenditureCost, ExpenditureCategory, userId } = req.body;
    const existingUser = await User.findById(userId);
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    const expenditure = new Expenditure({
      ExpenditureText,
      ExpenditureDate,
      ExpenditureCost,
      ExpenditureCategory,
      users: userId,
    });

    await expenditure.save();
    existingUser.expenditure.push(expenditure._id);
    await existingUser.save();

    res.status(200).json({ expenditure });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getExpenditure = async (req, res) => {
  try {
    const userId = req.params.id;
    const expenditure = await Expenditure.find({ users: userId }).sort({ createdAt: -1 });
    res.status(200).json({ expenditure });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteExpenditure = async (req, res) => {
  try {
    const { userId } = req.body;
    const expenditureId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, {
      $pull: { expenditure: expenditureId },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    await Expenditure.findByIdAndDelete(expenditureId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createExpenditure,
  getExpenditure,
  deleteExpenditure,
};
