import React from 'react'
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import SearchScreen from '../screens/SearchScreen';
import ProductDetail from '../screens/ProductDetail';
import DetailSearch from '../screens/DetailSearch';
import PaymentProduct from '../screens/PaymentProduct';
const SearchNavigation = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Group>
        <Stack.Screen
          name={'SearchScreen'}
          component={SearchScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name={'ProductDetail'}
          component={ProductDetail}
          options={{ headerShown: false }} />
        <Stack.Screen
          name={'DetailSearch'}
          component={DetailSearch}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="PaymentProduct"
          component={PaymentProduct}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default SearchNavigation