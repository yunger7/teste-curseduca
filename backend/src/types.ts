export type UserInfo = {
  name: string;
  email: string;
  password: string;
};

export type RefreshTokenInfo = {
  id: string;
  token: string;
  userId: string;
};

export type ErrorResponse = {
  message: string;
};

export type AccessTokenPayload = {
  userId: string;
};

export type RefreshTokenPayload = {
  userId: string;
  tokenId: string;
};
