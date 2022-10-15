import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { Action } from 'src/app/core/interfaces';
import { Login, User, UserNew } from '../../interfaces';
import { UserTypes as ActionType } from './user.types';
import { ApiService } from 'src/app/core/services/api.service';
import { sha512 } from 'sha512-crypt-ts';
import { MessagesService } from 'src/app/core/services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class UserEffects {
	//loading$: Observable<boolean>;
	getUser$: Observable<Action<User>>;
	createUser$: Observable<Action<User>>;

	sendCodeToPhone$: Observable<Action>;
	//resetPassword$: Observable<IAction>;
	//sendPasswordToEmail$: Observable<IAction>;
	constructor(
		private _apiService: ApiService,
		private _store: Store,
		private _httpService: HttpService,
		private _actions$: Actions,
		//private _errorService: ErrorService,
		private _messagesService: MessagesService,
		//private _apiService: ApiService,
		//private _router: Router
	) {
		//this.loading$ = this._store.select((state) => state.loading);
		this.getUser$ = this.getUser(
			ActionType.Get,
			ActionType.GetSuccess,
			ActionType.GetError
		);
		this.createUser$ = this.createUser(
			ActionType.Create,
			ActionType.CreateSuccess,
			ActionType.CreateError
		);

		this.sendCodeToPhone$  = this.sendCodeToPhone(
			ActionType.SendCode,
			ActionType.SendCodeSuccess,
			ActionType.SendCodeError
		);
	}

	getUser(actionType: string, actionTypeSuccess: string, actionTypeError: string): Observable<Action<User>> {
    return createEffect(() => this._actions$.pipe(
			ofType(actionType),
			exhaustMap((action: Action<Login>) => {
				//this._store.dispatch(loading({ payload: true }));
				const URL = `${this._apiService.host}/${environment.api.account.base}`;
				return this._httpService.post(URL, {
					login: action.payload!.login,
					password: sha512.hex(action.payload!.password),
				}).pipe(
					map((response: any) => {
						//this._store.dispatch(loading({ payload: false }));
						return ({
							payload: {
								name: response.user_full_name,
								phone: response.user_phone,
								balance: response.user_balance,
								address: response.route_address_from,
								addressNumber: response.route_address_number_from,
								addressEntrance: response.route_address_entrance_from,
								addressApartment: response.route_address_apartment_from,
								roles: response.roles.split(','),
								clientSubCards: response.client_sub_cards,
								version: response.version,
								discount: {
									value: response.discount.value,
									unit: response.discount.unit
								},
								paymentType: response.payment_type,
								clientBonuses: response.client_bonuses
							},
							type: actionTypeSuccess
						});
					}),
					catchError((response: HttpErrorResponse) => {
						//this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						console.log(response)
					this._messagesService.error(response.status, response.error.Message)
						return of({ type: actionTypeError });
					})
				);
			}))
    );
  }

	createUser(actionType: string, actionTypeSuccess: string, actionTypeError: string): Observable<Action<User>> {
    return createEffect(() => this._actions$.pipe(
			ofType(actionType),
			mergeMap((action: Action<UserNew>) => {
				//this._store.dispatch(loading({ payload: true }));
				const URL = `${this._apiService.host}/${environment.api.account.register.base}`;
				return this._httpService.post(URL, {
					phone: action.payload!.phone,
					confirm_code: action.payload!.code,
					password: sha512.hex(action.payload!.password),
					confirm_password: sha512.hex(action.payload!.confirmPassword),
					user_first_name: action.payload!.name
				}).pipe(
					map((response: any) => {
						console.log(response)
						//this._store.dispatch(loading({ payload: false }));
						return ({
							payload: {
								name: response.user_full_name,
								phone: response.user_phone,
								balance: response.user_balance,
								address: response.route_address_from,
								addressNumber: response.route_address_number_from,
								addressEntrance: response.route_address_entrance_from,
								addressApartment: response.route_address_apartment_from,
								roles: response.roles.split(','),
								clientSubCards: response.client_sub_cards,
								version: response.version,
								discount: {
									value: response.discount.value,
									unit: response.discount.unit
								},
								paymentType: response.payment_type,
								clientBonuses: response.client_bonuses
							},
							type: actionTypeSuccess
						});
					}),
					catchError((response: HttpErrorResponse) => {
						//this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
					this._messagesService.error(response.status, response.error.Message)
						return of({ type: actionTypeError });
					})
				);
			}))
    );
  }

	sendCodeToPhone(actionType: string, actionTypeSuccess: string, actionTypeError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(actionType),
			exhaustMap((action: Action<string>) => {
				//this._store.dispatch(loading({ payload: true }));
				const URL = `${this._apiService.host}/${environment.api.account.register.sendConfirmCode}`;
				return this._httpService.post(URL, {
					phone: action.payload
				}).pipe(
					map(() => {
						//this._store.dispatch(loading({ payload: false }));
						this._messagesService.success(200, "CodeSendedTopPhone", action.payload)
						return ({ type: actionTypeSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						//this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);


						this._messagesService.error(response.status, response.error.Message)
						return of({ type: actionTypeError });
					})
				);
			}))
    );
  }
}