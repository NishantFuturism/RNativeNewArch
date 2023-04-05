import React from "react"
import Geojson  from "react-native-maps"

const GoogleGeoJson = props => {
    return(
        <Geojson
      geojson={props?.myPlace ? props?.myPlace : {}} 
      strokeColor="red"
      fillColor="green"
      strokeWidth={2}
    />
    )
}

export default GoogleGeoJson;