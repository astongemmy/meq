import { IsVerifyingPayload, ModalState, VerificationErrorPayload } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ModalState = {
  isVerifying: {
    usingLink: false,
    usingCode: false,
  },
  isVerified: false,
  verificationStatus: 'verifyEmail',
  verificationError: {
    unknownError: false,
    invalidCode: false,
    expiredCode: false,
    expiredLink: false,
    OTPError: false,
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateVerificationError: (state, action: PayloadAction<VerificationErrorPayload>) => {
      state.verificationError = {
        ...state.verificationError,
        ...action.payload
      };
    },
    setIsVerifying: (state, action: PayloadAction<IsVerifyingPayload>) => {
      state.isVerifying = {
        ...state.isVerifying,
        ...action.payload
      };
    },
    setIsVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
    setVerificationStatus: (state, action: PayloadAction<string>) => {
      state.verificationStatus = action.payload;
    }
  }
})

const { reducer, actions } = authSlice;

export const {
  updateVerificationError,
  setVerificationStatus,
  setIsVerifying,
  setIsVerified,
} = actions;

export default reducer;