import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger'; // Redux logger middleware for debugging redux code
import thunk from 'redux-thunk';

import rootReducer from "./root-reducer";

// The middleware has to be an array because we might want to modify it later based on certain conditions
const middlewares = [thunk];

// If we don't want to use the logger on production, we can remove it from the array
if (process.env.NODE_ENV === "development") {
    //Process.env.NODE_ENV consists of development, production, test.
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };