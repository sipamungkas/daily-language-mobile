import HttpService from '../http/http.service';

const http = new HttpService();

export type ILoginBody = {
  role: 'user';
  email: string;
  password: string;
};

export type IRegisterBody = {
  email: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | '';
  password: string;
};

export const login = async (body: ILoginBody) => {
  return await http.post('users/v1/login', body);
};

export const logout = async () => {
  return await http.post('users/v1/logout', {});
};

export const register = async (body: IRegisterBody) =>
  await http.post('users/v1/register', body);

export type IDeviceIDBody = {
  deviceId: string;
};
export const updateDeviceId = async (body: IDeviceIDBody) => {
  return http.patch('users/v1/chat/update/device-id', body);
};

export type IBodyChangePass = {
  oldPassword: string;
  newPassword: string;
};

export const changePassword = async (body: IBodyChangePass) => {
  return await http.post('users/v1/change-password', body);
};
