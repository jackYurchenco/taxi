export enum UserTypes {
	Get = '[User] get',
	GetSuccess = '[User] get success',
	GetError = '[User] get error',

	Reset = '[User] reset',

	Create = '[User] create',
	CreateSuccess = '[User] create success',
	CreateError = '[User] create error',

	RestorePassword = '[User] restore password',
	RestorePasswordSuccess = '[User] restore password success',
	RestorePasswordError = '[User] restore password error',

	SendCodeForRegister = '[User] send code to phone for register',
	SendCodeForRegisterSuccess = '[User] send code to phone for register success',
	SendCodeForRegisterError = '[User] send code to phone for register error',

	SendCodeForRestore = '[User] send code to phone for restore',
	SendCodeForRestoreSuccess = '[User] send code to phone for restore success',
	SendCodeForRestoreError = '[User] send code to phone for restore error',

	CheckCodeForRestore = '[User] check code for restore',
	CheckCodeForRestoreSuccess = '[User] check code for restore success',
	CheckCodeForRestoreError = '[User] check code for restore error',
}