// we use reselect to memoize the function(i.e. to cache the result of the function in order to avoid unnecessary re-rendering. and for reusability of the code)
import { createSelector } from 'reselect';

// Input selector: takes the entire state as an argument and return a slice of it. and does not use createSelector
const selectCart = state => state.cart;

// output selector: it uses both input selectors and createSelector to build themself
// createSelector takes 2 arguments: 1. a collection of input selector, 2. a function that takes the output of the input selector and returns a slice of it.
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
        0
    ),
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity * cartItem.price,
        0
    ),
);