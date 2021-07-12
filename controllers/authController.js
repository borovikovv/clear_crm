const AuthService = require("../service/authService");

class authController {

    async signup(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await AuthService.registration(email, password);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);

        } catch (e) {
            console.error(e);
        }
    };

    async login(req, res, next) {
        try {

        } catch (e) {
            
        }
    };

    async logout(req, res, next) {
        try {

        } catch (e) {
            
        }
    };

    async refresh(req, res, next) {
        try {

        } catch (e) {
            
        }
    };

    async activate(req, res, next) {
        try {

        } catch (e) {
            
        }
    };
}

module.exports = new authController();