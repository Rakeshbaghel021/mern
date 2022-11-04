const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: role,
      });
      await newUser.save();

      res.json({ msg: "registered succesfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      //if logi success create a token

      const payload = {
        id: user._id,
        name: user.username,
      };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET);
      // console.log(user, "fg");
      res.json({
        role: user.role,
        token,
        msg: "login succesfully",
        user: user.username,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);
        const user = await User.findById(verified.id);
        if (!user) return res.send(false);
        return res.send(true);
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllusers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
