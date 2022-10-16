import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { Login, User, UserNew, UserNewPassword } from '../../interfaces';
import { UserTypes as ActionType } from './user.types';
import { ApiService } from 'src/app/core/services/api.service';
import { sha512 } from 'sha512-crypt-ts';
import { MessagesService } from 'src/app/core/services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CoreNavigation } from 'src/app/core/constants/core-navigation';
import { Payload } from 'src/app/core/interfaces';
import { loading } from 'src/app/core/store/loading/loading.actions';


@Injectable()
export class UserEffects {
	loading$: Observable<boolean>;
	getUser$: Observable<Payload<User>>;
	createUser$: Observable<Action>;
	sendCodeToPhoneForRegister$: Observable<Action>;
	sendCodeToPhoneForRestore$: Observable<Action>;
	checkCodeForRestore$: Observable<Action>;
	restoreUserPassword$: Observable<Action>;
	constructor(
		private _apiService: ApiService,
		private _store: Store<{ loading: boolean }>,
		private _httpService: HttpService,
		private _actions$: Actions,
		//private _errorService: ErrorService,
		private _messagesService: MessagesService,
		private _router: Router
	) {
		this.loading$ = this._store.select((state) => state.loading);
		this.getUser$ = this.getUser(
			`${this._apiService.host}/${environment.api.account.base}`,
			ActionType.Get,
			ActionType.GetSuccess,
			ActionType.GetError
		);
		this.createUser$ = this.createUser(
			`${this._apiService.host}/${environment.api.account.register.base}`,
			ActionType.Create,
			ActionType.CreateSuccess,
			ActionType.CreateError
		);
		this.sendCodeToPhoneForRegister$  = this.sendCodeToPhoneForRegister(
			`${this._apiService.host}/${environment.api.account.register.sendConfirmCode}`,
			ActionType.SendCodeForRegister,
			ActionType.SendCodeForRegisterSuccess,
			ActionType.SendCodeForRegisterError
		);
		this.sendCodeToPhoneForRestore$  = this.sendCodeToPhoneForRestore(
			`${ this._apiService.host}/${environment.api.account.restore.sendConfirmCode }`,
			ActionType.SendCodeForRestore,
			ActionType.SendCodeForRestoreSuccess,
			ActionType.SendCodeForRestoreError
		);
		this.checkCodeForRestore$  = this.checkCodeForRestore(
			`${ this._apiService.host}/${environment.api.account.restore.checkConfirmCode }`,
			ActionType.CheckCodeForRestore,
			ActionType.CheckCodeForRestoreSuccess,
			ActionType.CheckCodeForRestoreError
		);

		this.restoreUserPassword$  = this.restoreUserPassword(
			`${ this._apiService.host}/${environment.api.account.restore.base }`,
			ActionType.RestorePassword,
			ActionType.RestorePasswordSuccess,
			ActionType.RestorePasswordError
		);
	}

	getUser(url: string, actionType: string, actionTypeSuccess: string, actionTypeError: string): Observable<Payload<User>>{
    return createEffect(() => this._actions$.pipe(
			ofType(actionType),
			exhaustMap((action: Payload<Login>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					login: action.payload!.login,
					password: sha512.hex(action.payload!.password),
				}).pipe(
					map((response: any) => {
						this._store.dispatch(loading({ payload: false }));
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
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
					this._messagesService.error(response.status, response.error.Message)
						return of({ type: actionTypeError });
					})
				);
			}))
    );
  }

	createUser(url: string, actionType: string, actionTypeSuccess: string, actionTypeError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(actionType),
			mergeMap((action: Payload<UserNew>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					phone: action.payload!.phone.replace(/\-/g,''),
					confirm_code: action.payload!.code,
					password: action.payload!.password,
					confirm_password: action.payload!.confirmPassword,
					user_first_name: action.payload!.name
				}).pipe(
					map(() => {
						this._store.dispatch(loading({ payload: false }));
						this._messagesService.success(201, "AccountCreated");
						this._router.navigate([`./${CoreNavigation.Auth}`], {
							queryParams: { phone: action.payload!.phone.replace(/\-/g,'') }
						})
						return ({ type: actionTypeSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message);
						return of({ type: actionTypeError });
					})
				);
			}))
    );
  }

	restoreUserPassword(url: string, actionType: string, actionTypeSuccess: string, actionTypeError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(actionType),
			mergeMap((action: Payload<UserNewPassword>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					phone: action.payload!.phone.replace(/\-/g,''),
					confirm_code: action.payload!.code,
					password: action.payload!.password,
					confirm_password: action.payload!.confirmPassword,
				}).pipe(
					map(() => {
						this._store.dispatch(loading({ payload: false }));
						this._messagesService.success(201, "AccountPasswordRestored");
						this._router.navigate([`./${CoreNavigation.Auth}`], {
							queryParams: { phone: action.payload!.phone.replace(/\-/g,'') }
						})
						return ({ type: actionTypeSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message);
						return of({ type: actionTypeError });
					})
				);
			}))
    );
  }

	sendCodeToPhoneForRegister(url: string, actionType: string, actionTypeSuccess: string, actionTypeError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(actionType),
			exhaustMap((action: Payload<string>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					phone: action.payload!.replace(/\-/g,'')
				}).pipe(
					map(() => {
						this._store.dispatch(loading({ payload: false }));
						this._messagesService.success(200, "CodeSendedToPhone", action.payload)
						return ({ type: actionTypeSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message)
						return of({ type: actionTypeError });
					})
				);
			}))
    );
  }

	sendCodeToPhoneForRestore(url: string, actionType: string, actionTypeSuccess: string, actionTypeError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(actionType),
			exhaustMap((action: Payload<string>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					phone: action.payload!.replace(/\-/g,'')
				}).pipe(
					map(() => {
						this._store.dispatch(loading({ payload: false }));
						this._messagesService.success(200, "CodeSendedToPhone", action.payload)
						return ({ type: actionTypeSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message)
						return of({ type: actionTypeError });
					})
				);
			}))
    );
  }

	checkCodeForRestore(url: string, actionType: string, actionTypeSuccess: string, actionTypeError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(actionType),
			exhaustMap((action: Payload<{ code: string, phone: string}>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					phone: action.payload!.phone.replace(/\-/g,''),
					confirm_code: action.payload!.code
				}).pipe(
					map(() => {
						this._store.dispatch(loading({ payload: false }));
						this._messagesService.success(200, "CodeSendedToPhone", action.payload!.phone)
						return ({ type: actionTypeSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message)
						return of({ type: actionTypeError });
					})
				);
			}))
    );
  }


}