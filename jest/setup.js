// const { store } = require('../src/redux');
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
// import {persistStore, persistReducer} from 'redux-persist';
// import productsReducers from '../src/redux/reducers/Product';
// import ReduxThunk from 'redux-thunk';

// const rootReducer = combineReducers({
//     product: productsReducers,
//   });
  
//   const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//   };

// jest.mock('react-native-document-picker', () =>
//   require('react-native-document-picker')
// );


  
  jest.mock('react-native/Libraries/Network/FormData', () => {
    require('react-native/Libraries/Network/FormData')
  });
  
  
  jest.mock("react-native-document-picker", () => {
    return {
      pickMultiple : jest.fn().mockResolvedValueOnce(),
      isCancel : jest.fn().mockResolvedValueOnce(),
      types : jest.fn().mockResolvedValueOnce(),
      pdf : jest.fn().mockResolvedValueOnce(),
      images : jest.fn().mockResolvedValueOnce(),
    };
  });
