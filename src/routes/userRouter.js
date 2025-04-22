const { Router, json } = require("express");
const userControllers = require("../controllers/userControllers");
const auth = require("../middlewares/auth");
const checkOwnership = require("../middlewares/checkOwnerShip");

const router = Router();

router.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userControllers.create(userData);
    res.json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userControllers.getAll();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userControllers.getById(id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedUser = await userControllers.updateById(id, newData);
    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
});

router.delete("/:id", auth, checkOwnership, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userControllers.deleteByID(id);
    res.json({
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
