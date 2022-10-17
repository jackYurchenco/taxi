import { createAction, props } from '@ngrx/store';
import { Login, UserNew, UserNewPassword } from '../../../auth/shared/interfaces';
import { User } from '../../interfaces';

import { UserTypes as ActionType } from './user.types';

export const getUser = createAction(ActionType.Get, props<{ payload: Login }>());
export const getUserSuccess = createAction(ActionType.GetSuccess, props<{ payload: User }>());
export const getUserError = createAction(ActionType.GetError);

export const resetUser = createAction(ActionType.Reset);

export const createUser = createAction(ActionType.Create, props<{ payload: UserNew }>());
export const createUserSuccess = createAction(ActionType.CreateSuccess);
export const createUserError = createAction(ActionType.CreateError);

export const restoreUserPassword = createAction(ActionType.RestorePassword, props<{ payload: UserNewPassword }>());
export const restoreUserPasswordSuccess = createAction(ActionType.RestorePasswordSuccess);
export const restoreUserPasswordError = createAction(ActionType.RestorePasswordError);

export const sendCodeToPhoneForRegister = createAction(ActionType.SendCodeForRegister, props<{ payload: string }>());
export const sendCodeToPhoneForRegisterSuccess = createAction(ActionType.SendCodeForRegisterSuccess);
export const sendCodeToPhoneForRegisterError = createAction(ActionType.SendCodeForRegisterError);


export const sendCodeToPhoneForRestore = createAction(ActionType.SendCodeForRestore, props<{ payload: string }>());
export const sendCodeToPhoneForRestoreSuccess = createAction(ActionType.SendCodeForRestoreSuccess);
export const sendCodeToPhoneForRestoreError = createAction(ActionType.SendCodeForRestoreError);

export const checkCodeForRestore = createAction(ActionType.CheckCodeForRestore, props<{ payload: { phone: string, code: string } }>());
export const checkCodeForRestoreSuccess = createAction(ActionType.CheckCodeForRestoreSuccess);
export const checkCodeForRestoreError = createAction(ActionType.CheckCodeForRestoreError);


