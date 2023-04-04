import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ListProduct({ photo, title, onPress, price }) {
    return (

        <TouchableOpacity
            onPress={() => { onPress() }}
            style={{ alignItems: 'center', marginBottom: 20, marginLeft: 5 }}>
            <View>
                <Image
                    source={{ uri: photo }}
                    style={{ width: 90, height: 130, borderRadius: 10, borderColor: 'black', borderWidth: 1 }}
                />
                <View style={{ alignItems: 'flex-start', marginBottom: 20 }}>
                    <Text
                        style={{
                            color: 'black',
                            fontFamily: 'Roboto-Medium',
                            fontSize: 12,
                        }}>
                        {title}
                    </Text>
                    <Text
                        style={{
                            color: 'orange',
                            fontFamily: 'Roboto-Medium',
                            fontSize: 12,
                        }}>
                        $ {price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
