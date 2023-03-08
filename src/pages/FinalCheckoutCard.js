import React from "react";
import { Platform } from "react-native";
import Checkout from "../Checkout";
import CheckoutIOS from "../CheckoutIOS";

const FinalCheckoutCard = props => {
      return(
        <>
       {Platform.OS === 'android' ? <Checkout {...props} /> : <CheckoutIOS/>} 
       </>
      )
}
export default FinalCheckoutCard;