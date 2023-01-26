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
import Redux from './src/redux';
import ProductList from './src/screens/ProductList';
import Search from './src/components/Search';
import ScreenWrapper from './src/components/ScreenWrapper';
import FirebasePushNotification from './src/screens/FirebasePushNotification';
import messaging from '@react-native-firebase/messaging';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // getMsgToken();
      RNBootSplash.hide();
      console.log("Bootsplash has been hidden successfully");
  }, []);

  const getMsgToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('token=====>>>>>',token);
  }

  return (
    <Redux>
      <ScreenWrapper disableScrollView={false}>
      {/* <ProductList/> */}
      {/* <Search/> */}
      {/* <Text>sdfsdf</Text> */}
      <>
      <FirebasePushNotification/>
      </>
      </ScreenWrapper>
    </Redux>
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
