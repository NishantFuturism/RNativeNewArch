import React, { useEffect, useState } from "react";
import FinalCheckoutCard from "./FinalCheckoutCard";
import FinalCheckoutGooglePay from "./FinalCheckoutGooglePay";

const FinalCheckout = (props) => {
    const [screen,setScreen] = useState(null);
useEffect(() => {
    if(props?.route?.params){
        const {total,currency,description} = props?.route?.params;
        if(props?.route?.params?.screenName === 'GPay'){
            setScreen(<FinalCheckoutGooglePay total={total}  currency={currency} description={description} />)
        }else{
            setScreen(<FinalCheckoutCard total={total}  currency={currency} description={description}/>)
        }
    }
},[props])
      return (screen);
}
export default FinalCheckout;