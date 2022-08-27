const { Sequelize } = require("sequelize");
const db = require("../config/database");

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;

(async function () {
  await db
    .sync()
    .then(() => console.log("Table created...".blue.underline))
    .catch((err) => console.log(err));
})();
