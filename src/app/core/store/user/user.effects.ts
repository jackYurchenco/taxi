import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { sha512 } from 'sha512-crypt-ts';
import { HttpErrorResponse } from '@angular/common/http';
import { Payload, User } from '../../interfaces';
import { Login, UserNew, UserNewPassword } from 'src/app/auth/shared/interfaces';
import { HttpService } from '../../services/http.service';
import { MessagesService } from '../../services/messages.service';
import { environment } from 'src/environments/environment';
import { loading } from '../loading/loading.actions';
import { UserTypes } from './user.types';
import { CoreNavigation } from '../../constants/core-navigation';
import { CookieService } from 'ngx-cookie';


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
		private _store: Store<{ loading: boolean }>,
		private _httpService: HttpService,
		private _actions$: Actions,
		//private _errorService: ErrorService,
		private _messagesService: MessagesService,
		private _router: Router,
		private _cookieService: CookieService,
	) {
		this.loading$ = this._store.select((state) => state.loading);
		this.getUser$ = this.getUser(
			`${environment.api.host}/${environment.api.account.base}`,
			UserTypes.Get,
			UserTypes.GetSuccess,
			UserTypes.GetError
		);
		this.createUser$ = this.createUser(
			`${environment.api.host}/${environment.api.account.register.base}`,
			UserTypes.Create,
			UserTypes.CreateSuccess,
			UserTypes.CreateError
		);
		this.sendCodeToPhoneForRegister$  = this.sendCodeToPhoneForRegister(
			`${environment.api.host}/${environment.api.account.register.sendConfirmCode}`,
			UserTypes.SendCodeForRegister,
			UserTypes.SendCodeForRegisterSuccess,
			UserTypes.SendCodeForRegisterError
		);
		this.sendCodeToPhoneForRestore$  = this.sendCodeToPhoneForRestore(
			`${ environment.api.host}/${environment.api.account.restore.sendConfirmCode }`,
			UserTypes.SendCodeForRestore,
			UserTypes.SendCodeForRestoreSuccess,
			UserTypes.SendCodeForRestoreError
		);
		this.checkCodeForRestore$  = this.checkCodeForRestore(
			`${ environment.api.host}/${environment.api.account.restore.checkConfirmCode }`,
			UserTypes.CheckCodeForRestore,
			UserTypes.CheckCodeForRestoreSuccess,
			UserTypes.CheckCodeForRestoreError
		);
		this.restoreUserPassword$  = this.restoreUserPassword(
			`${ environment.api.host}/${environment.api.account.restore.base }`,
			UserTypes.RestorePassword,
			UserTypes.RestorePasswordSuccess,
			UserTypes.RestorePasswordError
		);
	}

	getUser(url: string, UserTypes: string, UserTypesSuccess: string, UserTypesError: string): Observable<Payload<User>>{
    return createEffect(() => this._actions$.pipe(
			ofType(UserTypes),
			exhaustMap((action: Payload<Login>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					login: action.payload!.login,
					password: sha512.hex(action.payload!.password),
				}).pipe(
					map((response: any) => {
						this._store.dispatch(loading({ payload: false }));
						this._router.navigate([CoreNavigation.Order])
						let user: User = {
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
							clientBonuses: response.client_bonuses,
							token: sha512.base64(`${ action.payload!.login }:${ sha512.hex(action.payload!.password) }`) 
						}
						this._cookieService.put('user', JSON.stringify(user), {
							path: window.location.hostname,
						})
						return ({
							payload: user,
							type: UserTypesSuccess
						});
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
					this._messagesService.error(response.status, response.error.Message)
						return of({ type: UserTypesError });
					})
				);
			}))
    );
  }

	createUser(url: string, UserTypes: string, UserTypesSuccess: string, UserTypesError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(UserTypes),
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
						return ({ type: UserTypesSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message);
						return of({ type: UserTypesError });
					})
				);
			}))
    );
  }

	restoreUserPassword(url: string, UserTypes: string, UserTypesSuccess: string, UserTypesError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(UserTypes),
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
						return ({ type: UserTypesSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message);
						return of({ type: UserTypesError });
					})
				);
			}))
    );
  }

	sendCodeToPhoneForRegister(url: string, UserTypes: string, UserTypesSuccess: string, UserTypesError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(UserTypes),
			exhaustMap((action: Payload<string>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					phone: action.payload!.replace(/\-/g,'')
				}).pipe(
					map(() => {
						this._store.dispatch(loading({ payload: false }));
						this._messagesService.success(200, "CodeSendedToPhone", action.payload)
						return ({ type: UserTypesSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message)
						return of({ type: UserTypesError });
					})
				);
			}))
    );
  }

	sendCodeToPhoneForRestore(url: string, UserTypes: string, UserTypesSuccess: string, UserTypesError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(UserTypes),
			exhaustMap((action: Payload<string>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					phone: action.payload!.replace(/\-/g,'')
				}).pipe(
					map(() => {
						this._store.dispatch(loading({ payload: false }));
						this._messagesService.success(200, "CodeSendedToPhone", action.payload)
						return ({ type: UserTypesSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message)
						return of({ type: UserTypesError });
					})
				);
			}))
    );
  }

	checkCodeForRestore(url: string, UserTypes: string, UserTypesSuccess: string, UserTypesError: string): Observable<Action> {
    return createEffect(() => this._actions$.pipe(
			ofType(UserTypes),
			exhaustMap((action: Payload<{ code: string, phone: string}>) => {
				this._store.dispatch(loading({ payload: true }));
				return this._httpService.post(url, {
					phone: action.payload!.phone.replace(/\-/g,''),
					confirm_code: action.payload!.code
				}).pipe(
					map(() => {
						this._store.dispatch(loading({ payload: false }));
						this._messagesService.success(200, "CodeSendedToPhone", action.payload!.phone)
						return ({ type: UserTypesSuccess });
					}),
					catchError((response: HttpErrorResponse) => {
						this._store.dispatch(loading({ payload: false }));
						//this._errorService.onError(error, errorMessage);
						this._messagesService.error(response.status, response.error.Message)
						return of({ type: UserTypesError });
					})
				);
			}))
    );
  }


}