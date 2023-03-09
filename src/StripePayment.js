import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator} from 'react-native';

import { StripeProvider } from '@stripe/stripe-react-native';
import { PaymentConfig } from './PaymentConfig';

const StripePayment = ({children}) => {
    return(
      <StripeProvider
      publishableKey={PaymentConfig.PUBLISHABLE_KEY}
      //urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    //   merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      {children}
    </StripeProvider>)
}

export default StripePayment;