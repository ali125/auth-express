const express = require("express");
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const router = express.Router();

router.route("/").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), usersController.getAllUsers)
module.exports = router;
