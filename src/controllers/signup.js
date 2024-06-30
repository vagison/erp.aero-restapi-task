import { generateJWT, setAuthResponse } from '../utils/auth';
import { RefreshTokenModel, UserModel } from '../models';

const signup = async (req, res) => {
  const userData = { ...req.body };

  // Create a user
  const user = await UserModel.create(userData);

  // Create a refreshToken
  const refreshToken = await RefreshTokenModel.create(user);

  // Create a bearerToken
  const bearerToken = generateJWT({ id: user.id });

  setAuthResponse(
    res,
    bearerToken,
    refreshToken,
  );

  return res.json({ bearerToken, refreshToken });
};

export {
  signup,
};
