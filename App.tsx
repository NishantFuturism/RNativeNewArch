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
  processColor
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import RNBootSplash from "react-native-bootsplash";
import {LineChart} from 'react-native-charts-wrapper';
import { NavigationContainer } from '@react-navigation/native';
import ChartsListScreen from '../futurismts/src/app/ChartsListScreen';
import BarChartScreen from './src/app/BarChartScreen';
import { ChartBarConfig } from './src/app/ChartConfig';


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
    //You can uncomment this to directly use the charts on App.js
    // <AxisLineChartScreen ChartAxisConfig={ChartAxisConfig}/>
    // <BarChartScreen ChartBarConfig={ChartBarConfig}/>

    <NavigationContainer>
    <ChartsListScreen/>
    
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
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});

export default App;
