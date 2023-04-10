import React from 'react';

import ProfileScreen from '../screens/ProfileScreen';
import QRScanScreen from '../screens/QRScanScreen';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchNavigation from './SearchNavigation';
import HomeNavigation from './HomeNavigation';
import RoomNavigation from './RoomNavigation';
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MenuNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#e91e63"
            barStyle={{ backgroundColor: '#fff' }}
            screenOptions={{ headerShown: false }}
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
    );
};

export default MenuNavigation;