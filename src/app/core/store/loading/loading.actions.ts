import { createAction, props } from '@ngrx/store';
import { LoadingTypes as Action } from './loading.types';

export const loading = createAction(Action.loading, props<{ payload: boolean }>());
