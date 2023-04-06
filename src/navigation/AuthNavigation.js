import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { AuthContext } from "../context/AuthContext";
import MenuNavigation from "./MenuNavigation";
import CartNavigation from "./CartNavigation";
import SocialPostScreen from "../screens/SocialPostScreen";
import CreateProduct from "../screens/CreateProduct";
import SellingGlobal from "../screens/SellingGlobal";
import RoomScreen from "../screens/RoomScreen";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    const { userInfo } = useContext(AuthContext);
<<<<<<< HEAD
=======
    console.log("userInfo", userInfo);
>>>>>>> 9f448fe1eb60af58d60b8645241d524e555c04d9
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
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="CartNavigation"
                                    component={CartNavigation}
                                    options={{ headerShown: false }}

                                />
                                <Stack.Screen
                                    name="SellingGlobal"
                                    component={SellingGlobal}
                                    options={{ headerShown: false }}
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