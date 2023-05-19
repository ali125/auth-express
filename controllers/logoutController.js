const User = require("../model/User");

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            // sameSite: 'None', // dev server or production or chrome
            // secure: true // dev server or production or chrome
        });
        return res.sendStatus(204); // Forbidden
    }

    // Delete refreshToken in db
    foundUser.refreshToken = ''
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie("jwt", {
        httpOnly: true,
        // sameSite: 'None', // dev server
        // secure: true // dev server
    }); // secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout };
