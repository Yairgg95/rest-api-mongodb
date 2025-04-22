const { Router } = require("express");
const authControllers = require("../controllers/authControllers");

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authControllers.login(email, password);
    res.json({
      success: true,
      data: { token },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
