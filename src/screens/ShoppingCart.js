import React, { useState, useEffect, useContext } from 'react';
import {
    Dimensions,
    Image, SafeAreaView,
    ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import { cartApi } from '../clients/cart_api';
import { MEDIA_URL } from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ShoppingCart = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const id_user = userInfo.id;
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [reset, setReset] = useState(false);
    const getIPFSLink = (hash) => {
        return MEDIA_URL + hash;
    };
    const handleDecreaseQuantity = async (idProduct) => {
        await cartApi.decrease({ idProduct });
        setReset(!reset);
    }
    const handleIncreaseQuantity = async (idProduct) => {
        await cartApi.increase({ idProduct });
        setReset(!reset);
    }

    useEffect(() => {
        async function fetchData() {
            const item = await cartApi.gets({ id_user });
            setCart(item.data);
            setReset(true);
        }
        function fetchTotal() {
            if (cart.length > 0) {
                let sum = 0;
                cart.map((item) => {
                    let money = parseInt(item.cartData.pricing) * parseInt(item.quantity);
                    sum = sum + money;
                })
                setTotal(sum);
            }
        }
        fetchTotal();
        fetchData();
    }, [reset])
    return (

        <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
            <Header
                title={"Shopping Cart"}
                trueCoin
                trueReturn
                navigation={navigation}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 15, width: '100%' }}>
                <View>
                    {
                        cart && cart.length > 0 &&
                        cart.map((item, index) => (
                            <View key={index}>
                                <View>
                                    <View style={styles.containerItem}>
                                        <View>
                                            <Image
                                                source={{ uri: getIPFSLink(item.cartData.media) }}
                                                style={styles.image}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{ color: 'black', fontWeight: 700 }}>{item.cartData.name}</Text>
                                            <Text style={{ color: 'black' }}>{item.cartData.description}</Text>
                                            <Text>{`$ ${item.cartData.pricing}.00`}</Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                width: '64%'
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    fontSize: 20
                                                }}>
                                                    <TouchableOpacity onPress={() => handleDecreaseQuantity(item.idProduct)}>
                                                        <Ionicons
                                                            style={{ fontSize: 22 }}
                                                            name='remove-circle-outline'
                                                            color='red'
                                                        />
                                                    </TouchableOpacity>
                                                    <Text style={styles.quantity}>{item.quantity}</Text>
                                                    <TouchableOpacity onPress={() => handleIncreaseQuantity(item.idProduct)}>
                                                        <Ionicons
                                                            style={{ fontSize: 22 }}
                                                            name='add-circle'
                                                            color='red'
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <Text style={styles.priceSum}>{`$ ${item.cartData.pricing * item.quantity}.00`}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '100%', backgroundColor: '#ccc' }}></View>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.btnCheck} onPress={() => navigation.navigate('PaymentProduct', {
                    total: total
                })}>
                    <Text style={{ color: 'white', fontWeight: 700, width: '100%', textAlign: 'center' }}>PROCEED TO CHECKOUT</Text>
                </TouchableOpacity>
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
        marginBottom: 50,
    },
    btnCheck: {
        backgroundColor: '#D62965',
        alignItems: 'center',
        flexDirection: 'row',
        color: '#fff',
        borderRadius: 10,
        width: '70%'
    },
    containerItem: {
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

export default ShoppingCart;