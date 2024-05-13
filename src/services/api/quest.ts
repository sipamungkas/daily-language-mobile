import {EProgress} from '@/types';
import HttpService from '../http/http.service';
const http = new HttpService();

export type IProgressBody = {
  type: EProgress;
};

export const updateProgress = async (body: IProgressBody) =>
  await http.post('users/v1/quest', body);

export const getTodayStats = async (date: string) =>
  await http.get(`users/v1/stat/days?date=${date}`);

export type IRangeDate = {
  startDate: string;
  endDate: string;
};
export const getRangeStats = async ({startDate, endDate}: IRangeDate) => {
  return await http.get(
    `users/v1/stat/month?startDate=${startDate}&endDate=${endDate}`,
  );
};
