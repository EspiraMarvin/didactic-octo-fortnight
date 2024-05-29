import { User } from 'src/schemas/user.schema';

/** deletes user password from response */
export const deletePwdFromResponse = (user: any): Omit<User, 'password'> => {
  const nUser = user?._doc || user;
  delete nUser.password;

  return nUser;
};
