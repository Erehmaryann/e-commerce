import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
};

const UserReducer = (initialState = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...initialState,
                currentUser: action.payload
            };
        default:
            return initialState;
    }
};

export default UserReducer;