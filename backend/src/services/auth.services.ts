import { database } from '../utils/database';
import { hashToken } from '../utils/hashToken';

import type { RefreshTokenInfo } from '../types';

const addRefreshTokenToWhitelist = ({
  id,
  token,
  userId,
}: RefreshTokenInfo) => {
  return database.refreshToken.create({
    data: {
      id,
      hashedToken: hashToken(token),
      userId,
    },
  });
};

const findRefreshTokenById = (id: string) => {
  return database.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

const revokeRefreshToken = (id: string) => {
  return database.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

export default {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  revokeRefreshToken,
};
