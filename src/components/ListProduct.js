import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ListProduct({ photo, title, onPress, price }) {
    let num = parseInt(price);
    return (

        <TouchableOpacity
            style={{ alignItems: 'center', marginBottom: 10, marginLeft: 5 }}>
            <View>
                <Image
                    source={{ uri: photo }}
                    style={{ width: 90, height: 130, borderRadius: 10, borderColor: 'black', borderWidth: 1 }}
                />
                <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
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
                        $ {num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
