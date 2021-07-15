const ApiError = require("../utils/ApiError");
const tokenService = require("../service/tokenService");

module.exports = function(req, res, next) {
    try {
        const autorizationHeader = req.headers.authorization;
        if(!autorizationHeader) {
            return next(ApiError.UnautorizedErrors())
        }

        const accessToken = autorizationHeader.split(" ")[1];
        if(!accessToken) {
            return next(ApiError.UnautorizedErrors())
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(ApiError.UnautorizedErrors())
        }

        req.user = userData;
        next();
    } catch(e) {
        next(ApiError.UnautorizedErrors());
    }
};