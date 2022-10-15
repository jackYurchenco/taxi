export enum UserTypes {
	Get = '[User] get',
	GetSuccess = '[User] get success',
	GetError = '[User] get error',

	Reset = '[User] reset',

	Create = '[User] create',
	CreateSuccess = '[User] create success',
	CreateError = '[User] create error',

	Update = '[User] update',
	UpdateSuccess = '[User] update success',
	UpdateError = '[User] update error',

	SendCode = '[User] send code to phone',
	SendCodeSuccess = '[User] send code to phone success',
	SendCodeError = '[User] send code to phone error',
}