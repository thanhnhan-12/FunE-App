import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CartItem({ name, description, price, onPress, uri }) {
    const [quantity, setQuantity] = useState(1);
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    }

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
                    <Text>{`$ ${price}.00`}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '64%'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            fontSize: 20
                        }}>
                            <TouchableOpacity onPress={() => handleDecreaseQuantity()}>
                                <Ionicons
                                    style={{ fontSize: 22 }}
                                    name='remove-circle-outline'
                                    color='red'
                                />
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity onPress={() => handleIncreaseQuantity()}>
                                <Ionicons
                                    style={{ fontSize: 22 }}
                                    name='add-circle'
                                    color='red'
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.priceSum}>{`$ ${price * quantity}.00`}</Text>
                    </View>
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

export default CartItem;