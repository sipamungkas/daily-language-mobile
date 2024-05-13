import HttpService from '../http/http.service';

const http = new HttpService();

export const newsList = async (page: number) =>
  await http.get(`users/v1/news/all?page=${page}&limit=5`);

export const quotesList = async (page: number) =>
  await http.get(`users/v1/quotes/all?page=${page}&limit=10`);

export type IBodyCreateNS = {
  url: string;
  startTime: string;
  endTime: string;
};
export const createNativeSocmed = async (body: IBodyCreateNS) => {
  return await http.post('users/v1/quotes', body);
};

export const createNewsData = async (body: IBodyCreateNS) => {
  return await http.post('users/v1/news', body);
};

// const register =
// const register =
