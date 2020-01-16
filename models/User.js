const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  favTeam: {
    type: String,
    required: true
  },
  prefFavTeam: {
    type: Boolean,
    default: false
  },
  prefMVPs: {
    type: Boolean,
    default: false
  },
  prefNatGames: {
    type: Boolean,
    default: false
  },
  prefTopTeams: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("user", UserSchema);
