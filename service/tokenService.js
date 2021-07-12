const jwt = require("jsonwebtoken");

const TokenModel = require("../models/tokenModel");

const config = process.env;

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: config.EXPIRES_ACCESS_TOKEN });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: config.EXPIRES_REFRESH_TOKEN });

        return {
            accessToken,
            refreshToken
        };
    }

    async saveToken (userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId });

        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({ user: userId, refreshToken });

        return token;
    }
};

module.exports = new TokenService();