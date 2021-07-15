const AuthService = require("../service/authService");
const { setCookies } = require("../utils/authUtils");

class authController {

    signup = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userData = await AuthService.registration(email, password);

            return setCookies(res, userData);

        } catch (e) {
            next(e);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userData = await AuthService.login(email, password);
            
            return setCookies(res, userData);

        } catch (e) {
            next(e);
        }
    };

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await AuthService.logout(refreshToken);
            res.clearCookie("refreshToken");

            return res.json(token);
        } catch (e) {
            next(e);
        }
    };

    refresh = async (req, res, next) => {
        try {
            const refreshToken = req.cookie;
            const userData = await AuthService.refresh(refreshToken);

            return setCookies(res, userData);
        
        } catch (e) {
            next(e);
        }
    };

    activate = async (req, res, next) => {
        try {
            const activationLink = req.params.link;
            await AuthService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new authController();