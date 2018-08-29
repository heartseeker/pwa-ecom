import { Action } from '@ngrx/store';


export const ADD_PRODUCT = '[Cart] Add';
export const REMOVE_PRODUCT = '[Cart] Remove';
export const OPEN_PRODUCT = '[Cart] Open';
export const CLOSE_PRODUCT = '[Cart] Close';

export class AddCart implements Action {
    readonly type = ADD_PRODUCT;

    constructor(public payload) {}
}

export class RemoveCart implements Action {
    readonly type = REMOVE_PRODUCT;

    constructor(
        public payload: number
    ) {}
}

export class OpenCart implements Action {
    readonly type = OPEN_PRODUCT;
}

export class CloseCart implements Action {
    readonly type = CLOSE_PRODUCT;
}


export type CartActions = AddCart | RemoveCart | OpenCart | CloseCart;
