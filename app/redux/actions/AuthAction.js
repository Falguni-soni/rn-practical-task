export const signupUser = (userData) => {
    return {
        type: 'SIGNUP_USER',
        payload: userData,
    };
};

export const loginUser = () => {
    return {
        type: 'LOGIN_USER',
    };
};

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER',
    };
};
