const Register = require("../models/usersSchema");
const router = require("express").Router();

//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await Register.findById(userId)
        : await Register.findOne({ username: username });
    //   const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });