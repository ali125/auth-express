const User = require("../model/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(204).json({ message: 'No users found.' });
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

module.exports = {
    getAllUsers
}