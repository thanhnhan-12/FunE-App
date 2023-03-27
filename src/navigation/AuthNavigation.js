import React, { useContext } from "react";
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { AuthContext } from "../context/AuthContext";
import MenuNavigation from "./MenuNavigation";
import SocialPostScreen from "../screens/SocialPostScreen";
import { AuthProvider } from "../context/AuthContext";
import CreateProduct from "../screens/CreateProduct";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    const { userInfo } = useContext(AuthContext);
    console.log("userInfo", userInfo);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    userInfo && userInfo.toString().length > 0
                        ?
                        (
                            // <AuthProvider>
                            //     <MenuNavigation />
                            // </AuthProvider>
                            <>
                                <Stack.Screen
                                    name="Main"
                                    component={MenuNavigation}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="EditProfile"
                                    component={EditProfileScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="SocialPost"
                                    component={SocialPostScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="CreateProduct"
                                    component={CreateProduct}
                                    options={{
                                        headerShown: true, title: 'Upload Product',
                                        headerRight: () => (
                                            <TouchableOpacity
                                                onPress={() => { Alert.alert("This is cart item") }}
                                                style={{ marginRight: 20 }}>
                                                <Ionicons name="ios-cart-outline" size={30} />
                                            </TouchableOpacity>

                                        )
                                    }}

                                />


                            </>

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