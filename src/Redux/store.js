import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactsApi } from 'Redux/API';
import filter from 'Redux/filter/slice';

export const store = configureStore({
  reducer: { filter, [contactsApi.reducerPath]: contactsApi.reducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

setupListeners(store.dispatch);
