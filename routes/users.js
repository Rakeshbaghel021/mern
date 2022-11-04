const router = require("express").Router();
const userCtrl = require("../Controllers/userController");
const auth = require("../middlewares/auth");

// register

router.post("/register", userCtrl.registerUser);

//login

router.post("/login", userCtrl.loginUser);

//verify token

router.get("/verify", userCtrl.verifiedToken);

// get all users
router.get("/allusers", userCtrl.getAllusers);

module.exports = router;
