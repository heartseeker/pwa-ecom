import * as cartActions from '../actions/cart.actions';

const initialState = {
    data: [],
    open: false,
    close: true,
};

export function reducer(state = initialState, action: cartActions.CartActions) {

    switch (action.type) {
        case cartActions.ADD_PRODUCT: {
            const cart = [...state.data, action.payload];
            return {data: cart, open: false, close: true};
        }
        case cartActions.REMOVE_PRODUCT: {
            const cart = state.data.filter((e, i) => i !== action.payload ? true : false);
            return {data: cart, open: true, close: false};
        }
        case cartActions.OPEN_PRODUCT: {
            const cart = [...state.data];
            return {data: cart, open: true, close: false};
        }
        case cartActions.CLOSE_PRODUCT: {
            const cart = [...state.data];
            return {data: cart, open: false, close: true};
        }
        default:
            return state;
    }
}
