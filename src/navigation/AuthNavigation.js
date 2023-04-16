import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { AuthContext } from "../context/AuthContext";
import MenuNavigation from "./MenuNavigation";
import CartNavigation from "./CartNavigation";
import CreateProduct from "../screens/CreateProduct";
import SellingGlobal from "../screens/SellingGlobal";
import MyAddress from "../screens/MyAddress";
import AddAddress from "../screens/AddAddress";
import MyWallet from "../screens/MyWallet";
import CreatePayment from "../screens/CreatePayment";
import Order from "../screens/Order";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    const { userInfo } = useContext(AuthContext);

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
                                <Stack.Screen
                                    name="MyAddress"
                                    component={MyAddress}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="MyWallet"
                                    component={MyWallet}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="AddAddress"
                                    component={AddAddress}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="CreatePayment"
                                    component={CreatePayment}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="Order"
                                    component={Order}
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