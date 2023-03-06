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
  Platform,
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProductsList } from './src/UserFlow/screens/ProductsList';
import { ProductDetails } from './src/UserFlow/screens/ProductDetails.js';
import { Cart } from './src/UserFlow/screens/Cart';
import { CartIcon } from './src/UserFlow/components/CartIcon';
import { CartProvider } from './src/UserFlow/CartContext';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
      RNBootSplash.hide({ fade: true, duration: 5000 });
      console.log("Bootsplash has been hidden successfully");
  }, []);

  const Stack = createNativeStackNavigator();


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



    // <CartProvider>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName='Products'>
    //       <Stack.Screen name='Products' component={ProductsList} 
    //       options={({ navigation }) => ({
    //         title: 'Products',
    //         headerTitleStyle: styles.headerTitle,
    //         headerRight: () => <CartIcon navigation={navigation}/>
    //       })}/>
    //       <Stack.Screen name='Cart' component={Cart} 
    //       options={({ navigation }) => ({
    //         title: 'My Cart',
    //         headerTitleStyle: styles.headerTitle,
            
    //       })} />
    //       <Stack.Screen name='ProductDetails' component={ProductDetails}
    //       options={({ navigation }) => ({
    //         title: 'Product details',
    //         headerTitleStyle: styles.headerTitle,
    //         headerRight: () => <CartIcon navigation={navigation}/>,
    //       })} />
    //        <Stack.Screen name='Checkout' component={Platform.OS === 'android' ? Checkout : CheckoutIOS} 
    //       options={({ navigation }) => ({
    //         title: 'Checkout',
    //         headerTitleStyle: styles.headerTitle,
    //         // headerRight: () => null,
    //       })} />
          
         
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </CartProvider>
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
  headerTitle: {
    fontSize: 20
  }
});

export default App;
