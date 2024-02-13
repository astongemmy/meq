import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
})

const { reducer, actions } = counterSlice;

export const {
  incrementByAmount,
  increment,
  decrement
} = actions;

export default reducer;