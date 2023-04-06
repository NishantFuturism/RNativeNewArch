import { useRef, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const kmlData = {
    status: true,
    data: [
      {
        id: 3,
        polygons: [
          {latitude: 24.79672061085053, longitude: 46.69632228737188},
          {latitude: 24.79730088563427, longitude: 46.6960244924467},
          {latitude: 24.7969867813524, longitude: 46.69528762847696},
          {latitude: 24.796409228271, longitude: 46.69558319234557},
          {latitude: 24.79672061085053, longitude: 46.69632228737188},
        ],
        center: {latitude: 24.796853402304418, longitude: 46.69580273788693},
      },
      {
        id: 5,
        polygons: [
          {latitude: 24.79478092109267, longitude: 46.69287860779153},
          {latitude: 24.79491840277788, longitude: 46.69320194403617},
          {latitude: 24.79511421069013, longitude: 46.6931029170428},
          {latitude: 24.79497672880431, longitude: 46.69277958136081},
          {latitude: 24.79478092109267, longitude: 46.69287860779153},
        ],
        center: {latitude: 24.794971095661616, longitude: 46.693035073221495},
      },
  ]}
  

  export default function OptimisedMap({nav}) {
    const mapRef = useRef(null);
    const [markerType, setMarkerType] = useState(0);
    const [clickedPolygon, setClickedPolygon] = useState();
    const [mapType, setmapType] = useState(SATELLITE_MAP_MODE);
    const [trackViewChanges, settrackViewChanges] = useState(false);
    const [regionChanged, setregionChanged] = useState(null);
    const {data} = kmlData;
    const isIOS = Platform.OS === 'ios' ? true : false;
    const coordinatesData = data.map((v, i) => ({
      ...v,
      color:
        i % 2 === 0
          ? [0.5, 'green']
          : [0.8, 'red'],
    }));
    const navigation = nav;
    const initialRegion = {
      ...coordinatesData[0]?.polygons[0],
      latitudeDelta: 1,
      longitudeDelta: 50,
    };
  
    console.log('coordinatesDatacoordinatesData', coordinatesData);
  
    const onMapReady = () => {
      InteractionManager.runAfterInteractions(() => goToLocation());
      // getCenterOfAllPolygon();
    };
  
    const goToLocation = () => {
      let initCoordinates = coordinatesData[0]?.polygons[0] || [];
      let c2 = {
        ...initCoordinates,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      mapRef?.current?.animateToRegion(c2, 5 * 1000);
    };
  
    // const getCenterOfAllPolygon = () => {
    //   let centers = [];
    //   polygonsCoordinates.map((v, i) => {
    //     let c = getCenterPolygon(v);
    //     centers.push(c);
    //   });
    //   setPolygonCenters(centers);
    //   console.log('centers', centers);
    // };
  
    // let getCenterPolygon = coordinates => {
    //   let x = coordinates.map(c => c.latitude);
    //   let y = coordinates.map(c => c.longitude);
  
    //   let minX = Math.min.apply(null, x);
    //   let maxX = Math.max.apply(null, x);
  
    //   let minY = Math.min.apply(null, y);
    //   let maxY = Math.max.apply(null, y);
  
    //   return {
    //     latitude: (minX + maxX) / 2,
    //     longitude: (minY + maxY) / 2,
    //   };
    // };
  
    const onPressPolygon = (polygons, index = 0) => {
      console.log('onPressPolygononPressPolygon', polygons, index);
      setClickedPolygon(index);
      mapRef?.current?.fitToCoordinates(polygons, {
        edgePadding: {top: 2, right: 2, bottom: 2, left: 2},
        animated: true,
      });
    };
  
      const onRegionChangeComplete = param => {
      console.log('onRegionChangeComplete0', param);
      if (parseInt(param?.latitudeDelta.toFixed(2)) < 0.03) {
        //50//1
        if (param?.latitudeDelta.toFixed(5) !== regionChanged?.latitudeDelta) {
          setregionChanged({
            ...param,
            latitudeDelta: param?.latitudeDelta.toFixed(5),
            longitudeDelta: param?.longitudeDelta.toFixed(5),
          });
          let toFixedLat = param?.latitudeDelta;
          console.log('onRegionChangeComplete1', param);
          if (toFixedLat > 0.005) {
            setMarkerType(1);
          } else if (toFixedLat < 0.005) {
            setMarkerType(2);
          }
          //region change 0=nothing show
          //region change 1=dot show
          //region change 2=marker show
          settrackViewChanges(true);
          setTimeout(() => {
            settrackViewChanges(false);
          }, 100);
        }
      }
    };
  
    const setMapTypeFunc = () => {
      setmapType(v =>
        v === STANDARD_MAP_MODE ? SATELLITE_MAP_MODE : STANDARD_MAP_MODE,
      );
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.mapType(mapType)}
          onPress={setMapTypeFunc}>
          <Text>sdf</Text>
        </TouchableOpacity>
  
        {markerType ? null : (
          <View
            style={{
              ...styles.map,
              ...styles.loader,
            }}>
            <ActivityIndicator color={'red'} size="large" />
          </View>
        )}
  
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          onMapReady={onMapReady}
          initialRegion={initialRegion}
          mapType={mapType}
          onRegionChangeComplete={onRegionChangeComplete}>
          {!markerType
            ? null
            : coordinatesData.map((item, index) => (
                <View key={index}>
                  <Polygon
                    coordinates={item?.polygons}
                    strokeColor={
                      index !== clickedPolygon ? 'red' : 'black'
                    } // fallback for when `strokeColors` is not supported by the map-provider
                    fillColor={item?.color[index !== clickedPolygon ? 0 : 1]}
                    strokeWidth={index !== clickedPolygon ? 0.3 : 2}
                    tappable
                    geodesic
                    onPress={() => onPressPolygon(item?.polygons, index)}
                  />
                  <Marker
                    key={
                      isIOS() ? index : `${index}${trackViewChanges}`
                      // isIOS() ? index : `${index}${trackViewChanges}${Date.now()}`
                    }
                    opacity={markerType ? 1 : 0}
                    anchor={{x: 0.5, y: 0.5}}
                    centerOffset={{x: 0.5, y: 0.5}}
                    onPress={() => onPressPolygon(item?.polygons, index)}
                    coordinate={item?.center}
                    tracksViewChanges={isIOS() ? trackViewChanges : false}>
                    {!markerType ? (
                      <View />
                    ) : markerType === 1 ? (
                      <View style={styles.dot} />
                    ) : (
                      <Text style={styles.markerText}>1001</Text>
                    )}
                  </Marker>
                </View>
              ))}
        </MapView>
        {/* {clickedPolygon === null || clickedPolygon === undefined ? null : (
          <PopupBottom
            navigation={navigation}
            clickedPolygon={clickedPolygon}
            onPressCloseButton={() => setClickedPolygon(null)}
          />
        )} */}
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    back: {
      height: 20,
      width: 20,
      backgroundColor: 'red',
      position: 'absolute',
      zIndex: 1,
      left: 20,
      top: 50,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    markerText: {color: '#000', fontSize: 12},
    mapType: mapType => ({
      position: 'absolute',
      zIndex: 1,
      top: 160,
      left: 16,
      height: 30,
      width: 30,
      borderRadius: 4,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: mapType === STANDARD_MAP_MODE ? 'white' : 'green',
      justifyContent: 'center',
      alignItems: 'center',
      ...shadow.shadow,
    }),
    loader: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    dot: {
      height: 10,
      width: 10,
      borderRadius: 10,
      backgroundColor: 'white',
    },
  });
  