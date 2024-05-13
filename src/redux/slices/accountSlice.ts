import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface IUserData {
  id: string;
  name: string;
  email: null | string;
  email_verified_at: null | string;
  created_at: string;
  updated_at: string;
  phone_number: string;
  role: 'admin' | 'user' | '';
  photoProfile: string;
  gender: 'male' | 'female' | '';
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountState {
  data: {
    token: string;
    user: IUserData;
    deviceId: string;
  };
}

const initialState: AccountState = {
  data: {
    deviceId: '',
    token: '',
    user: {
      id: '',
      name: '',
      email: null,
      email_verified_at: null,
      created_at: '',
      updated_at: '',
      phone_number: '',
      role: '',
      photoProfile: '',
      gender: '',
      dateOfBirth: '',
      createdAt: '',
      updatedAt: '',
    },
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.data.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.data.token = action.payload;
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.data.deviceId = action.payload;
    },
    resetAccount: state => {
      state.data = initialState.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, resetAccount, setToken} = accountSlice.actions;

export default accountSlice.reducer;
