const { store } = require('../src/redux');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import productsReducers from '../src/redux/reducers/Product';
import ReduxThunk from 'redux-thunk';

// const rootReducer = combineReducers({
//     product: productsReducers,
//   });
  
//   const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//   };

jest.mock("react-native-bootsplash", () => {
    return {
      hide: jest.fn().mockResolvedValueOnce(),
      getVisibilityStatus: jest.fn().mockResolvedValue("hidden"),
    };
  });

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native/Libraries/Lists/FlatList', () => {
    const RN = jest.requireActual('react-native');
    return RN.ScrollView;
  });

jest.mock('redux-persist', () => {
    const real = jest.requireActual('redux-persist');
    // console.log("Nishhhh",real);
    return {
      ...real,
      persistReducer: jest
        .fn()
        .mockImplementation((config, reducers) =>   { 
          // console.log("config",config); console.log("reducers",reducers);
          // const rootReducer = combineReducers({
          //   product: productsReducers,
          // });
          // const persistConfig = config;
          // const persistedReducer = persistReducer(persistConfig, rootReducer);

          // const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

          // const persistor = persistStore(store);

          return reducers}  ),
    };
});
