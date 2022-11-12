import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import authServices from './auth.services';
import userServices from '../users/users.services';
import { generateTokens } from '../../utils/jwt';
import { hashToken } from '../../utils/hashToken';

import type { Request, Response, NextFunction } from 'express';
import type { UserInfo, RefreshTokenPayload } from '../../types';

const JWT_REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'];

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body as Partial<UserInfo>;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error(
        'Insufficient information. Required fields: name, email and password'
      );
    }

    const existingUser = await userServices.findUserByEmail(email);

    if (existingUser) {
      res.status(403);
      throw new Error('This email is already registered');
    }

    const user = await userServices.createUser({ name, email, password });
    const tokenId = uuid();
    const { accessToken, refreshToken } = generateTokens(user, tokenId);
    await authServices.addRefreshTokenToWhitelist({
      id: tokenId,
      token: refreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as Partial<UserInfo>;

    if (!email || !password) {
      res.status(400);
      throw new Error(
        'Insufficient information. Required fields: email and password'
      );
    }

    const user = await userServices.findUserByEmail(email);

    if (!user) {
      res.status(403);
      throw new Error('Invalid credentials.');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid credentials.');
    }

    const tokenId = uuid();
    const { accessToken, refreshToken } = generateTokens(user, tokenId);
    await authServices.addRefreshTokenToWhitelist({
      id: tokenId,
      token: refreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body as { refreshToken?: string };

    if (!refreshToken) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }

    if (!JWT_REFRESH_SECRET) {
      throw new Error('JWT_REFRESH_SECRET env variable is not defined');
    }

    const payload = jwt.verify(
      refreshToken,
      JWT_REFRESH_SECRET
    ) as RefreshTokenPayload;
    const savedRefreshToken = await authServices.findRefreshTokenById(
      payload.tokenId
    );

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(refreshToken);

    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const user = await userServices.findUserById(payload.userId);

    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await authServices.revokeRefreshToken(savedRefreshToken.id);

    const tokenId = uuid();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      tokenId
    );

    await authServices.addRefreshTokenToWhitelist({
      id: tokenId,
      token: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  signup,
  login,
  refreshToken,
};
