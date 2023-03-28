import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput
} from 'react-native';
import CartPayment from '../components/CartPayment';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const PaymentProduct = ({ navigation }) => {
    const [sum, setSum] = useState(9);

    return (

        <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
            <Header
                title={"Checkout"}
                trueCoin
                trueReturn
                navigation={navigation}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 15, width: '100%' }}>
                <View>
                    <CartPayment name={'Old Book'} description={'Truyện ngắn A.L.Tsekhop'} price={4} quantity={1} />
                    <CartPayment name={'Old Book'} description={'Truyện ngắn A.L.Tsekhop'} price={5} quantity={1} />
                </View>
                <View
                    style={{
                        marginVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'red' }}>
                        Order Total
                    </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ color: 'red', fontSize: 18 }}>$ {sum}.00</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        marginVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'red' }}>
                        SHIPPING ADDRESS
                    </Text>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { }}>
                        <Text style={{ color: 'black', fontSize: 14 }}>
                            Add Address
                        </Text>
                        <MaterialIcons
                            name="add-location-alt"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 5 }}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>
                    <View>
                        <Text style={{ fontSize: 16, color: '#181A1A', fontWeight: 600 }}>
                            Quang Huy
                        </Text>
                        <Text style={{ fontSize: 16, color: '#181A1A' }}>
                            10 7 6
                        </Text>
                        <Text style={{ fontSize: 16, color: '#181A1A' }}>
                            No name
                        </Text>
                        <Text style={{ fontSize: 16, color: '#181A1A' }}>
                            VIETNAM
                        </Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { }}>

                        <MaterialIcons
                            name="chevron-right"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 5 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1, width: '100%', backgroundColor: '#ccc' }}></View>
                <View
                    style={{
                        marginBottom: 10,
                        marginTop: 10
                    }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'red' }}>
                        PAYMENT METHOD
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderColor: 'red',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginTop: 10
                        }}>
                        <Text style={{ fontSize: 14, color: 'red' }}>
                            Selecta card payment
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            paddingTop: 15,
                            paddingBottom: 15,
                            borderColor: '#ccc',
                            marginTop: 10
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons
                                name="barcode"
                                size={24}
                                color="gray"
                                style={{ marginLeft: 5, marginRight: 10 }}
                            />
                            <Text style={{ fontWeight: 700, fontSize: 16, color: '#181A1A', fontWeight: 600 }}>
                                Promo code:
                            </Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { }}>

                            <MaterialIcons
                                name="chevron-right"
                                size={24}
                                color="gray"
                                style={{ marginLeft: 5 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            paddingTop: 15,
                            paddingBottom: 15,
                            borderColor: '#ccc',
                            marginTop: 10,
                            marginBottom: 200
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons
                                name="bitcoin"
                                size={24}
                                color="orange"
                                style={{ marginLeft: 5, marginRight: 10 }}
                            />
                            <Text style={{ fontWeight: 700, fontSize: 16, color: '#181A1A', fontWeight: 600 }}>
                                Coin 3,000
                            </Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { }}>

                            <MaterialIcons
                                name="chevron-right"
                                size={24}
                                color="gray"
                                style={{ marginLeft: 5 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.btnCheck} >
                    <Text style={{ color: 'white', fontWeight: 700, width: '100%', textAlign: 'center' }}>PAYMENT</Text>
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
        marginBottom: 30,
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

export default PaymentProduct;