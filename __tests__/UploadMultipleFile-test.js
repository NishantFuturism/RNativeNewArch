import { fireEvent, render, screen } from "@testing-library/react-native";
import React, { useEffect } from "react";
import UploadMultipleFile from "../src/UploadMultipleFile";
import { saveFileToServer } from "../src/Utils";
// import {Response} from 'fetch'
test('Submit File Response and Check API', async () => {
    // const docsArr = [{"fileCopyUri": null, "name": "Print.PDF", "size": 422159, "type": "application/pdf", "uri": "content://com.android.externalstorage.documents/document/primary%3APrint.PDF"}];
    const mockFn = jest.fn(res => {console.log(res);return res});
  
    const { getByText } = render(
      <UploadMultipleFile submit={mockFn}/>
    );

    /* Motivation behind this */
    // test('drink returns La Croix', () => {
    //   const beverage = {name: 'La Croix'};
    //   const drink = jest.fn(beverage => beverage.name);
    
    //   drink(beverage);
    
    //   expect(drink).toHaveReturnedWith('La Croix');
    // });

    fireEvent.press(getByText('UploadFile'));

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toReturnWith("Files Succesfully Added");
  });




test('Mock Upload file to server', async () => {

  // const the = jest.requireActual('fetch');
  const docsArray = [
    {
      "fileCopyUri": null,
      "name": "IMG_20190722_213027.jpg",
      "size": 17401462,
      "type": "image/jpeg",
      "uri": "content://com.android.providers.media.documents/document/image%3A1856"
    }
  ];
  var formdata = new FormData();

docsArray.forEach(doc => {
  formdata.append("image", new Blob(docsArray), doc.name);
})

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  


 const fetchMock = jest.fn((url,options) => saveFileToServer(url,options));
//  const fetchMock = jest.fn((url,options) => Promise.resolve({"status" : 200,"message":"Files created successfully"}));


  let rs = await fetchMock("http://192.168.43.194:4242/storage/uploadFile",requestOptions);

  // const serverResp  = {"message":"Files created successfully"};
// console.log("rs",rs);

// rs = JSON.stringify(rs);
console.log("rsrsrs=====>>",JSON.parse(rs));

  rs = JSON.parse(rs)
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith('http://192.168.43.194:4242/storage/uploadFile', requestOptions);
  expect(rs.status).toBe(undefined);
  expect(rs.message).toBe("Files created successfully");
});