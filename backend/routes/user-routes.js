const express = require("express");
const router = express.Router();

const { getAllUsers, getUserByID, createUser, updateUser, deleteUser } = require("../controllers/user-controllers");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserByID).put(updateUser).delete(deleteUser);

module.exports = router;
