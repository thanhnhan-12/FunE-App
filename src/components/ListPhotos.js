import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { windowWidth } from '../utils/Dimensions';

export default function ListPhoto({ photo, title, onPress }) {
    return (

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Image
                source={photo}
                style={{ width: 90, height: 90, borderRadius: 10, marginRight: 8 }}
            />
            <View>
                <Text
                    numberOfLines={1}
                    style={{
                        color: '#333',
                        fontFamily: 'Roboto-Medium',
                        fontSize: 12,
                    }}>
                    {title}
                </Text>
            </View>
        </View>
    );
}
