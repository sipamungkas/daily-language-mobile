export enum EHttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum EStorage {
  TOKEN = 'TOKEN',
  USER = 'USER',
  DATE_MARKER = 'DATE_MARKER',
  NOTES_LIST = 'NOTES_LIST',
  REMINDER_LIST = 'REMINDER_LIST',
  COUNT = 'COUNT',
  PROGRESS = 'PROGRESS',
  DEVICEID = 'DEVICEID',
}

export enum EProgress {
  Minidiary = 'md',
  ChatGroup = 'cg',
  ChatMember = 'cm',
  VoiceNote = 'vn',
  VoiceGroup = 'vg',
  VoiceMember = 'vm',
  AudioListening = 'au',
  VideoListening = 'vid',
  News = 'nw',
  Quote = 'qu',
}
