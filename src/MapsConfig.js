import { Dimensions } from "react-native"
import { MAP_TYPES, PROVIDER_GOOGLE } from "react-native-maps"

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = 37.78825
const LONGITUDE = -122.4324
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default {
    aspectRatio : ASPECT_RATIO,
    initialRegion : {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    },
    showsUserLocation : true,
    showsMyLocationButton : true,
    provider : PROVIDER_GOOGLE,
    mapType : MAP_TYPES.SATELLITE,
    userLocationUpdateInterval : 10000,
    
}