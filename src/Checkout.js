import { useStripe } from '@stripe/stripe-react-native';
import React, {useEffect, useState } from 'react';
import {Button ,Alert} from 'react-native';
import { config } from './Network';
import { PaymentConfig } from './PaymentConfig';


const Checkout = props => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    console.log(props);
    const {total,currency,description}  = props; 
    const url = config.IP_ADDRESS_LOCALHOST + 'stripe/checkout';
    const fetchPaymentSheetParams = async () => {
        //set localhost for ios simulator and ip address for android emulator

        // amt,currency,description

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total,
         currency,
         description
        }),
      });
      
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
  
      const { error } = await initPaymentSheet(
      {...PaymentConfig.Card,customerId  : customer,customerEphemeralKeySecret: ephemeralKey,paymentIntentClientSecret: paymentIntent}
      );
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
        }    
      };
  
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