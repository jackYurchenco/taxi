import { Action } from "@ngrx/store";

export interface Payload<T = any> extends Action {
    payload?: T
}