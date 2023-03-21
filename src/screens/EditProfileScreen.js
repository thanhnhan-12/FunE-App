import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, TextInput, Picker } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EditProfileScreen = () => {
    const { userInfo, isLoading, logout } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dobLabel, setDobLabel] = useState('Date of Birth');
    const [gender, setGender] = useState('Gender');
    const [selectedValue, setSelectedValue] = useState("");
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <ScrollView >
                <SafeAreaView
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                    }}>
                    <TouchableOpacity>
                        <ImageBackground
                            source={require('../assets/images/image-user.jpg')}
                            style={{ width: 80, height: 80 }}
                            imageStyle={{ borderRadius: 80 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginBottom: 5,
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Update Cover Media
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            justifyContent: 'space-between',
                            borderStyle: 'dotted',
                            borderColor: 'black',
                            borderWidth: 1,
                        }}
                    >
                        <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}>
                            <Ionicons name="cloud-upload-outline" color="black" size={60} />
                        </TouchableOpacity>
                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    fontFamily: 'Roboto-MediumItalic',
                                }}>
                                Let's upload photos and videos
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#808080',
                                    padding: 20,
                                    borderRadius: 10,
                                    marginBottom: 20,
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        fontSize: 16,
                                        color: '#fff',
                                    }}>
                                    Open Galary
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#808080',
                                    padding: 20,
                                    borderRadius: 10,
                                    marginBottom: 20,
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        fontSize: 16,
                                        color: '#fff',
                                    }}>
                                    Open Camera
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginBottom: 5,
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Add description
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Descripton"
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            padding: 20,
                            paddingTop: 10,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            borderColor: '#545E61',
                            borderWidth: 1,
                            height: 120,
                            verticalAlign: 'top'
                        }}
                    />

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
                                name="email-outline"
                                size={26}
                                color="black"
                                style={{ marginRight: 10 }}
                            />
                            <TextInput
                                placeholder="Email"
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
                                    onValueChange={(g) => setGender(gender)}

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
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            marginBottom: 20,
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
                            <TextInput
                                placeholder="Email"
                                value='Note'
                                style={{ flex: 1, paddingVertical: 0, width: '100%' }}
                            />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#D62965',
                            padding: 20,
                            borderRadius: 10,
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
                            Update
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfileScreen;