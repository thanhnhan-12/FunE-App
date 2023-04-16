import React, { useContext, useState } from 'react';
import { TextInput, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import { userApi } from '../clients/user_api';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

const CreatePaymnet = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const id_user = userInfo.id;
    const [name, setName] = useState("");
    const [cartNumber, setCartNumber] = useState("");
    const [expires, setExpires] = useState("");
    const [cvv, setCvv] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const handleAddPayment = async () => {
        await userApi.createPayment({ name, cartNumber, expires, cvv, zipCode, billingAddress, state, city, id_user });
        Alert.alert("Add Payment Successful!");
        navigation.navigate("MyWallet", { key: 'reset' });
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month.toString().padStart(2, '0')}/${year}`;
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
                title={"Payment"}
                trueReturn
                navigation={navigation}
            />
            <ScrollView >

                <SafeAreaView
                    style={{
                        backgroundColor: '#fff',
                        padding: 20
                    }}>

                    <View style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 16,
                                fontWeight: 600,
                            }}>
                            Name on Card
                        </Text>
                    </View>
                    <TextInput
                        onChangeText={text => setName(text)}
                        value={name}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            borderColor: '#545E61',
                            borderWidth: 1,
                            textAlign: 'left',
                            justifyContent: 'center',
                            height: 45
                        }}
                    />
                    <View style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 16,
                                fontWeight: 600,
                            }}>
                            Credit Card Number
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        borderColor: '#545E61',
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: "space-between",
                        width: '90%',
                        marginBottom: 5,
                    }}>
                        <TextInput
                            onChangeText={text => setCartNumber(text)}
                            placeholder='XXXX XXXX XXXX XXXX'
                            value={cartNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()}
                            style={{
                                flex: 1,
                                paddingVertical: 0,
                                textAlign: 'left',
                                justifyContent: 'center',
                            }}
                            maxLength={19}
                            keyboardType={"numeric"}
                        />
                        <Fontisto
                            name="mastercard"
                            size={22}
                            color="#180C40"
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '90%',
                        justifyContent: 'space-between'
                    }}>

                        <View style={{
                            width: '40%',
                        }}>
                            <View style={{
                                padding: 10,
                            }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16,
                                        fontWeight: 600,
                                    }}>
                                    Expires On
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                borderColor: '#545E61',
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 5,
                            }}>

                                <TextInput
                                    onChangeText={text => setExpires(text)}
                                    placeholder='MM/YYYY'
                                    value={expires}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 0,
                                        textAlign: 'left',
                                        justifyContent: 'center',
                                    }}
                                    keyboardType={"numeric"}
                                    maxLength={7}
                                />
                            </View>
                        </View>
                        <View style={{
                            width: '40%'
                        }}>
                            <View style={{
                                padding: 10,
                            }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16,
                                        fontWeight: 600,
                                    }}>
                                    CVV
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                borderColor: '#545E61',
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 5,
                            }}>

                                <TextInput
                                    onChangeText={text => setCvv(text)}
                                    value={cvv}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 0,
                                        textAlign: 'left',
                                        justifyContent: 'center',
                                    }}
                                    maxLength={19}
                                    keyboardType={"numeric"}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 16,
                                fontWeight: 600,
                            }}>
                            ZIP Code
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        borderColor: '#545E61',
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: "space-between",
                        width: '35%',
                        marginBottom: 5,
                    }}>
                        <TextInput
                            onChangeText={text => setZipCode(text)}
                            value={zipCode}
                            style={{
                                flex: 1,
                                paddingVertical: 0,
                                textAlign: 'left',
                                justifyContent: 'center',
                            }}
                            keyboardType={"numeric"}
                        />
                    </View>
                    <View style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 16,
                                fontWeight: 600,
                            }}>
                            Billing Address
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        borderColor: '#545E61',
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: "space-between",
                        width: '90%',
                        marginBottom: 5,
                    }}>
                        <TextInput
                            onChangeText={text => setBillingAddress(text)}
                            value={billingAddress}
                            style={{
                                flex: 1,
                                paddingVertical: 0,
                                textAlign: 'left',
                                justifyContent: 'center',
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '90%',
                        justifyContent: 'space-between'
                    }}>

                        <View style={{
                            width: '40%',
                        }}>
                            <View style={{
                                padding: 10,
                            }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16,
                                        fontWeight: 600,
                                    }}>
                                    State
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                borderColor: '#545E61',
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 5,
                            }}>

                                <TextInput
                                    onChangeText={text => setState(text)}
                                    value={state}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 0,
                                        textAlign: 'left',
                                        justifyContent: 'center',
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{
                            width: '40%',
                            marginBottom: 100
                        }}>
                            <View style={{
                                padding: 10,
                            }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16,
                                        fontWeight: 600,
                                    }}>
                                    City
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                borderColor: '#545E61',
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 5,
                            }}>

                                <TextInput
                                    onChangeText={text => setCity(text)}
                                    value={city}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 0,
                                        textAlign: 'left',
                                        justifyContent: 'center',
                                    }}
                                />
                            </View>
                        </View>
                    </View>
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
                    onPress={() => handleAddPayment()}
                    style={{
                        backgroundColor: '#D62965',
                        alignItems: 'center',
                        flexDirection: 'row',
                        color: '#fff',
                        padding: 10,
                        borderRadius: 10,
                    }} >
                    <Text style={{ color: 'white', fontWeight: 700, width: '100%', textAlign: 'center' }}>Add Payment Method</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >

    )
}

export default CreatePaymnet;