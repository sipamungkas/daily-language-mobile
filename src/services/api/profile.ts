import HttpService from '../http/http.service';

const http = new HttpService();

export type IUpdateBody = {
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  email: string;
};

export const user = async () => {
  return await http.get('users/v1/profile');
};

export const updateProfile = async (body: IUpdateBody) => {
  return await http.post('users/v1/profile/edit', body);
};

export const updatePhoto = async (body: any) => {
  return await http.postWithVia(
    'users/v1/profile/photo',
    body,
    {},
    true,
    'image',
  );
};
