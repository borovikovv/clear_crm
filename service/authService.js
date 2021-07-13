const UserModel = require("../models/userModel");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const mailService = require("./mailService");
const UserDto = require("../dtos/userDto");
const tokenService = require("./tokenService");

class AuthService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email});
        console.log(candidate, "candidate");

        if(candidate) {
            return next(new AppError(`Email ${email} already exist`, 400))
        }

        const salt = bcrypt.genSaltSync(10);
        console.log(salt, "salt");
        const hashPassword = await bcrypt.hash(password, salt);
        const activationLink = uuid.v4();

        const user = await UserModel.create({
            email,
            password: hashPassword,
            activationLink
        });

        await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }

    };
};

module.exports = new AuthService();