import HttpService from '../http/http.service';

const http = new HttpService();

export type IListChatParams = {
  search: string;
  type: 'private' | 'private-voice' | 'group' | 'group-voice';
};

export type IGetUserList = {
  page: number;
  search: string;
};

export type ICreatePrivateChat = {
  type: 'private' | 'private-voice';
  memberId: string;
};
export type ICreateGroupChat = {
  type: 'group' | 'group-voice';
  memberId: string;
  name: string;
};

export type IGetMsgParams = {
  page: number;
  roomId: string;
};

export const getListchat = async (params: IListChatParams) => {
  const {search = '', type = 'private'} = params;
  return await http.get(
    `users/v1/chat/room/list?type=${type}&search=${search}`,
  );
};

export const getUserList = async (params: IGetUserList) => {
  const {page = 1, search = ''} = params;
  return await http.get(
    `users/v1/chat/list-user?page=${page}&limit=10&search=${search}`,
  );
};

export const createChatRoom = async (
  body: ICreatePrivateChat | ICreateGroupChat,
) => {
  if (body.type.includes('private')) {
    return await http.post('users/v1/chat/room/private', body);
  }
  return await http.post('/users/v1/chat/room/group', body);
};

export const getMessages = async ({page = 1, roomId}: IGetMsgParams) => {
  return await http.get(
    `/users/v1/chat/messages?page=${page}&limit=10&roomId=${roomId}`,
  );
};

export type IBodySendMsg = {
  roomId: string;
  content: string;
};
export const sendTextMsg = async (body: IBodySendMsg) => {
  return await http.post('users/v1/chat/messages', body);
};

export interface IBodySendVoiceMsg extends FormData {
  file: FormDataValue;
  duration: number;
}

export const sendVoiceMsg = async (body: IBodySendVoiceMsg) => {
  return await http.postWithVia('users/v1/chat/messages/voice', body);
};

export type IBodyDeleteRoom = {
  roomId: string;
};
export const deleteRoom = async (body: IBodyDeleteRoom) => {
  return await http.deleteWithBody('users/v1/chat/room', body);
};
