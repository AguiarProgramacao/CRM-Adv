const express = require("express");
const router = express.Router();
const googleController = require("../controllers/googleController");
const { auth } = require("../middlewares/authMiddleware");

router.get("/auth", googleController.authRedirect);
router.get("/callback", googleController.authCallback);
router.get("/status", auth, googleController.getStatus);

module.exports = router;
