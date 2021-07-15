const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const usersController = require("../controllers/usersController");

router.get('/users', authMiddleware, usersController.getUsers);

module.exports = router;