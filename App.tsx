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
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import RNBootSplash from "react-native-bootsplash";
import AndroidMaps from './src/AndroidMaps';
import ExampleMaps from './src/reusableMapComponents/exampleMaps';
// import PolygonCreator from './src/ReusableMapComponents/PolygonCreator';
import { createStackNavigator } from '@react-navigation/stack';
import ObjectsNearUser from './src/reusableMapComponents/ObjectsNearUser';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from './src/reusableMapComponents/Context';
import UserLocationContext from './src/reusableMapComponents/UserLocationContext';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createStackNavigator();




  useEffect(() => {
    RNBootSplash.hide({ fade: true, duration: 5000 });
    console.log("Bootsplash has been hidden successfully");
  }, []);

  return (
    // <AndroidMaps/>
    // <ExampleMaps/>
    // <PolygonCreator/>
    <UserLocationContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Maps' >
          <Stack.Screen name={"Maps"} component={ExampleMaps} />
          <Stack.Screen name={"User"} component={ObjectsNearUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserLocationContext>
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


