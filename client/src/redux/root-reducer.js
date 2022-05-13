import { combineReducers } from 'redux'; // combineReducers is a function that takes an object of reducers and combines them into one reducer
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import { persistReducer } from 'redux-persist';

// type of storage we want
import storage from "redux-persist/lib/storage"; // localStorage

// Json object that represents the possible configurations that we want for redux persist to use.
const persistConfig = {
    key: 'root',
    storage,
    // whitelist is an array containing the string names of the reducers we want to persist/store
    whitelist: ["cart"]
};

// I did this because I want to wrap the root reducer with persistReducer
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);

// export default combineReducers({
//     user: userReducer,
//     cart: cartReducer
// });