import React, { useState } from 'react';
import {
    Dimensions,
    Image, SafeAreaView,
    ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import CartItem from '../components/CartItem';
import Header from '../components/Header';


const ShoppingCart = ({ navigation }) => {
    const [sum, setSum] = useState(9);

    return (

        <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
            <Header
                title={"Shopping Cart"}
                trueCoin
                trueReturn
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 15, width: '100%' }}>
                <View>
                    <CartItem name={'Old Book'} description={'Truyện ngắn A.L.Tsekhop'} price={4} />
                    <CartItem name={'Old Book'} description={'Truyện ngắn A.L.Tsekhop'} price={5} />

                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.btnCheck} onPress={() => navigation.navigate('PaymentProduct')}>
                    <Text style={{ color: 'white', fontWeight: 700, width: '100%', textAlign: 'center' }}>PROCEED TO CHECKOUT</Text>
                </TouchableOpacity>
                <View style={{ width: '30%', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 700 }}>TOTAL</Text>
                    <Text style={{ color: 'black', fontWeight: 700 }}>$ {sum}.00</Text>
                </View>
            </View>
        </SafeAreaView >
    )
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 20,
        marginLeft: 6,
    },
    coins: {
        width: 20,
        height: 20,
    },
    bottom: {
        flexDirection: 'row',
        textAlign: 'center',
        padding: 15,
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginBottom: 50,
    },
    btnCheck: {
        backgroundColor: '#D62965',
        alignItems: 'center',
        flexDirection: 'row',
        color: '#fff',
        borderRadius: 10,
        width: '70%'
    }
})

export default ShoppingCart;