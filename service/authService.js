const UserModel = require("../models/userModel");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const ApiError = require("../utils/ApiError");
const { generateTokens } = require("../utils/authUtils");
const mailService = require("./mailService");
const userDto = require("../dtos/userDto");
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

        const tokens = await generateTokens(userDto, tokenService, user);

        return tokens;

    };

    async login(email, password) {
        const user = await UserModel.findOne({email});

        if(!user) {
            throw ApiError.BadRequest(`Wrong password or user with such email is not exist!`)
        }

        const isPasswordConfirm = await bcrypt.compare(password, user.password);

        if(!isPasswordConfirm) {
            throw ApiError.BadRequest(`Wrong email or password`)
        }

        if(!user.isActivated) {
            throw new ApiError(404, `You account not activated!`)
        }

        const tokens = await generateTokens(userDto, tokenService, user);

        return tokens;
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    };

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});

        if(!user) {
            throw ApiError.BadRequest(`User not be find!`)
        }

        user.isActivated = true;

        await user.save();
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnautorizedErrors();
        }

        const userData = tokenService.validateRefreshToken(token);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDB) {
            throw ApiError.UnautorizedErrors();
        }

        const user = UserModel.findById(user.id);
        const tokens = await generateTokens(userDto, tokenService, user);

        return tokens;
    }
};

module.exports = new AuthService();