import React from 'react'
import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import ShoppingCart from "../screens/ShoppingCart";
import PaymentProduct from "../screens/PaymentProduct";
const CartNavigation = () => {
    const Stack = createNativeStackNavigator()
    const navigation = useNavigation()
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Group>
                <Stack.Screen
                    name="ShoppingCart"
                    component={ShoppingCart}
                    options={{ headerShown: false }}

                />
                <Stack.Screen
                    name="PaymentProduct"
                    component={PaymentProduct}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default CartNavigation