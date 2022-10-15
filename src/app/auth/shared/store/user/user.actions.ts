import { createAction, props } from '@ngrx/store';
import { Login, User, UserNew } from '../../interfaces';

import { UserTypes as ActionType } from './user.types';

export const getUser = createAction(ActionType.Get, props<{ payload: Login }>());
export const getUserSuccess = createAction(ActionType.GetSuccess, props<{ payload: User }>());
export const getUserError = createAction(ActionType.GetError);

export const resetUser = createAction(ActionType.Reset);

export const createUser = createAction(ActionType.Create, props<{ payload: UserNew }>());
export const createUserSuccess = createAction(ActionType.CreateSuccess, props<{ payload: User }>());
export const createUserError = createAction(ActionType.CreateError);


export const sendCodeToPhone = createAction(ActionType.SendCode, props<{ payload: string }>());
export const sendCodeToPhoneSuccess = createAction(ActionType.SendCodeSuccess);
export const sendCodeToPhoneError = createAction(ActionType.SendCodeError);







