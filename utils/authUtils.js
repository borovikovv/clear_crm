exports.emailValidate = (email) => {
   let pattern = new RegExp(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
   );

   return pattern.test(email);
};

exports.setCookies = (response, userData) => {
   response.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
   });

   return response.json(userData);
};

exports.generateTokens = async (UserDto, tokenService, user) => {
   const userDto = new UserDto(user);
   const tokens = tokenService.generateTokens({ ...userDto });
   await tokenService.saveToken(userDto.id, tokens.refreshToken);

   return { ...tokens, user: userDto }
}