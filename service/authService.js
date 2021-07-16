const UserModel = require("../models/userModel");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const AppError = require("../utils/AppError");
const { generateTokens } = require("../utils/authUtils");
const mailService = require("./mailService");
const userDto = require("../dtos/userDto");
const tokenService = require("./tokenService");
const config =  process.env;

class AuthService {

    async registration (email, password){
        const candidate = await UserModel.findOne({email});

        if(candidate) {
            throw new AppError(`Email ${email} already exist`, 400);
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
            throw new AppError(`Wrong password or user with such email is not exist!`, 400)
        }

        const isPasswordConfirm = await bcrypt.compare(password, user.password);

        if(!isPasswordConfirm) {
            throw new AppError(`Wrong email or password`, 400)
        }

        if(!user.isActivated) {
            throw new AppError(`You account not activated!`, 404)
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
            throw new AppError(`User not be find!`, 400)
        }

        user.isActivated = true;

        await user.save();
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw new AppError(`User not autorized`, 401);
        }

        const userData = tokenService.validateRefreshToken(token);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDB) {
            throw new AppError(`User not autorized`, 401);
        }

        const user = UserModel.findById(user.id);
        const tokens = await generateTokens(userDto, tokenService, user);

        return tokens;
    }
};

module.exports = new AuthService();