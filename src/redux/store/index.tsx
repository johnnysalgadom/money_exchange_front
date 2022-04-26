import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "../root-reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(makeStore)

const exportedObject = {
  makeStore,
  persistor,
};

export default exportedObject
