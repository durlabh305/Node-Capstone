// modal - where our scehmas go
// view - it's our ui part/ presentation layer
//controller - where we are maintaining our logics
// routes - routes are endpoint
//mvc

const express = require('express');
const router = express.Router();
// we are calling user.js of controller in auth.js
const authController = require("../controller/user")

router.post('/register', authController.registeruser);
router.post('/login', authController.loginuser);

module.exports = router;