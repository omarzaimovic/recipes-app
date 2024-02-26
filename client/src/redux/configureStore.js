import {configureStore,combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
//import thunk from 'redux-thunk';

import recipeReducer from './recipes/recipesSlice';


const persistConfig={
    key:'root',
    version:1,
    storage
}

const reducer = combineReducers({
    recipes:recipeReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store= configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    }),
    devTools:true
});

export const persistor = persistStore(store);