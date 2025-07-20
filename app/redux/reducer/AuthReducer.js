const initialState = {
    userData: null,
    isUserLoggedIn: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGNUP_USER':
            return {
                ...state,
                userData: action.payload,
            };

        case 'LOGIN_USER':
            return {
                ...state,
                isUserLoggedIn: true,
            };

        case 'LOGOUT_USER':
            return {
                ...state,
                isUserLoggedIn: false,
            };

        default:
            return state;
    }
}
