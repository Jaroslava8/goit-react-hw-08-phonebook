import { configureStore } from '@reduxjs/toolkit';
import { contacts } from './contacts';
import { user } from './user';
import { contactsAPI, userAPI } from './services';

export default configureStore({
  reducer: {
    contacts,
    user,
    [contactsAPI.API.reducerPath]: contactsAPI.API.reducer,
    [userAPI.API.reducerPath]: userAPI.API.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsAPI.API.middleware,
    userAPI.API.middleware,
  ],
});