import React from 'react'
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import SearchScreen from '../screens/SearchScreen'
import ProductDetail from '../screens/ProductDetail'
const SearchNavigation = () => {
  const Stack = createNativeStackNavigator()
  const navigation = useNavigation()
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Group>
        <Stack.Screen
          name={'SearchScreen'}
          component={SearchScreen}
          options={{
            title: 'Search',
            // headerTitleStyle: {
            //   ...Fonts.titleRegular,
            // },
          }} />
        <Stack.Screen
          name={'ProductDetail'}
          component={ProductDetail}
          options={{
            title: 'Product',
            // headerTitleStyle: {
            //   ...Fonts.titleRegular,
            // },
          }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default SearchNavigation