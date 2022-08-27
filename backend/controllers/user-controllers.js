const User = require("../models/user-model");

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

exports.getUserByID = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json(user);
};

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  console.log(user);
  res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "user deleted" });
};
