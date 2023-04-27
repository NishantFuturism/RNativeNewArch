import { fireEvent, render, screen } from "@testing-library/react-native";
import React, { useEffect } from "react";
import UploadMultipleFile from "../src/UploadMultipleFile";

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