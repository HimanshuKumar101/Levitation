import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import invoiceReducer from '../features/invoiceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
