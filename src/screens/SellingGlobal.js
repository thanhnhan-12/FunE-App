import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, TextInput, Alert, Image } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from '../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { useForm } from "react-hook-form";
import { userApi } from '../clients/user_api';
import { sellerApi } from '../clients/seller_api';
import Header from '../components/Header';


const SellingGlobal = ({ navigation }) => {
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(false);
    const [address, setAddress] = useState(false);
    const [email, setEmail] = useState(false);
    const [bankName, setBankName] = useState(false);
    const [bankNumber, setBankNumber] = useState(false);
    const [bankCode, setBankCode] = useState(false);
    const [bankLocation, setBankLocation] = useState(false);
    const [bankCurrency, setBankCurrency] = useState(false);
    const [dobLabel, setDobLabel] = useState('Date of Birth');
    const [gender, setGender] = useState('Gender');
    const { handleSubmit } = useForm();
    const id_user = userInfo.id;

    useEffect(() => {
        async function fetchData() {
            setEmail(userInfo.email);
            setDobLabel(userInfo.birthday);
            setGender(userInfo.gender);
        }
        fetchData();
    }, [])

    const onSubmit = async () => {
        const data = { id_user, name, dobLabel, gender, address, email, bankName, bankNumber, bankCode, bankLocation, bankCurrency };
        const result = await sellerApi.createSeller(data);
        const userById = await userApi.getUserByID(id_user);
        setUserInfo(userById.users)
        if (result.message) {
            Alert.alert("Update succeed!");
        }
        else {
            Alert.alert("Update faided!");
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <Header
                title={"Seller Sign Up"}
                trueReturn
                navigation={navigation}
            />
            <ScrollView >
                <SafeAreaView
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                    }}>

                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            marginTop: 10,
                            padding: 20,
                            width: '90%',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderWidth: 1,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <MaterialCommunityIcons
                                name="account-outline"
                                size={26}
                                color="black"
                                style={{ marginRight: 10 }}
                            />
                            <TextInput
                                placeholder="Seller Name*"
                                onChangeText={text => setName(text)}
                                placeholderTextColor="black"
                                style={{ flex: 1, paddingVertical: 0, width: '100%' }}
                            />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingBottom: 8,
                                }}>
                                <Ionicons
                                    name="calendar-outline"
                                    size={26}
                                    color="black"
                                    style={{ marginRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => setOpen(true)}>
                                    <Text style={{ color: '#666', marginLeft: 5, marginTop: 5 }}>
                                        {dobLabel}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                mode={'date'}
                                maximumDate={new Date('2005-01-01')}
                                minimumDate={new Date('1980-01-01')}
                                onConfirm={date => {
                                    setOpen(false);
                                    setDate(date);
                                    setDobLabel(date.toDateString());
                                }}
                                onCancel={() => {
                                    setOpen(false);
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 30
                        }}>
                            <MaterialCommunityIcons
                                name="gender-male-female"
                                size={26}
                                color="black"
                                style={{ marginRight: 0 }}
                            />
                            <View style={{
                                flex: 1,
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <RNPickerSelect
                                    value={gender}
                                    placeholder={{
                                        label: 'Gender *'
                                    }}
                                    placeholderTextColor="black"
                                    onValueChange={(g) => setGender(g)}
                                    items={[
                                        { label: "Male", value: "Male" },
                                        { label: "Female", value: "Female" },
                                    ]}

                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            padding: 20,
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <Ionicons
                                name="location-outline"
                                size={26}
                                color="black"
                                style={{ marginRight: 10 }}
                            />
                            <TextInput
                                placeholder="Address *"
                                onChangeText={text => setAddress(text)}
                                value={address}
                                placeholderTextColor="black"
                                style={{ flex: 1, paddingVertical: 0, width: '100%' }}
                            />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'left',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Email Address*
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={text => setEmail(text)}
                        value={email}
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
                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'left',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Bank Account Holder Name*
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={text => setBankName(text)}
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
                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'left',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Bank Account Number*
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={text => setBankNumber(text)}
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
                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'left',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Bank Identifier Code*
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={text => setBankCode(text)}
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
                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'left',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Bank Location *
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 5,
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 10,
                            height: 45
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <View style={{
                                flex: 1,
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <RNPickerSelect

                                    placeholder={{
                                        label: 'Select a country *'
                                    }}
                                    placeholderTextColor="black"
                                    onValueChange={(l) => setBankLocation(l)}
                                    items={[
                                        { label: "VietNam", value: "VietNam" },
                                        { label: "US", value: "US" },
                                        { label: "UK", value: "UK" },
                                        { label: "Japan", value: "Japan" },
                                        { label: "Korea", value: "Korea" },
                                    ]}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'left',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Bank Currency *
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 5,
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 10,
                            height: 45
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <View style={{
                                flex: 1,
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <RNPickerSelect

                                    placeholder={{
                                        label: 'Select a currency *'
                                    }}
                                    placeholderTextColor="black"
                                    onValueChange={(c) => setBankCurrency(c)}
                                    items={[
                                        { label: "DZD", value: "DZD" },
                                        { label: "EUR", value: "EUR" },
                                        { label: "AOA", value: "AOA" },
                                        { label: "XCD", value: "XCD" },
                                    ]}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={{
                            backgroundColor: '#D62965',
                            padding: 20,
                            borderRadius: 10,
                            marginTop: 30,
                            marginBottom: 30,
                            width: '80%',
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: 16,
                                color: '#fff',
                            }}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SellingGlobal;