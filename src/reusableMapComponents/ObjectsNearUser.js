import React, {useState, useEffect,Component, useContext} from 'react';
import {
  Text,
  TextInput,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ScrollView
} from 'react-native';
import { Context } from './Context';

const ObjectsNearUser = (props) => {

  const [insideArea,setInsideArea] = useState(false);
  const [placesUnderArea,setPlacesUnderArea] = useState([]);
  const [placesNearDefinedKM,setPlacesNearDefinedKM] = useState([]);
  // const { userLocation } = props.route.params.context;
  // const {context} = props.route.params;
  const userLocation = useContext(Context).userLocation;
 const  amIInsideOrOutsideArea = (myLocCoordinates) => {
  // let loc = props.route.params.context.userLocation();
  console.log("props.route.params.cf234fontext===>>>",userLocation);
    fetch('http://192.168.7.39:4242/areas/findAreasByUserLocation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coordinates: myLocCoordinates }),
    }).then(async res => {
      console.log("AmIInsideOrOutsideArea",res);
      if(res.status === 200){
        const resp = await res.json();
        if(resp.areas && resp.areas.length > 0){
          setInsideArea(true);
          console.log("resp.areas[0].area.coordinates",resp.areas[0].area.coordinates);
          placesComesUnderArea(resp.areas[0].area.coordinates[0])
        }else{
          setInsideArea(false);
        }
      }
    })
  }

 const placesComesUnderArea = (areaCoordinates) => {
  const arr = [];
  areaCoordinates.map(itemArr => {
    let array = [];
    array[0] = itemArr[0];
    array[1] = itemArr[0];
    arr.push(array)
  })
  console.log("placesComesUnderArea areaCoordinates==>>",arr);
    fetch('http://192.168.7.39:4242/maps/findNearByPlacesByBoundary', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coordinates: areaCoordinates }),
    }).then(async res => {
      console.log("placesComesUnderArea",res);
      if(res.status === 200){
        const resp = await res.json();
        console.log("SDFSDF__+",resp);
        if(resp.locations && resp.locations.length > 0){
          let names = [];
          resp.locations.map(item => {
            console.log("sdf===>>>",item);
             names.push(item.name);
          })
          setPlacesUnderArea(names);
        }else{
          setPlacesUnderArea([]);
        }
      }
    })
  }

const  findPlacesNearDefinedKm = (myLocCoordinates,maxDistance,minDistance) => {
    const params = {
      coordinates : myLocCoordinates,
      maxDistance : maxDistance,
      minDistance : minDistance
    }
    fetch('http://192.168.7.39:4242/maps/findNearByPlacesByDistance', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(async res => {
      console.log("findPlacesNearDefinedKm",res);
      if(res.status === 200){
        const resp = await res.json();
        if(resp.locations && resp.locations.length > 0){
          let names = [];
          resp.locations.map(item => {
            console.log("insideITem",item);
             names.push(item.name);
          })
          setPlacesNearDefinedKM(names)
        }else{
          setPlacesNearDefinedKM([]);
        }
      }
    })
  }

  useEffect(() => {
    
      amIInsideOrOutsideArea([userLocation.longitude,userLocation.latitude]);
      // findPlacesNearDefinedKm([userLocation.longitude,userLocation.latitude],5000,5)
  },[])

   return(
    <ScrollView contentContainerStyle={{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
    <TouchableOpacity onPress={() => {amIInsideOrOutsideArea([userLocation.longitude,userLocation.latitude])}}><Text>Check if i am inside area</Text></TouchableOpacity>
      <Text>You are {insideArea ? 'Inside' : 'Outside'} this Area</Text>
    <TouchableOpacity onPress={() => {
      // placesComesUnderArea()
      // findPlacesNearDefinedKm([userLocation.longitude,userLocation.latitude],5000,5)
      }}><Text>Check List of Places under Geozone</Text></TouchableOpacity>
       {placesUnderArea.length > 0 && placesUnderArea.map((item,index) => 
        <Text key={index}>{item}</Text>
       )}
    <TouchableOpacity onPress={() => {findPlacesNearDefinedKm([userLocation.longitude,userLocation.latitude],5000,5)}}><Text>Find Places Near Defined KM</Text></TouchableOpacity>
    {placesNearDefinedKM.length > 0 && placesNearDefinedKM.map((item,index) => 
        <Text key={index}>{item}</Text>
       )}
    </ScrollView>
   )
}

export default ObjectsNearUser;