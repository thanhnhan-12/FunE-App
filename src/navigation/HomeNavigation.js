import React from 'react'
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import ScrollView from '../screens/Post/ScrollView'
const HomeNavigation = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen
          name={'HomeScreen'}
          component={HomeScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name={'ScrollView'}
          component={ScrollView}
          options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default HomeNavigation