import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator, Alert} from 'react-native';


const AddressCollectorSheet = props => {
  const { AddressSheet,AddressSheetError } = require("@stripe/stripe-react-native");
   return(
    <AddressSheet
    appearance={{
      colors: {
        primary: '#F8F8F2',
        background: '#272822'
      }
    }}
    defaultValues={{
      phone: '111-222-3333',
      address: {
        country: 'United States',
        city: 'San Francisco',
      },
    }}
    additionalFields={{
      phoneNumber: 'required',
    }}
    allowedCountries={['US', 'CA', 'GB']}
    primaryButtonTitle={'Use this address'}
    sheetTitle={'Shipping Address'}
    // googlePlacesApiKey={'(optional) YOUR KEY HERE'}
    visible={true}
  onSubmit={async (addressDetails) => {
    // Make sure to set `visible` back to false to dismiss the address element.
    // setAddressSheetVisible(false);
    
    // Handle result and update your UI
  }}
  onError={(error) => {
    if (error.code === AddressSheetError.Failed) {
      Alert.alert('There was an error.', 'Check the logs for details.');
      console.log(err?.localizedMessage);
    }
   // Make sure to set `visible` back to false to dismiss the address element.
    // setAddressSheetVisible(false);
  }}
  />
   )
}


export default AddressCollectorSheet;