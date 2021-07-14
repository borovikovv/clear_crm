const UserModel = require("../models/userModel");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const ApiError = require("../utils/ApiError");
const mailService = require("./mailService");
const UserDto = require("../dtos/userDto");
const tokenService = require("./tokenService");
const config =  process.env;

class AuthService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email});

        if(candidate) {
            throw ApiError.BadRequest(`Email ${email} already exist`);
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const activationLink = uuid.v4();

        const user = await UserModel.create({
            email,
            password: hashPassword,
            activationLink
        });

        await mailService.sendActivationMail(email, `${config.API_URL}/api-v1/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }

    };

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});

        if(!user) {
            throw ApiError.BadRequest(`User not be find!`)
        }

        user.isActivated = true;

        await user.save();
    }
};

module.exports = new AuthService();