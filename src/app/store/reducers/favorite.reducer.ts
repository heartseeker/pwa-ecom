import * as favoriteActions from '../actions/favorite.actions';

const initialState = {
    data: [],
    open: false,
    close: true,
};

export function reducer(state = initialState, action: favoriteActions.FavoriteActions) {

    switch (action.type) {
        case favoriteActions.ADD_FAVORITE: {
            const cart = [...state.data, action.payload];
            return {data: cart, open: false, close: true};
        }
        case favoriteActions.REMOVE_FAVORITE: {
            const cart = state.data.filter((e, i) => i !== action.payload ? true : false);
            return {data: cart, open: true, close: false};
        }
        case favoriteActions.REMOVE_CLOSE_FAVORITE: {
            const cart = state.data.filter((e, i) => i !== action.payload ? true : false);
            return {data: cart, open: false, close: true};
        }
        case favoriteActions.OPEN_FAVORITE: {
            const cart = [...state.data];
            return {data: cart, open: true, close: false};
        }
        case favoriteActions.CLOSE_FAVORITE: {
            const cart = [...state.data];
            return {data: cart, open: false, close: true};
        }
        default:
            return state;
    }
}
