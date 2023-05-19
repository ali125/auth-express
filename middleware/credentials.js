const allowedOrigins = require("../config/allowedOrigins");

/**
 * 
 * @description in front should add 'credentials' as 'include' option like this
 * {
 *      method: 'ANYTHING',
 *      headers: ANYTHING,
 *      credentials: 'include
 * }
 */
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    // if the origin is in our allowed origins list
    // then go head and set credential in header
    // CORS access
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
}

module.exports = credentials;
