import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CartPayment({ name, description, price, onPress, uri, quantity }) {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View>
                    <Image
                        source={{ uri: uri }}
                        style={styles.image}
                    />
                </View>

                <View >
                    <Text style={{ color: 'black', fontWeight: 700 }}>{name}</Text>
                    <Text style={{ color: 'black' }}>{description}</Text>
                    <Text style={{ color: 'black', fontWeight: 700 }}>{`$ ${price}.00`}</Text>
                    <Text style={{ color: 'black' }}>Quantity: {quantity}</Text>
                </View>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: '#ccc' }}></View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    },
    image: {
        width: 68,
        height: 68,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    quantity: {
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10
    },
    priceSum: {
        color: '#F63D69',

    }
})

export default CartPayment;