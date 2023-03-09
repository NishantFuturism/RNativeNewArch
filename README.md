# react-native-stripe-reusable

[![NPM](https://nodei.co/npm/react-native-stripe.png?downloads=true)](https://nodei.co/npm/react-native-stripe-reusable/)

**A ReactNative's Stripe component with reusability.**

Stripe Complexity is turned into simple plug and play

Note : 
## Very Important Note :


<img src='01-grid-list-pagination/public/RNFlatlistMultiFeature.png' alt='img' />

## Installation

Install `react-native-stripe-reusable` with [npm](https://www.npmjs.com/):

```
npm install react-native-stripe-reusable --save

```

## Usage

```javascript
{
    gPay : {
        PlatformPayment : {
            currencyCode: 'USD',
            testEnv: true,
            merchantName: 'Test',
            merchantCountryCode: 'US',
            billingAddressConfig: {
              format: PlatformPay.BillingAddressFormat.Full,
              isPhoneNumberRequired: true,
              isRequired: true,
            },
        },
        PlatformPaymentWithExtraDetails : {
            shippingAddressConfig: {
                isRequired: true,
              },
              isEmailRequired: true,
        }       
    },
    Card : {
        merchantDisplayName: "Example, Inc.",
        customerId: '',
        googlePay: {
          merchantCountryCode: 'US',
          testEnv: true, // use test environment
        },
        customerEphemeralKeySecret: '',
        paymentIntentClientSecret: '',
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'George Dane',
        },
        // appearance : StripeStyles.CardSheet
    },
    LIVE_CARD_ID : 'id starts with ic_randomAlphaNUm',
    PUBLISHABLE_KEY : 'your key starts with pk_test_',
}

```



## Props

| Name                     | Type       | Description                                                                                                                                                            |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
                                                                                                                              <!-- | -->
| `PaymentConfig`                 | `object`   | **Required.** The object contains parameters like below keys : 
     gPay,
     Card,
     LiveCardId,
     PublishableKey
                                                                                                                                  |