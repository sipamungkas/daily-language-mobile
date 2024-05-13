import HttpService from '../http/http.service';

const http = new HttpService();

export type IBodyCreateListeningData = {
  url: string;
  startTime: string;
  endTime: string;
  type: 'audio' | 'video';
};

export const getAudioList = async () =>
  await http.get('users/v1/listening/all?page=1&limit=10000&type=audio');

export const getVideoList = async (page: number) =>
  await http.get(`users/v1/listening/all?page=${page}&limit=10&type=video`);

export const createListeningData = async (body: IBodyCreateListeningData) => {
  return http.post('users/v1/listening', body);
};
