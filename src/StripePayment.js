import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator} from 'react-native';

import { StripeProvider } from '@stripe/stripe-react-native';

const StripePayment = ({children}) => {
    return(
      <StripeProvider
      publishableKey="pk_test_51MWjZwSIeh1iL1vKESVOivHC2zYSSYM2fxwVmOSINs7whg4SozQ8IfzHOqeRjlHMzgzThE7AYjXhVLbrtiHsrHBS009o0YbYWE"
      //urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    //   merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      {children}
    </StripeProvider>)
}

export default StripePayment;