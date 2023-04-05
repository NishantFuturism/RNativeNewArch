import React from "react";
import { Marker } from "react-native-maps";


const GoogleMarker = (props) => {
return(
    <Marker
        //   key={1}
          coordinate={props?.state ? props.state : {}}
          title={props?.pinTitle ?  props?.pinTitle : "pinInterest"}
          description={props?.pinDescription ? props?.pinDescription : "Changing Lives"}
        />
)
}

export default GoogleMarker;