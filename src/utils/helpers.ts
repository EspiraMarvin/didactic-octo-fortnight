/** deletes user password from response */
export const deletePwdFromResponse = (user: any) => {
  const nUser = user?._doc || user;
  delete nUser.password;

  return nUser;
};
