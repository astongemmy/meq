import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  [key: string]: {
    response: string | null;
    isLoading: boolean;
    open: boolean;
  }
};

export interface ActionPayload {
  target: string;
  payload: {
    response?: string | null;
    isLoading?: boolean;
    open?: boolean;
  }
}

const initialState: ModalState = {
  resetPassword: {
    isLoading: false,
    response: null,
    open: false,
  }
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<ActionPayload>) => {
      const { target, payload } = action.payload;

      state[target] = {
        ...state[target],
        ...payload
      };
    }
  }
})

const { reducer, actions } = modalSlice;

export const {
  updateModal,
} = actions;

export default reducer;