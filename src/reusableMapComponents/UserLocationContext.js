import React, { useState,useMemo, useEffect } from "react";
import { Context } from "./Context";
const UserLocationContext = (props) => {
    const [userLoc,setUserLoc] = useState({});

    const locationContext = useMemo(
        () => ({
          updateLocation : async (obj) => {
            try {
              // locationContext.userLocation = obj;
              console.log("inside context",obj);
              setUserLoc(obj);
            } catch (e) {
              console.log('error', e);
            }
    
          },
         userLocation : userLoc
        }),
        [],
      );

   return(
    <Context.Provider value={{...locationContext,userLocation : userLoc}}>
        {props.children}
    </Context.Provider>
   )   
}

export default UserLocationContext;