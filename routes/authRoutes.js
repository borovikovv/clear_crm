const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.post('/login', authController.login);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);

module.exports = router;