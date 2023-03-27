import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const AndroidMaps = props => {

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [state, setState] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })



  const onRegionChange = (region) => {
    setState(region);
  }

  return (
    <MapView
      region={region}
      style={styles.map}
      onRegionChange={onRegionChange}
      provider={PROVIDER_GOOGLE}
    >
      
        <Marker
          key={1}
          coordinate={state}
          title={"pinInterest"}
          description={"Changing Lives"}
        />
      
    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AndroidMaps;