import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert
} from 'react-native';
import CartPayment from '../components/CartPayment';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { MEDIA_URL } from '../config';
import { userApi } from '../clients/user_api';
import { cartApi } from '../clients/cart_api';

const PaymentProduct = ({ navigation }) => {
    const route = useRoute();
    const total = route.params.total;
    const data = route.params.data;
    const quantity = route.params.quantity;
    const { userInfo } = useContext(AuthContext);
    const id_user = userInfo.id;
    const [address, setAddress] = useState([]);
    const [payment, setPayment] = useState([]);
    const id_address = parseInt(userInfo.address);
    const id_payment = parseInt(userInfo.paymentId);
    const [reset, setReset] = useState(false);
    const [cart, setCart] = useState([]);
    const getIPFSLink = (hash) => {
        return MEDIA_URL + hash;
    };

    useEffect(() => {
        async function fetchData() {
            setCart(data);
            const location = await userApi.getsAddressByUser({ id_address });
            setAddress(location.data);
            setReset(true);
            console.log(cart);
            console.log(payment)
        }
        fetchData();
    }, [reset])

    const handleSelectPayment = async () => {
        const paymentId = await userApi.getPaymentByUser({ id_payment });
        setPayment(paymentId.data);
        console.log(payment)
    }

    const handleOrder = async () => {
        if (cart.length > 0) {
            for (const item of cart) {
                await userApi.createOrder({
                    id_user,
                    idProduct: `${item.cartData.id}`,
                    quantity: item.quantity,
                    total,
                    address: address.address + " - " + address.district + " - " + address.province + " - " + address.country,
                    payment: `${payment.cartNumber}`,
                });
                await cartApi.deletes({
                    idUser: id_user
                });
                setReset(true);
                Alert.alert("Payment Succeed!");
                navigation.navigate("Home");
            }

        } else {
            await userApi.createOrder({
                id_user,
                idProduct: `${cart.id}`,
                quantity: quantity,
                total,
                address: address.address + " - " + address.district + " - " + address.province + " - " + address.country,
                payment: `${payment.cartNumber}`,
            });
            await cartApi.deletes({
                idUser: id_user
            });
            setReset(true);
            Alert.alert("Payment Succeed!");
            navigation.navigate("Home");
        }
    }
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
                    {cart && cart.length > 0 ?
                        cart.map((item, index) => (
                            <View key={index}>
                                <CartPayment
                                    name={item.cartData.name}
                                    description={item.cartData.description}
                                    price={item.cartData.pricing}
                                    quantity={item.quantity}
                                    uri={getIPFSLink(item.cartData.media)}
                                />

                            </View>
                        ))
                        :
                        <View>
                            <CartPayment
                                name={cart.name}
                                description={cart.description}
                                price={cart.pricing}
                                quantity={quantity}
                                uri={getIPFSLink(cart.media)}
                            />

                        </View>
                    }

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
                        <Text style={{ color: 'red', fontSize: 18 }}>$ {total}.00</Text>
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
                    <TouchableOpacity style={{ flexDirection: 'row' }}
                        onPress={() => navigation.navigate("AddAddress")}
                    >
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

                {address &&
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10
                        }}>
                        <View>
                            <Text style={{ fontSize: 16, color: '#181A1A', fontWeight: 600 }}>
                                {userInfo.lastName} {userInfo.firstName}
                            </Text>
                            <Text style={{ fontSize: 16, color: '#181A1A' }}>
                                {address.address}
                            </Text>
                            <Text style={{ fontSize: 16, color: '#181A1A' }}>
                                {address.province}
                            </Text>
                            <Text style={{ fontSize: 16, color: '#181A1A' }}>
                                {address.country}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { navigation.navigate("MyAddress") }}>
                            <MaterialIcons
                                name="chevron-right"
                                size={24}
                                color="gray"
                                style={{ marginLeft: 5 }}
                            />
                        </TouchableOpacity>
                    </View>
                }

                <View style={{ height: 1, width: '100%', backgroundColor: '#ccc' }}></View>
                <View
                    style={{
                        marginBottom: 10,
                        marginTop: 10
                    }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'red' }}>
                        PAYMENT METHOD
                    </Text>
                    {payment && payment.id ?
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
                                <Fontisto
                                    name="mastercard"
                                    size={24}
                                    color="#141466"
                                    style={{ marginLeft: 5, marginRight: 10 }}
                                />
                                <Text style={{ fontWeight: 700, fontSize: 16, color: '#181A1A', fontWeight: 600 }}>
                                    MASTERCARD ending **{payment.cartNumber.slice(-4)}
                                </Text>
                                <MaterialCommunityIcons
                                    name="check-bold"
                                    size={24}
                                    color="green"
                                    style={{ marginLeft: 5, marginRight: 10 }}
                                />
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row' }} >

                                <MaterialIcons
                                    name="chevron-right"
                                    size={24}
                                    color="gray"
                                    style={{ marginLeft: 5 }}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => handleSelectPayment()}
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
                                Select card payment
                            </Text>
                        </TouchableOpacity>
                    }

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
                        <TouchableOpacity style={{ flexDirection: 'row' }} >

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
                {address.id && payment.id ?
                    <TouchableOpacity style={styles.btnCheck}
                        onPress={() => handleOrder()}
                    >
                        <Text style={{ color: 'white', fontWeight: 700, width: '100%', textAlign: 'center' }}>PAYMENT</Text>
                    </TouchableOpacity>
                    :
                    <View style={{
                        backgroundColor: '#ccc',
                        alignItems: 'center',
                        flexDirection: 'row',
                        color: '#fff',
                        borderRadius: 10,
                        width: '70%'
                    }}
                    >
                        <Text style={{ color: 'white', fontWeight: 700, width: '100%', textAlign: 'center' }}>PAYMENT</Text>
                    </View>
                }
                <View style={{ width: '30%', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 700 }}>TOTAL</Text>
                    <Text style={{ color: 'black', fontWeight: 700 }}>$ {total}.00</Text>
                </View>
            </View>
        </SafeAreaView >
    )
}

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