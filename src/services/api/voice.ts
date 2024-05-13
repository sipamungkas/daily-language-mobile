import HttpService from '../http/http.service';

const http = new HttpService();

export const sendAudio = async (body: any) =>
  await http.postWithVia('users/v1/vn', body);
