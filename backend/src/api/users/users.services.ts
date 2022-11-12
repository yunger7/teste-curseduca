import bcrypt from 'bcrypt';
import { database } from '../../utils/database';

import type { UserInfo } from '../../types';

const findUserByEmail = (email: string) => {
  return database.user.findUnique({
    where: {
      email,
    },
  });
};

const createUser = (user: UserInfo) => {
  user.password = bcrypt.hashSync(user.password, 12);

  return database.user.create({
    data: user,
  });
};

const findUserById = (id: string) => {
  return database.user.findUnique({
    where: {
      id,
    },
  });
};

export default {
  findUserByEmail,
  createUser,
  findUserById,
};
