import HttpService from '../http/http.service';

const http = new HttpService();

export type IMDBody = {
  text: string;
};

export const createMD = async (body: IMDBody) => {
  return await http.post('users/v1/md', body);
};

export const getMD = async () => {
  return await http.get('users/v1/md/all?page=1&limit=10');
};
