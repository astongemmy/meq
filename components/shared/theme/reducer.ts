import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: string
};

// Define the initial state using that type
const initialState: ThemeState = {
  mode: 'light'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      const theme = action.payload;

      localStorage.removeItem('theme');
      
      if (theme && theme !== 'system') {
        localStorage.setItem('theme', theme);
      }

      state.mode = theme;
    }
  }
});

const { reducer, actions } = themeSlice;

export const {
  changeTheme
} = actions;

export default reducer;