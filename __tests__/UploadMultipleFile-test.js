import { fireEvent, render, screen } from "@testing-library/react-native";
import React, { useEffect } from "react";
import UploadMultipleFile from "../src/UploadMultipleFile";

test('Submit File Response and Check API', async () => {
    const docsArr = [{"fileCopyUri": null, "name": "Print.PDF", "size": 422159, "type": "application/pdf", "uri": "content://com.android.externalstorage.documents/document/primary%3APrint.PDF"}];
    const mockFn = jest.fn();
  
    const { getByText } = render(
      <UploadMultipleFile docsArr={docsArr} onSubmit={mockFn} />
    );
  

    fireEvent.press(getByText('UploadFile'));

    expect(mockFn).toReturnWith("Files Succesfully Added")

  });