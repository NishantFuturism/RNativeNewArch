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
  Button,
  Platform
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import RNBootSplash from "react-native-bootsplash";
import Checkout from './src/Checkout';
import StripePayment from './src/StripePayment';
import CheckoutIOS from './src/CheckoutIOS';
import AddressCollectorSheet from './src/AddressCollectorSheet';
import GooglePayScreen from './src/GooglePaySheetStripe';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
      RNBootSplash.hide({ fade: true, duration: 5000 });
      console.log("Bootsplash has been hidden successfully");
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
    
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
       <Text style={{backgroundColor : 'red',marginBottom : 100}}>Hi There</Text>
       {/* <StripePayment> */}

       {Platform.OS === 'android' ? <Checkout/> : <CheckoutIOS/> }
       {/* <GooglePayScreen/> */}
       {/* </StripePayment> */}
      </ScrollView>
    </SafeAreaView>
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
