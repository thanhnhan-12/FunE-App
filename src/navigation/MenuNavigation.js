import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import JoinRoom from '../screens/JoinRoom';
import QRScanScreen from '../screens/QRScanScreen';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import SearchNavigation from './SearchNavigation';
import HomeNavigation from './HomeNavigation';
import RoomNavigation from './RoomNavigation';


const Tab = createMaterialBottomTabNavigator();

const MenuNavigation = () => {
    return (
        // <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#e91e63"
            barStyle={{ backgroundColor: '#fff' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigation}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchNavigation}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="search"
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Room"
                component={RoomNavigation}
                options={{
                    tabBarLabel: 'Room',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="google-classroom" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="QRScan"
                component={QRScanScreen}
                options={{
                    tabBarLabel: 'Scan',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="data-matrix-scan" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
        // </NavigationContainer>
    );
};

export default MenuNavigation;