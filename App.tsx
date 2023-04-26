/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
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
import UploadMultipleFile from './src/UploadMultipleFile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DocumentsList from './src/DocumentsList';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();


  useEffect(() => {
      RNBootSplash.hide({ fade: true, duration: 5000 });
      console.log("Bootsplash has been hidden successfully");
  }, []);

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='UploadMultipleFile'>
      <Stack.Screen
        name="UploadMultipleFile"
        component={UploadMultipleFile}
        options={{title: 'Welcome'}}
      />
      <Stack.Screen name="Documents" component={DocumentsList} />
    </Stack.Navigator>
  </NavigationContainer>
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
