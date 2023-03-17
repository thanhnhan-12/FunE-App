import React, { useContext } from "react";
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { AuthContext } from "../context/AuthContext";
import MenuNavigation from "./MenuNavigation";
import { AuthProvider } from "../context/AuthContext";


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    const { userInfo } = useContext(AuthContext);
    console.log(userInfo)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    userInfo.errCode === 0
                        ?
                        (
                            // <AuthProvider>
                            //     <MenuNavigation />
                            // </AuthProvider>
                            <Stack.Screen
                                name="Main"
                                component={MenuNavigation}
                                options={{ headerShown: false }}
                            />
                        )
                        :
                        (
                            <>
                                {/* <AuthProvider>
                                    <MenuNavigation />
                                </AuthProvider> */}
                                <Stack.Screen
                                    name="Login"
                                    component={LoginScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="Register"
                                    component={RegisterScreen}
                                    options={{ headerShown: false }}
                                />
                            </>
                        )
                }

            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default AuthNavigation;