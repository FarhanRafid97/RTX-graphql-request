import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { apiSlice } from '../features/dogs/dogsApiSlice';
import { apiSlice as graphqlTest } from '../features/dogs/graphql';

export const store = configureStore({
  reducer: {
    counter: counterReducer,

    [graphqlTest.reducerPath]: graphqlTest.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(graphqlTest.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
