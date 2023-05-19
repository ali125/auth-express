const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ message: "Username and password are required." });
    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) return res.sendStatus(401); // Unauthorized
    
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWT
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles // hiding user role by set code to the roles
                }
             },
            process.env.ACCESS_TOKEN_SECRET,
            // { expiresIn: "30s" }
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshing token with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        console.log(result);
          
        /**
         * 
         * @description in front should add 'credentials' as 'include' option like this
         * {
         *      method: 'ANYTHING',
         *      headers: ANYTHING,
         *      credentials: 'include
         * }
         */
        // res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            // sameSite: 'None', // in dev server or production or chrome
            // secure: true, // in dev server or production or chrome
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken, roles });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };