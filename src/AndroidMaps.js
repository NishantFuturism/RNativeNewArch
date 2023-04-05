import React, { useEffect, useState } from "react";
import { PermissionsAndroid, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap, Polygon } from "react-native-maps";
import { points } from "./Points";
import GoogleGeoJson from "./reusableMapComponents/GoogleGeoJson";
import GoogleHeatmap from "./reusableMapComponents/GoogleHeatmap";
import GoogleMarker from "./reusableMapComponents/GoogleMarker";

const AndroidMaps = props => {

  const [region, setRegion] = useState({
    latitude: 37.8025259,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [state, setState] = useState({
    latitude: 37.78825,
    longitude: -122.4351431,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const myPlace = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [37.78825, -122.4324],
        }
      }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      requestCameraPermission();
    }, 5000);
    
  },[])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location',granted);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };



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
      
        {/* <Marker
          key={1}
          coordinate={state}
          title={"pinInterest"}
          description={"Changing Lives"}
        /> */}

        {/* <GoogleMarker 
        state={state}
        pinTitle={"pinInterest"}
        pinDescription={"Changing Lives"}
        /> */}

       {/* <GoogleHeatmap points={points} /> */}

       {/* <GoogleGeoJson myPlace={myPlace}/> */}

       {/* <Polygon 
       onPress={(poly) => {console.log(poly)}} 
       tappable={true} geodesic={true}  
       fillColor="rgba(255,0,0,0.5)" 
       strokeColor={"#000"} 
       strokeWidth={5} 
       holes={[[{latitude : state.latitude,longitude : state.longitude}]]} 
       coordinates={[{latitude : state.latitude,longitude : state.longitude}]} /> */}
       <Polygon
        coordinates={[
            { latitude: 37.8025259, longitude: -122.4351431 },
            { latitude: 37.7896386, longitude: -122.421646 },
            { latitude: 37.7665248, longitude: -122.4161628 },
            { latitude: 37.7734153, longitude: -122.4577787 },
            { latitude: 37.7948605, longitude: -122.4596065 },
            { latitude: 37.8025259, longitude: -122.4351431 }
        ]}
        strokeColor="#B24112" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={[
            '#7F0000',
            '#00000000',
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
        ]}
        strokeWidth={6}
        onPress={(poly) => {console.log(poly)}} 
        tappable={true} 
        geodesic={true}
        holes={[[
          { latitude: 37.8024100, longitude: -122.4350331 },
      ]]} 

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