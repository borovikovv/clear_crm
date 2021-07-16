const AppError = require("../utils/AppError");
const tokenService = require("../service/tokenService");

module.exports = function(req, res, next) {
    try {
        const autorizationHeader = req.headers.authorization;
        if(!autorizationHeader) {
            return next(new AppError("User not autorized", 401))
        }

        const accessToken = autorizationHeader.split(" ")[1];
        if(!accessToken) {
            return next(new AppError("User not autorized", 401))
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(new AppError("User not autorized", 401))
        }

        req.user = userData;
        next();
    } catch(e) {
        next(new AppError("User not autorized", 401));
    }
};