import React, {useState, useEffect,Component} from 'react';
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
  PermissionsAndroid
} from 'react-native';

import MapView, {
  MAP_TYPES,
  Polygon,
  ProviderPropType,
  PROVIDER_GOOGLE,
  Marker
} from 'react-native-maps'
import { Context } from './Context';
// import GoogleMarker from './GoogleMarker';

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = 37.78825
const LONGITUDE = -122.4324
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
let id = 0
// const {updateLocation} = React.useContext(Context);

class ExampleMaps extends Component {
  static contextType = Context;
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      polygons: [],
      editing: null,
      creatingHole: false,
      polygonName : '',
      modalVisiblility : false,
      pinModalVisibility : false,
      createPinModeActive : false,
      pinpointName : '',
      pinpointCoordinate : [],
      pinpointPlaces : [],
      showAndProceedBtnVisibility : true
    }
  }


  componentDidMount() {
    // this.requestCameraPermission();
    this.getPolygons();
    this.getPinPoints();
  }

   showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  getPolygons = () => {
    fetch('http://192.168.7.39:4242/areas/getGeofencedArea').then(async res => {
      let convertedResp = await res.json()
      if (convertedResp.areas) {
        // convertedResp = JSON.parse(convertedResp.areas[0]);
        // console.log(this.state.polygons)
        let arr = [];
        convertedResp.areas.map((item, index) => {
          // console.log("item.area.coordinates[0]",item.area.coordinates[0][0]);       
          arr.push({
            id: item._id,
            coordinates: item.area.coordinates[0],
            holes: [],
            name: item.name
          })
        })
        // console.log("ARR",JSON.stringify(arr[0].coordinates));
        this.setState({ polygons: arr })
      }
    });
  }

  getPinPoints = () => {
    fetch('http://192.168.7.39:4242/maps/getPlacesPinpoints').then(async res => {
      let convertedResp = await res.json()
      if (convertedResp.places) {
        // convertedResp = JSON.parse(convertedResp.areas[0]);
        // console.log(this.state.polygons)
        let arr = [];
        convertedResp.places.map((place, index) => {
          // console.log("item.area.coordinates[0]",item.area.coordinates[0][0]);       
          arr.push({ coordinate :  {latitude: place.location.coordinates[1], longitude : place.location.coordinates[0]},name : place.name})
        })
        // console.log("ARR",JSON.stringify(arr[0].coordinates));
        this.setState({ pinpointPlaces : arr })
        this.setState({createPinModeActive : false})
      }
    });
  }

  finish() {

    this.setState({modalVisiblility : true})

   

  }
  

  clear = () => {
    this.setState({
      polygons: [],
      editing: null,
      creatingHole: false
    })
    const _ids = [];
    this.state.polygons.filter(item => {
      _ids.push(item.id);
    });
    if (_ids.length == 0){
      return;
    } 
    console.log(_ids);
    fetch('http://192.168.7.39:4242/areas/deleteAllGeofencedArea', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _ids: _ids }),
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          polygons: [],
          editing: null,
          creatingHole: false
        })
      }
    })

  }

   requestLocationPermission = async () => {
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



  deletePolygon = (id) => {
    fetch('http://192.168.7.39:4242/areas/deleteGeofencedAreaById', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    }).then(res => {
      if (res.status === 200) {
        let polyArr = [...this.state.polygons];

        polyArr = polyArr.filter(item => item.id !== id);
        console.log("polyArr", polyArr);
        this.setState({ polygons: polyArr });
      }
    });
  }

  savePolygonToServer = () => {
    // bdy.name = "manish nagar";
    const polyg = [];
    // console.log("this.state.polygons",this.state.polygons[0].coordinates);
    this.state.polygons.map((polygon, index) => {
      let bdy = null;
      const coordinates = [];
      bdy = { ...polygon };
      bdy.name = polygon.name;
      polygon.coordinates.map(points => {
        coordinates.push([points.longitude, points.latitude]);
      })
      coordinates.push(coordinates[0]);
      bdy.coordinates = coordinates;
      polyg.push(bdy);
    })

    // bdy.rawDataPolygon = this.state.polygons;
    // console.log("JSON.stringify(polyg)",JSON.stringify(polyg));


    fetch('http://192.168.7.39:4242/areas/addAreaBoundaries', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(polyg),
    }).then(async res => {
      console.log(res);
      if(res.status === 201){
        this.setState({showAndProceedBtnVisibility : false})
        await this.getPolygons();
        this.props.navigation.navigate("User",{context : this.context})

      }
    });
  }

  createHole() {
    const { editing, creatingHole } = this.state
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [...editing.holes, []]
        }
      })
    } else {
      const holes = [...editing.holes]
      if (holes[holes.length - 1].length === 0) {
        holes.pop()
        this.setState({
          editing: {
            ...editing,
            holes
          }
        })
      }
      this.setState({ creatingHole: false })
    }
  }

  

  onSubmitPolygonName = () => {
    this.setState({modalVisiblility : false},() => {
      const { polygons, editing } = this.state;
      this.setState({
        polygons: [...polygons, editing],
        editing: null,
        creatingHole: false,
      }, () => {
       
        let pol = [...this.state.polygons];
        pol[pol.length - 1].name = this.state.polygonName;  
        this.setState({polygons : pol})
      });
    })
   
  }

  onSubmitPinpointName = () => {
    this.setState({pinModalVisibility : false},() => {
      const placeObj = {
        location: {
            name: this.state.pinpointName,
            location: {
                type: "Point",
                coordinates: this.state.pinpointCoordinate
            }
        }
    }
      fetch('http://192.168.7.39:4242/maps/addPlaces', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placeObj),
    }).then(res => {
      if(res.status === 201){
       //call get pinpoints api
       console.log("success");
       this.setState({createPinModeActive : true})
       this.getPinPoints();
      }
    })
    })
  }

  onPress(e) {
    console.log(this.state.polygons, e)
    const { editing, creatingHole } = this.state
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: []
        }
      })
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
        }
      })
    } else {
      const holes = [...editing.holes]
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate
      ]
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes
        }
      })
    }
  }

  renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisiblility || this.state.pinModalVisibility}
        onRequestClose={() => {
          // setVisiblility(false);
          // this.setState({modalVisiblility : false})
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            // this.setState({modalVisiblility : false})
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 3,
              }}>
              <View
                style={{
                  height: 35,
                  justifyContent: 'center',
                  backgroundColor: 'green',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 17,
                  }}>
                 {this.state.pinModalVisibility ? 'Enter Pinpoint Name' : 'Enter Polygon Name'}
                </Text>
              </View>
              <Text
                style={{
                  color: 'black',
                  paddingHorizontal: 10,
                  marginTop: 12,
                  fontSize: 16,
                }}>
                Please enter name below
              </Text>
              <TextInput
                style={{
                  fontSize: 12,
                  color: '#181b1e',
                  flex: 1,
                  width: Dimensions.get('window').width - 68,
                  borderWidth: 1,
                  borderRadius: 3,
                  borderColor: 'lightgrey',
                  paddingHorizontal: 10,
                  flex: null,
                  margin: 10,
                  fontSize: 14,
                  alignSelf: 'center',
                  height: 40,

                }}
                placeholderTextColor={'grey'}
                onChangeText={(text) => {this.state.pinModalVisibility ?  this.setState({pinpointName : text}) : this.setState({polygonName : text})}}
                value={this.state.pinModalVisibility ? this.state.pinpointName : this.state.polygonName}
                placeholder={this.state.pinModalVisibility ? "eg.Diggin Point1" : "eg.CoalMine Zone"}
                keyboardType="default"
              />
              <Button style={{ alignItems: 'center',
                  padding: 10,
                  // marginTop : 100,
                  // backgroundColor: 'green',
                  width: '100%',
                  borderRadius: 3,
                  marginVertical: 10,
                  height: 34,
                  justifyContent: 'center',
                  padding: 0,
                  width: Dimensions.get('window').width - 68,
                  alignSelf: 'center'}} title={this.state.pinModalVisibility ? "Save Pinpoint" : 'Save Polygon'} color={"green"}
                  onPress={() => {this.state.pinModalVisibility ? this.onSubmitPinpointName() : this.onSubmitPolygonName()}}
                  />
              
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  render() {
    const mapOptions = {
      scrollEnabled: true
    }
    

    if (this.state.editing) {
      mapOptions.scrollEnabled = false
      mapOptions.onPanDrag = e => this.onPress(e)
    }

    return (
      <View style={styles.container}>
        {this.renderModal()}
        <MapView
          onMapReady={() => this.requestLocationPermission()}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onUserLocationChange={(e) => {
            console.log("onUserLocationChange",e.nativeEvent.coordinate);
            // console.log(updateLocation);
            // updateLocation({latitude : e.nativeEvent.coordinate.latitude , longitude : e.nativeEvent.coordinate.longitude })
            this.context.updateLocation({latitude : e.nativeEvent.coordinate.latitude , longitude : e.nativeEvent.coordinate.longitude })
        }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType={MAP_TYPES.SATELLITE}
          initialRegion={this.state.region}
          onPress={e => this.onPress(e)}
          onRegionChangeComplete={(e) => {this.setState({region : e})}}
          userLocationUpdateInterval={10000}
          {...mapOptions}
        >
          {this.state.createPinModeActive && (
        <Marker
          coordinate={this.state.region}
          title={"Pin For GeoFence"}
          description={"Place Pin Anywhere"}
          draggable
          tappable={true}
          onDragEnd={(e) => {console.log("onDragEnd",this.setState({pinpointCoordinate : [e.nativeEvent.coordinate.longitude , e.nativeEvent.coordinate.latitude]}) );this.setState({pinModalVisibility : true})}}
        />
        )}

        {this.state.pinpointPlaces.map((places,index) => (
          <Marker
          key={index}
          coordinate={places.coordinate}
          title={places.name}
          // description={"No Desc"}
          draggable={false}
          tappable={false}
        />
        ))}
          
          {this.state.polygons.map(polygon => {
            return (
              <Polygon
                key={polygon.id}
                coordinates={polygon.coordinates}
                holes={polygon.holes}
                strokeColor="#F00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
                tappable
                onPress={(e) => { 
                  // this.deletePolygon(polygon.id)
                  this.showToastWithGravity(polygon.name)
                 }}
              />
            )
          })}
          {this.state.editing && (
            <Polygon
              key={this.state.editing.id}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          )}
        </MapView>

        <View style={styles.buttonContainer}>
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.createHole()}
              style={[styles.bubble, styles.button]}
            >
              <Text>
                {this.state.creatingHole ? 'Finish Hole' : 'Create Hole'}
              </Text>
            </TouchableOpacity>
          )}
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Finish</Text>
            </TouchableOpacity>
          )}

          {this.state.editing && (
            <TouchableOpacity
              onPress={() => {this.setState({createPinModeActive : true})}}
              style={[styles.bubble, styles.button]}
            >
              <Text>Create Pin</Text>
            </TouchableOpacity>
          )}

         
            {this.state.polygons.length > 0 && this.state.showAndProceedBtnVisibility && (<TouchableOpacity
              onPress={() => {this.savePolygonToServer()}}
              style={[styles.bubble, styles.button]}
            >
              <Text>Save & Proceed</Text>
            </TouchableOpacity>)}
          
        </View>
        <TouchableOpacity
          onPress={() => this.clear()}
          style={[styles.bubble, styles.button]}
        >
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

ExampleMaps.propTypes = {
  provider: ProviderPropType
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
})

export default ExampleMaps;