import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 20,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented(state) {
      state.value++;
    },
    amounted(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { incremented, amounted } = counterSlice.actions;
export default counterSlice.reducer;
