const userService = require("../service/usersService");

class usersController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = new usersController();