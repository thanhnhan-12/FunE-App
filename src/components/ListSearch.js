import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ListSearch({ photo, title, onPress, price, dot }) {
    let num = parseInt(price);
    return (

        <TouchableOpacity
            onPress={() => { onPress() }}
            style={{
                alignItems: 'center',
                marginBottom: 15,
                marginLeft: 5,
                paddingTop: 15,
                paddingBottom: 5,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#F0F0F0',
                borderRadius: 10
            }}>
            <View>
                <Image
                    source={{ uri: photo }}
                    style={{ width: 90, height: 130, borderRadius: 10, borderColor: 'black', borderWidth: 1 }}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <Text
                        style={{
                            color: 'black',
                            fontFamily: 'Roboto-Medium',
                            fontSize: 12,
                            width: 90
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
                    {dot &&
                        <Octicons
                            name="dot-fill"
                            size={20}
                            color="green"
                        />
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
}
