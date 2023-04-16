import React, { useState, useEffect, useContext } from 'react';
import {
    Dimensions,
    Image, SafeAreaView,
    ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert
} from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import { cartApi } from '../clients/cart_api';
import { userApi } from '../clients/user_api';
import { MEDIA_URL } from '../config';

const ShoppingCart = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const id_user = userInfo.id;
    const [order, setOrder] = useState([]);
    const [reset, setReset] = useState(false);
    const getIPFSLink = (hash) => {
        return MEDIA_URL + hash;
    };
    const handleDeleteOrder = async (idOrder) => {
        Alert.alert(
            'Agree',
            'Are you sure you want to cancel?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Agree',
                    onPress: () => agreeDeleteOrder(idOrder),
                },
            ],
        );

    }

    const agreeDeleteOrder = async (idOrder) => {
        await userApi.updateOrder({ idOrder });
        Alert.alert("Order has been cancelled");
        setReset(!reset);
    }

    useEffect(() => {
        async function fetchData() {
            const item = await userApi.getsOrder({ id_user });
            setOrder(item.data);
            setReset(true);
        }
        fetchData();
    }, [reset])
    return (

        <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
            <Header
                title={"Order"}
                trueCoin
                trueReturn
                navigation={navigation}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 15, width: '100%' }}>
                <View>
                    {
                        order && order.length > 0 &&
                        order.map((item, index) => (
                            <View key={index}>
                                <View>
                                    <View style={styles.containerItem}>
                                        <View>
                                            <Image
                                                source={{ uri: getIPFSLink(item.orderData.media) }}
                                                style={styles.image}
                                            />
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <View style={{
                                                // width: '70%',
                                            }}>
                                                <Text style={{ color: 'black', fontWeight: 700 }}>{item.orderData.name}</Text>
                                                <Text style={{ color: 'black' }}>{item.orderData.description}</Text>
                                                <Text>{`$ ${item.orderData.pricing}.00`}</Text>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        fontSize: 20
                                                    }}>
                                                        <Text>Quantity:</Text>
                                                        <Text style={styles.quantity}>{item.quantity}</Text>
                                                    </View>
                                                    <Text style={{
                                                        marginLeft: 30,
                                                        color: "red"
                                                    }}>{`$ ${item.orderData.pricing * item.quantity}.00`}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={{
                                                justifyContent: 'center',
                                                alignItems: 'flex-end',
                                                marginLeft: 30
                                            }}
                                                onPress={() => handleDeleteOrder(item.id)}
                                            >
                                                <View>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        color: 'red',
                                                        fontWeight: 700
                                                    }}>Hủy</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '100%', backgroundColor: '#ccc' }}></View>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
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
        marginRight: 10
    },
    quantity: {
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        color: "black"
    },
    priceSum: {
        color: '#F63D69',

    }
})

export default ShoppingCart;