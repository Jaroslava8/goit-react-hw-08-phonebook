import { createAction } from '@reduxjs/toolkit';

export const authUser = createAction('user/login');
export const exitUser = createAction('user/logout');