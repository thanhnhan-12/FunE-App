import React from 'react'
import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import RoomScreen from '../screens/RoomScreen';
import JoinRoom from '../screens/JoinRoom';
import SocialPostScreen from '../screens/SocialPostScreen';
const RoomNavigation = () => {
    const Stack = createNativeStackNavigator()
    const navigation = useNavigation()
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Group>
                <Stack.Screen
                    name={'JoinRoom'}
                    component={JoinRoom}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name={'RoomScreen'}
                    component={RoomScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name={'SocialPostScreen'}
                    component={SocialPostScreen}
                    options={{ headerShown: false }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default RoomNavigation