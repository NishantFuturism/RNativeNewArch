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

it('renders correctly', () => {
  renderer.create(<App />);
});




test('Test Get API', async () => {
  jest.mock('axios');
  // jest.useFakeTimers({timerLimit : 20000});
  // jest.setTimeout(20000)
    const fetchMock =  jest.fn((type,url,header) => NetworkManager.httpManager(type,url,header));

      
    let rs = await fetchMock(NetworkConstants.request_type.get,
      "http://192.168.4.93:4242/storage/getFiles",
      NetworkConstants.headerTypes.normalHeader);
      // console.log(rs);
      
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(rs?.status).toEqual(200);
      expect(fetchMock).toHaveBeenCalledWith(NetworkConstants.request_type.get,
        "http://192.168.4.93:4242/storage/getFiles",
        NetworkConstants.headerTypes.normalHeader);
      expect(fetchMock).toBeDefined();
      const statuses = [201,204,304,400,401,403,404,405,415,429,500];
      statuses.forEach(status => {
        expect(rs?.status).not.toBe(status);
      });
      
      expect(rs?.data.message).toBeDefined();
      expect(rs?.data.totalFiles).toBeCloseTo(10);
      
      expect(rs?.data.files).toBeInstanceOf(Array);
      expect(rs?.data.files).not.toHaveLength(0);

      fetchMock(NetworkConstants.request_type.get,
        "http://192.168.4.93:4242/storage/getFiles",
        NetworkConstants.headerTypes.normalHeader)
        .catch(e => expect(e).toMatch(e));

 
});

test('Test POST API', async () => {
  jest.mock('axios');
  // jest.useFakeTimers({timerLimit : 20000});
  // jest.setTimeout(20000)
    const fetchMock =  jest.fn((type,url,header,body) => NetworkManager.httpManager(type,url,header,body));
    const data = { title: 'My title', body: 'This is the body of the message.' }
      
    let rs = await fetchMock(NetworkConstants.request_type.post,
      "https://jsonplaceholder.typicode.com/posts",
      NetworkConstants.headerTypes.normalHeader,data);

      
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(rs?.status).toEqual(201);
      expect(fetchMock).toHaveBeenCalledWith(NetworkConstants.request_type.post,
        "https://jsonplaceholder.typicode.com/posts",
        NetworkConstants.headerTypes.normalHeader,data);
      expect(fetchMock).toBeDefined();
 
});

test('Test PUT API', async () => {
  jest.mock('axios');
  // jest.useFakeTimers({timerLimit : 20000});
  // jest.setTimeout(20000)
    const fetchMock =  jest.fn((type,url,header,body) => NetworkManager.httpManager(type,url,header,body));
    const data = { title: 'My title', body: 'This is the bodddy of the message.' }
      
    let rs = await fetchMock(NetworkConstants.request_type.put,
      "https://jsonplaceholder.typicode.com/posts/1",
      NetworkConstants.headerTypes.normalHeader,data);

      
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(rs?.status).toEqual(200);
      expect(fetchMock).toHaveBeenCalledWith(NetworkConstants.request_type.put,
        "https://jsonplaceholder.typicode.com/posts/1",
        NetworkConstants.headerTypes.normalHeader,data);
      expect(fetchMock).toBeDefined();
 
});

test('Test DELETE API', async () => {
  jest.mock('axios');
  jest.useFakeTimers({timerLimit : 20000});
  jest.setTimeout(20000)
    const fetchMock =  jest.fn((type,url,header) => NetworkManager.httpManager(type,url,header));
      
    let rs = await fetchMock(NetworkConstants.request_type.delete,
      "https://jsonplaceholder.typicode.com/posts/1",
      NetworkConstants.headerTypes.normalHeader);

      
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(rs?.status).toEqual(200);
      expect(fetchMock).toHaveBeenCalledWith(NetworkConstants.request_type.delete,
        "https://jsonplaceholder.typicode.com/posts/1",
        NetworkConstants.headerTypes.normalHeader);
      expect(fetchMock).toBeDefined();
 
});






