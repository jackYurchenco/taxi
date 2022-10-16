import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../../interfaces';
import {
	createUser,
	createUserError,
	createUserSuccess,
	getUser,
	getUserError,
	getUserSuccess,
	resetUser,
	sendCodeToPhone,
	sendCodeToPhoneError,
	sendCodeToPhoneSuccess,
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


	on(sendCodeToPhone, (state: User) => state),
	on(sendCodeToPhoneSuccess, (state: User) => state),
	on(sendCodeToPhoneError, (state: User) => state),
);

export function reducer(state = initialState, action: Action) {
	return scoreboardReducer(state, action);
}


