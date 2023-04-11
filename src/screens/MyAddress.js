import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IP_CONFIG } from '@env';
import { RadioButton } from 'react-native-paper';
import Header from '../components/Header';
import { userApi } from '../clients/user_api';

const MyAddress = ({ navigation, route }) => {
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const id_user = userInfo.id;
    const id_address = parseInt(userInfo.address);
    const [addresses, setAddresses] = useState([]);
    const [reset, setReset] = useState(false);
    const imageIndividual = { uri: `http://${IP_CONFIG}:3000/individuals/${userInfo.image}` };
    const handleChooseAddress = async (id) => {
        await userApi.updateAddress({ id_user, address: id });
        setReset(!reset);
        navigation.navigate('CartNavigation')
    }
    useEffect(() => {
        if (route.params?.key === 'reset') {
            async function fetchData() {
                const userById = await userApi.getUserByID(id_user);
                setUserInfo(userById.users)
                const address = await userApi.getsAddress({ id_user });
                setAddresses(address.data);
            }
            fetchData();
        }
        else {
            async function fetchData() {
                const userById = await userApi.getUserByID(id_user);
                setUserInfo(userById.users)
                const address = await userApi.getsAddress({ id_user });
                setAddresses(address.data);
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
                    <View
                        style={{
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            height: 120,
                            width: "100%",
                        }}>
                        <TouchableOpacity>
                            <ImageBackground
                                source={imageIndividual}
                                style={{ width: 80, height: 80 }}
                                imageStyle={{ borderRadius: 80 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            flexDirection: 'column',
                            borderBottomColor: 'black',
                        }}>
                            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'red' }}>
                                {userInfo.lastName} {userInfo.firstName}
                            </Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'red' }}>
                                {userInfo.email}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: "red", fontWeight: 700, fontSize: 14 }}>SHIPPING ADDRESS</Text>
                    {addresses && addresses.length > 0 &&
                        addresses.map((item, index) => (
                            <View style={{ marginTop: 15 }} key={index}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{
                                        width: "80%"
                                    }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <View>
                                                <Text style={{ color: "black" }}>{userInfo.firstName}</Text>
                                                <Text style={{ color: "black" }}>{item.phone}</Text>
                                            </View>
                                            <View>
                                                {
                                                    item.id === id_address ?
                                                        <TouchableOpacity style={{ flexDirection: "row" }}
                                                            onPress={() => handleChooseAddress(item.id)}
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
                                                            onPress={() => handleChooseAddress(item.id)}
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
                                        }}>
                                            <Text>{item.address} - {item.district} - {item.province} - {item.country}</Text>
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
                    onPress={() => navigation.navigate("AddAddress")}
                    style={{
                        backgroundColor: '#D62965',
                        alignItems: 'center',
                        flexDirection: 'row',
                        color: '#fff',
                        padding: 10,
                        borderRadius: 10,
                    }} >
                    <Text style={{ color: 'white', fontWeight: 700, width: '100%', textAlign: 'center' }}>Add Another Address</Text>
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

export default MyAddress;