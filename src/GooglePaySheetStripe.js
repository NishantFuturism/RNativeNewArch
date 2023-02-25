import React, { useEffect, useState } from 'react';
import {
  AddToWalletButton,
  canAddCardToWallet,
  createPlatformPayPaymentMethod,
  confirmPlatformPayPayment,
  isPlatformPaySupported,
  PlatformPay,
  PlatformPayButton,
} from '@stripe/stripe-react-native';

import { Alert, StyleSheet, View, Image } from 'react-native';
// @ts-ignore
// import AddToGooglePayPNG from '../assets/Add-to-Google-Pay-Button-dark-no-shadow.png';
import PaymentScreenDummy from './PaymentScreenDummy';

const LIVE_CARD_ID = 'ic_1KnTM2F05jLespP6wNLZQ1mu';

export default function GooglePayScreen() {
  const [isGooglePaySupported, setIsGooglePaySupported] = useState(false);
  const [ephemeralKey, setEphemeralKey] = useState({});
  const [showAddToWalletButton, setShowAddToWalletButton] = useState(true);
  const [cardDetails, setCardDetails] = useState(null);
  const [androidCardToken, setAndroidCardToken] =
    useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    fetchEphemeralKey();
    checkIfCardInWallet();
    checkIfGooglePayIsSupported();
    fetchPaymentIntentClientSecret();
  }, []);

  const checkIfGooglePayIsSupported = async () => {
    setIsGooglePaySupported(await isPlatformPaySupported());
  };

  const checkIfCardInWallet = async () => {
    const response = await fetch(`http://192.168.43.194:4242/issuing-card-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: LIVE_CARD_ID,
      }),
    });

    const card = await response.json();

    setCardDetails(card);

    const { canAddCard, details, error } = await canAddCardToWallet({
      primaryAccountIdentifier: card?.wallet?.primary_account_identifier,
      cardLastFour: card.last4,
    });

    if (error) {
      Alert.alert(error.code, error.message);
    } else {
      setShowAddToWalletButton(canAddCard ?? false);
      if (details?.status) {
        console.log(`Card status for native wallet: ${details.status}`);
      }
      if (
        details?.token?.status === 'TOKEN_STATE_NEEDS_IDENTITY_VERIFICATION'
      ) {
        setAndroidCardToken(details.token);
      }
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`http://192.168.43.194:4242/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
        items: ['id-1'],
        force3dSecure: true,
      }),
    });
    const result = await response.json();
    if (!result.clientSecret) {
      Alert.alert('Error fetching client secret.', result.error);
    }
    setClientSecret(result.clientSecret);
  };

  const pay = async () => {
    const { error, paymentIntent } = await confirmPlatformPayPayment(
      clientSecret,
      {
        googlePay: {
          testEnv: true,
          merchantName: 'Test',
          merchantCountryCode: 'US',
          currencyCode: 'usd',
          billingAddressConfig: {
            format: PlatformPay.BillingAddressFormat.Full,
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      }
    );

    if (error) {
      Alert.alert('Failure', error.localizedMessage);
    } else {
      Alert.alert('Success', 'Check the logs for payment intent details.');
      console.log(JSON.stringify(paymentIntent, null, 2));
      setClientSecret(null);
    }
  };

  /*
    As an alternative you can only create a paymentMethod instead of confirming the payment.
  */
  const createPaymentMethod = async () => {
    const { error, paymentMethod } = await createPlatformPayPaymentMethod({
      googlePay: {
        amount: 12,
        currencyCode: 'USD',
        testEnv: true,
        merchantName: 'Test',
        merchantCountryCode: 'US',
        billingAddressConfig: {
          format: PlatformPay.BillingAddressFormat.Full,
          isPhoneNumberRequired: true,
          isRequired: true,
        },
        shippingAddressConfig: {
          isRequired: true,
        },
        isEmailRequired: true,
      },
    });

    if (error) {
      Alert.alert('Failure', error.localizedMessage);
    } else {
      Alert.alert('Success', 'Check the logs for payment method details.');
      console.log(JSON.stringify(paymentMethod, null, 2));
    }
  };

  const createToken = async () => {
    const { error, token } = await createPlatformPayPaymentMethod({
      googlePay: {
        amount: 12,
        currencyCode: 'USD',
        testEnv: true,
        merchantName: 'Test',
        merchantCountryCode: 'US',
        billingAddressConfig: {
          format: PlatformPay.BillingAddressFormat.Full,
          isPhoneNumberRequired: true,
          isRequired: true,
        },
        shippingAddressConfig: {
          isRequired: true,
        },
        isEmailRequired: true,
      },
    });

    if (error) {
      Alert.alert('Failure', error.localizedMessage);
    } else {
      Alert.alert('Success', 'Check the logs for token details.');
      console.log(JSON.stringify(token, null, 2));
    }
  };

  const fetchEphemeralKey = async () => {
    const response = await fetch(`http://192.168.43.194:4242/ephemeral-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiVersion: '2022-11-15',
        issuingCardId: LIVE_CARD_ID,
      }),
    });
    const key = await response.json();
    console.log("key",key)
    setEphemeralKey(key);
  };

  return (
    <PaymentScreenDummy>
      <View style={styles.row}>
        <PlatformPayButton
          disabled={!isGooglePaySupported || !clientSecret}
          style={styles.payButton}
          type={PlatformPay.ButtonType.Pay}
          onPress={pay}
        />
      </View>

      <View style={styles.row}>
        <PlatformPayButton
          disabled={!isGooglePaySupported}
          style={styles.standardButton}
          type={PlatformPay.ButtonType.GooglePayMark}
          onPress={createPaymentMethod}
        />

        <PlatformPayButton
          disabled={!isGooglePaySupported}
          style={styles.standardButton}
          onPress={createToken}
        />
      </View>
      {showAddToWalletButton && isGooglePaySupported && (
        <View style={styles.row}>
          <AddToWalletButton
            // androidAssetSource={Image.resolveAssetSource(AddToGooglePayPNG)}
            style={styles.addToWalletButton}
            cardDetails={{
              name: cardDetails?.cardholder?.name,
              primaryAccountIdentifier:
                cardDetails?.wallet?.primary_account_identifier,
              lastFour: cardDetails?.last4,
              description: 'Added by Stripe',
            }}
            token={androidCardToken}
            ephemeralKey={ephemeralKey}
            onComplete={({ error }) => {
              Alert.alert(
                error ? error.code : 'Success',
                error
                  ? error.message
                  : 'Card was successfully added to the wallet.'
              );
            }}
          />
        </View>
      )}
    </PaymentScreenDummy>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  payButton: {
    width: 202,
    height: 48,
  },
  standardButton: {
    width: 112,
    height: 48,
  },
  addToWalletButton: {
    width: 190,
    height: 60,
  },
});
