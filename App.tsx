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
  Image,
  Button
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import RNBootSplash from "react-native-bootsplash";
import Carousel from 'react-native-reanimated-carousel';
import { TAnimationStyle } from './src/layouts/BaseLayout';
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { SBItem } from './src/exampleExpo/src/components/SBItem';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const width = Dimensions.get('window').width;

  const [images, setImages] = useState([]);
  const [loop,setLoop] = useState(false);
  interface ItemProps {
    index: number
    animationValue: Animated.SharedValue<number>
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const CustomItem: React.FC<ItemProps> = ({ index, animationValue }) => {
    const maskStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        animationValue.value,
        [-1, 0, 1],
        ["transparent", "transparent", "transparent"],
      );

      return {
        backgroundColor,
      };
    }, [animationValue]);

    return (
      <View style={{ flex: 1 }}>
        <SBItem key={index} index={index} style={{ borderRadius: 0 }} />
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
            maskStyle,
          ]}
        />
      </View>
    );
  };

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet";

      const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
      const translateX = interpolate(
        value,
        [-2, 0, 1],
        [-60, 0, 40],
      );

      return {
        transform: [{ translateX }],
        zIndex,
      };
    },
    [],
  );

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


    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Carousel
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
      /> */}

      <Carousel
        loop={loop}
        autoPlay={true}
        style={{ width: Dimensions.get('window').width - 20, height: Dimensions.get('window').width - 20 }}
        width={Dimensions.get('window').width - 20}
        data={images}
        // renderItem={({ index, animationValue }) => {
        //   return (
        //     <CustomItem
        //       key={index}
        //       index={index}
        //       animationValue={animationValue}
        //     />
        //   );
        // }}
        renderItem={({ item, index, animationValue }) => {

          const maskStyle = useAnimatedStyle(() => {
            const backgroundColor = interpolateColor(
              animationValue.value,
              [-1, 0, 1],
              ["transparent", "transparent", "transparent"],
            );

            return {
              backgroundColor,
            };
          }, [animationValue]);

          return (
            <>
              <View
                key={index}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: 'center',
                }}
              >
                <>
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
              <Animated.View
                pointerEvents="none"
                style={[
                  {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                  maskStyle,
                ]}
              />
            </>
          )
        }
        }
        customAnimation={animationStyle}
        scrollAnimationDuration={500}
      />
      <Button
        onPress={() => {
          setLoop(!loop);
        }}
        title={loop ? 'Turn off autoplay' : 'Turn on autoplay'}
        color={"red"}
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