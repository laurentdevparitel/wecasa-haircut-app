import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from "../reducers/reducers.js";

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// persist store
// cf :https://github.com/rt2zz/redux-persist
//export default () => {  // KO
  let store = createStore(persistedReducer)
      store.subscribe(() => console.log('----> Redux action called !'))
  let persistor = persistStore(store)

  // Init store by passing URL param (http://localhost:3000/?resetStore)... TODO: add INI_STORE action
  let urlParams = new URLSearchParams(window.location.search);
  const resetStore = urlParams.has('resetStore');
  if (resetStore){
    persistor.purge().then(() => {
      console.log('<> Redux store purged !!')
    })
  }

  //return { store, persistor }
//}

export {store, persistor};
