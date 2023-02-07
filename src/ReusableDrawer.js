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

    function Feed({ navigation }) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
            <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
            <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
          </View>
        );
      }

    return (
        <>
            <NavigationContainer>
                <Drawer.Navigator
                    // drawerContent={DrawerNavigator}
                    // overlayColor="rgba(0,0,0,0.8)"
                    // drawerContentOptions={{
                    //   activeTintColor: 'yellow',
                    // }}
                    initialRouteName="Home"
                    drawerStyle={{
                      width: '70%'
                    }}
                    screenOptions={{
                        drawerStyle: {
                            width: '70%',
                        },

                        drawerStatusBarAnimation: {
                            hideStatusBar: 'fade',
                        },
                    }}
                    drawerContent={props => <DrawerNavigator {...props} />} 
                    >
                   
                   <Drawer.Screen name="Home" component={HomeScreen} />
                   <Drawer.Screen name="Feed" component={Feed} />
                </Drawer.Navigator>
            </NavigationContainer>
        </>
    )
}

export default ReusableDrawer;