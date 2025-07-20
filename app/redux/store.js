import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PERSIST, PURGE, REGISTER, PAUSE } from 'redux-persist';
import { Tuple, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thunk } from 'redux-thunk';
import userReducer from './reducer/AuthReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};


const appReducer = combineReducers({
    user: userReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const myMiddleware = [thunk];
const myEnhancer = [];


// Create the Redux store with configured options
const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    enhancers: (getDefaultEnhancers) => {
        return getDefaultEnhancers().concat(myEnhancer)
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck:
        {
            ignoreActions:
                [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }),
})

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };