import React, {useEffect, useState} from 'react';
import {Platform, Linking} from 'react-native';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {HomeStackScreen, MyAccountStack} from './src/navigation/StackScreens';
import DrawerNavigator from './DrawerNavigator';
import HomeScreen from './HomeScreen';


const Drawer = createDrawerNavigator();
const ReusableDrawer = props => {
    const drawerConfig = {...props};
   

    return (
        <>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        drawerStatusBarAnimation: {
                            hideStatusBar: 'fade',
                        },
                    }}
                    drawerContent={props =>{
                     let conf = Object.assign(props,drawerConfig);
                     return(<DrawerNavigator {...conf} />)}} 
                    >
                   {drawerConfig.config.StackScreen && drawerConfig.config.StackScreen.length > 0 && drawerConfig.config.StackScreen.map((item,index) => <Drawer.Screen key={index} name={item.name} component={item.component} />)}
                   
                </Drawer.Navigator>
            </NavigationContainer>
        </>
    )
}

export default ReusableDrawer;