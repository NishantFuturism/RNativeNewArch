import { useStripe } from '@stripe/stripe-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList,Button ,Alert,ActivityIndicatorComponent, ActivityIndicator} from 'react-native';
import StripePayment from './StripePayment';
import StripeStyles from './StripeStyles';

const Checkout = props => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
        //set localhost for ios simulator and ip address for android emulator
      const response = await fetch("http://192.168.4.93:8080/stripe/checkout");
      
        const { paymentIntent, ephemeralKey, customer} = await response.json();
      
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
        // appearance : StripeStyles.CardSheet
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
        }    };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
     
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
          color="red"
        />
  
    );
}

export default Checkout;