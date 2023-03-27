import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IP_CONFIG } from '@env';

const ProfileScreen = ({ navigation }) => {
    const { userInfo, isLoading, logout } = useContext(AuthContext);
    const imageIndividual = { uri: `http://${IP_CONFIG}:3000/individuals/${userInfo.image}` };
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
                    <View
                        style={{
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            height: 120,
                            width: "100%",
                            padding: 20,
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
                            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                {userInfo.email}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <MaterialCommunityIcons name="account" color="black" size={26} style={{ marginRight: 10 }} />
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 18,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto-MediumItalic',
                                }}>
                                Edit Profile
                            </Text>
                        </View>

                        <MaterialIcons name="arrow-forward-ios" size={22} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <MaterialCommunityIcons name="email" color="black" size={26} style={{ marginRight: 10 }} />
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 18,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto-MediumItalic',
                                }}>
                                Email Address
                            </Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={22} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Ionicons
                                name="phone-portrait"
                                size={26}
                                color="black"
                                style={{ marginRight: 10 }}
                            />
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 18,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto-MediumItalic',
                                }}>
                                Phone Number
                            </Text>
                        </View>

                        <MaterialIcons name="arrow-forward-ios" size={22} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Ionicons
                                name="location"
                                size={26}
                                color="black"
                                style={{ marginRight: 10 }}
                            />
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 18,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto-MediumItalic',
                                }}>
                                Residential addresses
                            </Text>
                        </View>

                        <MaterialIcons name="arrow-forward-ios" size={22} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}

                        onPress={() => { logout() }}
                    >
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <MaterialCommunityIcons name="logout" color="black" size={26} style={{ marginRight: 10 }} />
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 18,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto-MediumItalic',
                                }}>
                                Sign out
                            </Text>
                        </View>

                        <MaterialIcons name="arrow-forward-ios" size={22} color="black" />
                    </TouchableOpacity>

                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>

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

export default ProfileScreen;