const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const {
    name,
    email,
    password,
    favTeam,
    prefFavTeam,
    prefMVPs,
    prefNatGames,
    prefTopTeams
  } = req.body;

  // Check to see if all info is given
  if (!name || !email || !password || !favTeam) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
      favTeam,
      prefFavTeam,
      prefMVPs,
      prefNatGames,
      prefTopTeams
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  favTeam: user.favTeam,
                  prefFavTeam: user.prefFavTeam,
                  prefMVPs: user.prefMVPs,
                  prefNatGames: user.prefNatGames,
                  prefTopTeams: user.prefTopTeams
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
