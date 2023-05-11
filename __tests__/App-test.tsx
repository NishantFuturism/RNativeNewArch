/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import NetworkManager from '../src/NetworkManager';
import NetworkConstants from '../src/constants/NetworkConstants';
import axios from 'axios';

it('renders correctly', () => {
  renderer.create(<App />);
});

jest.mock('axios');


test('createUser calls fetch with the right args and returns the user id', async () => {
  
    
    const mockFn =  jest.fn(res => {console.log("blablabla",res);res ;} );

 await   mockFn(NetworkManager.httpManager(
      NetworkConstants.request_type.get,
      "https://jsonplaceholder.typicode.com/posts",
      NetworkConstants.headerTypes.normalHeader
      ));
      
      
      
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith(NetworkManager.httpManager(
        NetworkConstants.request_type.get,
        "https://jsonplaceholder.typicode.com/posts",
        NetworkConstants.headerTypes.normalHeader
        ));
      expect(mockFn).toHaveReturnedWith(200);
 
});
