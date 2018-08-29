import { Action } from '@ngrx/store';


export const ADD_FAVORITE = '[Favorite] Add';
export const REMOVE_FAVORITE = '[Favorite] Remove';
export const REMOVE_CLOSE_FAVORITE = '[Favorite] Remove Close';
export const OPEN_FAVORITE = '[Favorite] Open';
export const CLOSE_FAVORITE = '[Favorite] Close';

export class AddFavorite implements Action {
    readonly type = ADD_FAVORITE;

    constructor(public payload) {}
}

export class RemoveFavorite implements Action {
    readonly type = REMOVE_FAVORITE;

    constructor(public payload: number) {}
}

export class RemoveCloseFavorite implements Action {
    readonly type = REMOVE_CLOSE_FAVORITE;

    constructor(public payload: number) {}
}

export class OpenFavorite implements Action {
    readonly type = OPEN_FAVORITE;
}

export class CloseFavorite implements Action {
    readonly type = CLOSE_FAVORITE;
}


export type FavoriteActions = AddFavorite | RemoveFavorite | RemoveCloseFavorite | OpenFavorite | CloseFavorite;
