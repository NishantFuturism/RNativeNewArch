/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Image
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import RNBootSplash from "react-native-bootsplash";
import Carousel from 'react-native-reanimated-carousel';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const width = Dimensions.get('window').width;

  const [images, setImages] = useState([]);

  

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    RNBootSplash.hide({ fade: true, duration: 5000 });
    console.log("Bootsplash has been hidden successfully");
  }, []);

  useEffect(() => {
    fetch("http://192.168.43.194:4242/storage/getFiles").then(async res => {
      let response = await res.json();
      return response.files;
    }).then(final => {
      setImages(final.filter(item => item.mimeType !== 'application/pdf'));
    })
  }, [])


  return (


    <View style={{ flex: 1,justifyContent : 'center',alignItems : 'center' }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={images}
        style={{flex : 1,alignItems : 'center',justifyContent : 'center'}}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item,index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}
          >
            <>
            {console.log("ITEMMEM",item)}
            </>
            <Image
              style={{
                width: Dimensions.get('window').width - 20,
                height: Dimensions.get('window').height,
                marginVertical: 30,
                alignSelf: 'center',
                // aspectRatio : 40/100
              }}
              source={{
                uri: `http://192.168.43.194:4242/uploads/${item.name}`,
              }}
            />
          </View>
        )}
      />
    </View>


  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
