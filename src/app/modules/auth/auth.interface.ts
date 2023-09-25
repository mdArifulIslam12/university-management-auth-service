export type ILogin = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean | undefined;
};

export type IResponseRefreshToken = {
  accessToken: string;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
