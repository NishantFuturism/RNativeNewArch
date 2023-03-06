import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList,Button ,Alert,ActivityIndicatorComponent, ActivityIndicator} from 'react-native';
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import { config } from './Network';

export default function CheckoutIOS() {
  // const { confirmPayment } = useStripe();
  const {confirmPayment, loading} = useConfirmPayment();
  const baseUrl = config.IP_ADDRESS_LOCALHOST;
  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${baseUrl}stripe/checkoutIOS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    const {clientSecret} = await response.json();

    return clientSecret;
  };

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails = {
      email: 'jenny.rosen@example.com',
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();
    console.log("ClientSecreat",clientSecret);

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };


  return (
    <View>
       <CardField
      postalCodeEnabled={true}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
       <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
   
  );
}