import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../store/redux/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import profileNameReducer from './redux/userName';



const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    auth: authReducer,
    profileName: profileNameReducer
});



const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export const { dispatch } = store;

// export type RootState = ReturnType<typeof store.getState>;



// export default store;


export const persistor = persistStore(store);

export default store;
