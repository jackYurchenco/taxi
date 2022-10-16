import { createReducer, on, Action } from '@ngrx/store';
import { loading } from './loading.actions';

export const initialState = false;

const scoreboardReducer = createReducer(
	initialState,
	on(loading, (state: boolean, action) => action.payload)
);

export function reducer(state = initialState, action: Action) {
	return scoreboardReducer(state, action);
}
