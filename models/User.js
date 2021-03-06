const sequelize = require("../db/postgres");
const { Sequelize, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {}

const UserSchema = {
  u_id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  u_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  u_email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    unique: true,
  },
  u_avatar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  u_bio: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

User.init(UserSchema, {
  sequelize,
  tableName: "challenge",
});

// Encrypt password using bcrypt
User.beforeSave(async function (user) {
  const hashedPass = await bcrypt.hash(user.password, 10);
  user.password = hashedPass;
});

// Match user entered password to hashed password in DB
User.matchPass = async function (enteredPass, hashedPass) {
  return await bcrypt.compare(enteredPass, hashedPass);
};

module.exports = User;
