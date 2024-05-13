import {Storage} from '@/services/storage';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {EProgress, EStorage} from '@types/index';

export type progressState = {
  progress: {
    date: string;
    [EProgress.AudioListening]: boolean;
    [EProgress.ChatGroup]: boolean;
    [EProgress.ChatMember]: boolean;
    [EProgress.ChatGroup]: boolean;
    [EProgress.News]: boolean;
    [EProgress.News]: boolean;
    [EProgress.Quote]: boolean;
    [EProgress.VideoListening]: boolean;
    [EProgress.VoiceGroup]: boolean;
    [EProgress.VoiceMember]: boolean;
    [EProgress.VoiceNote]: boolean;
  };
  count: countState;
};

export type countState = {
  date: string;
  [EProgress.ChatMember]: number;
  [EProgress.ChatGroup]: number;
  [EProgress.VoiceMember]: number;
  [EProgress.VoiceGroup]: number;
};

const initialState: progressState = {
  progress: {
    date: '',
    au: false,
    cg: false,
    cm: false,
    nw: false,
    qu: false,
    vg: false,
    vid: false,
    vm: false,
    vn: false,
  },
  count: {
    date: '',
    [EProgress.ChatMember]: 0,
    [EProgress.ChatGroup]: 0,
    [EProgress.VoiceMember]: 0,
    [EProgress.VoiceGroup]: 0,
  },
};

export type tes = {
  [key in EProgress]: boolean;
};

export type IUpdateProgress = {
  [key in EProgress]: boolean;
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (
      state,
      action: PayloadAction<IUpdateProgress & {date: string}>,
    ) => {
      state.progress = action.payload;
      Storage.set(EStorage.PROGRESS, JSON.stringify(action.payload));
    },
    setCount: (state, action: PayloadAction<countState>) => {
      state.count = action.payload;
      Storage.set(EStorage.COUNT, JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const {setProgress, setCount} = progressSlice.actions;

export default progressSlice.reducer;
