import React,{useState,useEffect, Children} from 'react';
import {View,Text,TouchableOpacity,SafeAreaView,ScrollView,StatusBar,StyleSheet,Button } from 'react-native'
import Colors from '../constants/Colors';

const ScreenWrapper = ({children,disableScrollView}) => {
    const STYLES = ['default', 'dark-content', 'light-content'];
// const TRANSITIONS = ['fade', 'slide', 'none'];



return (
  <SafeAreaView style={styles.container}>
    <StatusBar
      backgroundColor="#ccc"
      barStyle={STYLES[0]}
    />
    {/* {disableScrollView && children} */}
    {disableScrollView && (<View style={{backgroundColor : 'white'}}>
       {children}
    </View>)}
    {!disableScrollView && (<ScrollView style={{backgroundColor : 'white'}}>
       {children}
    </ScrollView>)}
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor : "red"
    }
  });

export default ScreenWrapper;