const { validatetoken } = require("../service/auth");

function authuser(cookiename) {
    return (req, res, next) => {
        const tokencookievalue = req.cookies[cookiename];
        if (!tokencookievalue) {
            return next();
        }
        try {
            const userplayload = validatetoken(tokencookievalue);
            req.user = userplayload;
        } catch (error) { }

        return next();
    }
}

module.exports = {
    authuser,
}