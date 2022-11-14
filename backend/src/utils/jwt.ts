import jwt from 'jsonwebtoken';
import type { User } from '@prisma/client';

const JWT_ACCESS_SECRET = process.env['JWT_ACCESS_SECRET'];
const JWT_REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'];

export const generateAccessToken = (user: User) => {
  if (!JWT_ACCESS_SECRET) {
    throw new Error('JWT_ACCESS_SECRET env variable is not defined');
  }

  return jwt.sign({ userId: user.id }, process.env['JWT_ACCESS_SECRET'] || '', {
    expiresIn: '30m',
  });
};

export const generateRefreshToken = (user: User, tokenId: string) => {
  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET env variable is not defined');
  }

  return jwt.sign(
    {
      userId: user.id,
      tokenId,
    },
    process.env.JWT_REFRESH_SECRET || '',
    {
      expiresIn: '7d',
    }
  );
};

export const generateTokens = (user: User, tokenId: string) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, tokenId);

  return {
    accessToken,
    refreshToken,
  };
};
