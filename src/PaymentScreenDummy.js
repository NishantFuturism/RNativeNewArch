import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../colors';
import { PaymentConfig } from './PaymentConfig';



const PaymentScreenDummy  = ({
  paymentMethod,
  children,
  onInit,
}) => {
  const [loading, setLoading] = useState(true);


  async function fetchPublishableKey(
    paymentMethod) {
      console.log("method",paymentMethod)
    try {
      const response = await fetch(
        `${baseUrl}stripe-key?paymentMethod=${paymentMethod}`
        // `https://rigorous-heartbreaking-cephalopod.glitch.me/stripe-key?paymentMethod=${paymentMethod}`
      );
  
      const { publishableKey } = await response.json();
      console.log("publishableKey",publishableKey)
  
      return publishableKey;
    } catch (e) {
      console.warn('Unable to fetch publishable key. Is your server running?');
      Alert.alert(
        'Error',
        'Unable to fetch publishable key. Is your server running?'
      );
      return null;
    }
  }
  

  useEffect(() => {
    async function initialize() {
      // fetchPublishableKey('Cards');
      const publishableKey = PaymentConfig.PUBLISHABLE_KEY;
      if (publishableKey) {
        await initStripe({
          publishableKey,
          merchantIdentifier: 'merchant.com.stripe.react.native',
          urlScheme: 'stripe-example',
          setReturnUrlSchemeOnAndroid: true,
        });
        setLoading(false);
        onInit?.();
      }
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  ) : (
    <ScrollView
      accessibilityLabel="payment-screen"
      style={styles.container}
      keyboardShouldPersistTaps="always"
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});

export default PaymentScreenDummy;