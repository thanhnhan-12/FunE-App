import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import { userApi } from '../clients/user_api';
import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddAddress = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const id_user = userInfo.id;
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const handleAddAddress = async () => {
        await userApi.createAddress({ address, district, province, country, phone, id_user });
        Alert.alert("Add Address Successful!");
        navigation.navigate("MyAddress", { key: 'reset' });
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <Header
                trueHear
                trueCart
                trueCoin
                title={"Add address"}
                trueReturn
                navigation={navigation}
            />
            <ScrollView >

                <SafeAreaView
                    style={{
                        backgroundColor: '#fff',
                        padding: 20
                    }}>

                    <Text style={{ color: "red", fontWeight: 700, fontSize: 14, marginBottom: 30 }}>PERSONAL ADDRESS</Text>
                    <InputField
                        onChangeText={text => setAddress(text)}
                        value={address}
                        label={'Apartment Number'}
                        icon={
                            <MaterialIcons
                                name="apartment"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />
                        }
                        inputType="text"
                    />
                    <InputField
                        onChangeText={text => setDistrict(text)}
                        value={district}
                        label={'District'}
                        icon={
                            <MaterialIcons
                                name="location-city"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />
                        }
                        inputType="text"
                    />
                    <InputField
                        onChangeText={text => setProvince(text)}
                        value={province}
                        label={'Province'}
                        icon={
                            <MaterialCommunityIcons
                                name="city-variant-outline"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />
                        }
                        inputType="text"
                    />
                    <InputField
                        onChangeText={text => setCountry(text)}
                        value={country}
                        label={'City'}
                        icon={
                            <MaterialCommunityIcons
                                name="home-city"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />
                        }
                        inputType="text"
                    />
                    <InputField
                        onChangeText={text => setPhone(text)}
                        value={phone}
                        label={'Phone number'}
                        icon={
                            <MaterialCommunityIcons
                                name="cellphone-basic"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />
                        }
                        keyboardType={"numeric"}
                        inputType="text"
                    />
                </SafeAreaView>
                <View style={{
                    flexDirection: 'row',
                    textAlign: 'center',
                    marginBottom: 30,
                    padding: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => handleAddAddress()}
                        style={{
                            backgroundColor: '#D62965',
                            alignItems: 'center',
                            flexDirection: 'row',
                            color: '#fff',
                            padding: 10,
                            borderRadius: 10,
                        }} >
                        <Text style={{ color: 'white', fontWeight: 700, width: '100%', textAlign: 'center' }}>Add Address</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >

        </SafeAreaView >

    )
}

export default AddAddress;