/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
// import type {PropsWithChildren} from 'react';
import {
  Button,
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
import ReusableDrawer from './src/ReusableDrawer';
import 'react-native-gesture-handler';
import { SuperCategoryData } from './src/DrawerDataConfig';
import { StackScreen } from './src/StackScreens';


function App(): JSX.Element {
    
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
      RNBootSplash.hide({ fade: true, duration: 5000 });
      console.log("Bootsplash has been hidden successfully");
  }, []);

  const configuration = {
    drawerData : SuperCategoryData,
    plusImgUrl : 'https://cdn-icons-png.flaticon.com/512/3524/3524388.png',
    minusImgUrl : 'https://thumbs.dreamstime.com/z/minus-sign-icon-vector-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-133735659.jpg',
    subCatKeyName : 'subCategoryData',
    childCatKeyName : 'childCategoryData',
    StackScreen : StackScreen
  }

  return (
    
       <ReusableDrawer
       config={configuration}
       />

      
      
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
