import { createAction, props } from '@ngrx/store';
import { Login, User } from '../../interfaces';
import { UserTypes as ActionType } from './user.types';

export const getUser = createAction(ActionType.Get, props<{ payload: Login }>());
export const getUserSuccess = createAction(ActionType.GetSuccess, props<{ payload: User }>());
export const getUserError = createAction(ActionType.GetError);

export const resetUser = createAction(ActionType.Reset);




