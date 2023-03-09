import { PlatformPay } from "@stripe/stripe-react-native";
import StripeStyles from "./StripeStyles";

export const PaymentConfig = {
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
    LIVE_CARD_ID : 'ic_1KnTM2F05jLespP6wNLZQ1mu',
    PUBLISHABLE_KEY : 'pk_test_51MWjZwSIeh1iL1vKESVOivHC2zYSSYM2fxwVmOSINs7whg4SozQ8IfzHOqeRjlHMzgzThE7AYjXhVLbrtiHsrHBS009o0YbYWE',
}