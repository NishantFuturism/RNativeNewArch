import React from "react";
import { Platform } from "react-native";
import Checkout from "../Checkout";
import CheckoutIOS from "../CheckoutIOS";
import GooglePayScreen from "../GooglePaySheetStripe";
import StripePayment from "../StripePayment";

const FinalCheckoutGooglePay = props => {
      return(
        <>
       <StripePayment>
       <GooglePayScreen {...props}/>
       </StripePayment>
       </>
      )
}
export default FinalCheckoutGooglePay;