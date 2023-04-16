import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Header from '../components/Header';
import { userApi } from '../clients/user_api';

const MyWallet = ({ navigation, route }) => {
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const id_user = userInfo.id;
    const id_payment = parseInt(userInfo.paymentId);
    const [payments, setPayments] = useState([]);
    const [reset, setReset] = useState(false);
    const handleChoosePayment = async (id) => {
        await userApi.updatePayment({ id_user, payment: id });
        setReset(!reset);
    }
    useEffect(() => {
        if (route.params?.key === 'reset') {
            async function fetchData() {
                const userById = await userApi.getUserByID(id_user);
                setUserInfo(userById.users)
                const payment = await userApi.getsPayment({ id_user });
                setPayments(payment.data);
            }
            fetchData();
        }
        else {
            async function fetchData() {
                const userById = await userApi.getUserByID(id_user);
                setUserInfo(userById.users)
                const payment = await userApi.getsPayment({ id_user });
                setPayments(payment.data);
            }
            fetchData();
        }
    }, [route.params?.key, reset])
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <Header
                trueHear
                trueCart
                trueCoin
                title={"My address"}
                trueReturn
                navigation={navigation}
            />
            <ScrollView >

                <SafeAreaView
                    style={{
                        backgroundColor: '#fff',
                        padding: 20
                    }}>
                    {payments && payments.length > 0 &&
                        payments.map((item, index) => (
                            <View style={{ marginTop: 15 }} key={index}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{
                                        width: "80%"
                                    }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <View>
                                                <Text style={{ color: "black", fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Credit Card Number</Text>
                                            </View>
                                            <View>
                                                {
                                                    item.id === id_payment ?
                                                        <TouchableOpacity style={{ flexDirection: "row" }}
                                                            onPress={() => handleChoosePayment(item.id)}
                                                        >
                                                            <Text style={{ marginRight: 5 }}>Default</Text>
                                                            <MaterialCommunityIcons
                                                                name="radiobox-marked"
                                                                size={20}
                                                                color="red"
                                                            />
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity style={{ flexDirection: "row" }}
                                                            onPress={() => handleChoosePayment(item.id)}
                                                        >
                                                            <Text style={{ marginRight: 5 }}>Default</Text>
                                                            <MaterialCommunityIcons
                                                                name="radiobox-blank"
                                                                size={20}
                                                                color="red"
                                                            />
                                                        </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            borderWidth: 1,
                                            borderColor: "#ccc",
                                            padding: 10,
                                            borderRadius: 5,
                                            justifyContent: "space-between"
                                        }}>
                                            <Text style={{ color: "black" }}>***************{item.cartNumber.slice(-4)}</Text>
                                            <Fontisto
                                                name="mastercard"
                                                size={22}
                                                color="#180C40"
                                            />
                                        </View>
                                    </View>
                                    <View style={{
                                        width: "20%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <MaterialCommunityIcons
                                            name="delete-circle"
                                            size={40}
                                            color="red"
                                        />
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </SafeAreaView>
            </ScrollView >
            <View style={{
                flexDirection: 'row',
                textAlign: 'center',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                left: 0,
                marginBottom: 30,
                padding: 40,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CreatePayment")}
                    style={{
                        backgroundColor: '#D62965',
                        alignItems: 'center',
                        flexDirection: 'row',
                        color: '#fff',
                        padding: 10,
                        borderRadius: 10,
                    }} >
                    <Text style={{ color: 'white', fontWeight: 700, width: '100%', textAlign: 'center' }}>Add Another Method</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 18,
        marginBottom: 8,
    },
});

export default MyWallet;