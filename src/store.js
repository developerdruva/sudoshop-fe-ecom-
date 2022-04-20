import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from './redux/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key : 'root',
//     storage
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer, applyMiddleware(ReduxPromise));
// const persistor = persistStore(store);

// export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
//   }

// export default store;
// export {persistor};

const myStore = applyMiddleware(ReduxPromise)(createStore);

export default myStore(rootReducer, composeWithDevTools());    