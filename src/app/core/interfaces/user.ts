import { Discount } from "../../auth/shared/interfaces/discount";

export interface User {
	name: string | null,
	phone: string | null,
	balance: number,
	address: string | null,
	addressNumber: string | null,
	addressEntrance: number,
	addressApartment: number,
	roles: Array<string>,
	clientSubCards: number | null,
	version: number,
	discount: Discount,
	paymentType: number,
	clientBonuses: number,
	token: string | null
}
