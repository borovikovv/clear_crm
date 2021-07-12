class usersController {
    async getUsers(req, res, next) {
        try {
            res.json(["users"]);
        } catch (e) {

        }
    }
};

module.exports = new usersController();