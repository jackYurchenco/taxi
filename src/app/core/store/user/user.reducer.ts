import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../../../auth/shared/interfaces';
import {
	checkCodeForRestore,
	checkCodeForRestoreError,
	checkCodeForRestoreSuccess,
	createUser,
	createUserError,
	createUserSuccess,
	getUser,
	getUserError,
	getUserSuccess,
	resetUser,
	restoreUserPassword,
	restoreUserPasswordError,
	restoreUserPasswordSuccess,
	sendCodeToPhoneForRegister,
	sendCodeToPhoneForRegisterError,
	sendCodeToPhoneForRegisterSuccess,
	sendCodeToPhoneForRestore,
	sendCodeToPhoneForRestoreError,
	sendCodeToPhoneForRestoreSuccess,
} from './user.actions';

const initialState: User = {
	name: '',
	phone: '',
	balance: 0,
	address: '',
	addressNumber: '',
	addressEntrance: 0,
	addressApartment: 0,
	roles: [],
	clientSubCards: null,
	version: 0,
	discount: {
		value: 0,
		unit: ''
	},
	paymentType: 0,
	clientBonuses: 0
};

const scoreboardReducer = createReducer(
	{ ...initialState },
	on(getUser, (state: User) => state),
	on(getUserSuccess, (state: User, action) => action.payload),
	on(getUserError, (state: User) => state),

	on(resetUser, () => ({ ...initialState })),

	on(createUser, (state: User) => state),
	on(createUserSuccess, (state: User) => state),
	on(createUserError, (state: User) => state),

	on(restoreUserPassword, (state: User) => state),
	on(restoreUserPasswordSuccess, (state: User) => state),
	on(restoreUserPasswordError, (state: User) => state),

	on(sendCodeToPhoneForRegister, (state: User) => state),
	on(sendCodeToPhoneForRegisterSuccess, (state: User) => state),
	on(sendCodeToPhoneForRegisterError, (state: User) => state),

	on(sendCodeToPhoneForRestore, (state: User) => state),
	on(sendCodeToPhoneForRestoreSuccess, (state: User) => state),
	on(sendCodeToPhoneForRestoreError, (state: User) => state),

	on(checkCodeForRestore, (state: User) => state),
	on(checkCodeForRestoreSuccess, (state: User) => state),
	on(checkCodeForRestoreError, (state: User) => state),
);

export function reducer(state = initialState, action: Action) {
	return scoreboardReducer(state, action);
}


