// cartItems is all the existing cart items that are in our cart items array right now
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (existingCartItem) {
        // cartItems.map returns a new array or new versions of our state(so that our comp know to re-render properly)
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ?
                // If the Item is found inside the cart Items array.
                { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // If the Item is not found in our cartItems array
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);
    // If the quantity is equal to 1 remove it.
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    // alternatively if the quantity isn't 1
    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};