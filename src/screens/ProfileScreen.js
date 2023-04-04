import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IP_CONFIG } from '@env';
import Header from '../components/Header';

const ProfileScreen = ({ navigation }) => {
    const { userInfo, logout } = useContext(AuthContext);
    const imageIndividual = { uri: `http://${IP_CONFIG}:3000/individuals/${userInfo.image}` };
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <Header
                trueBell
                trueCart
                trueCoin
                title={"Profile"}
                trueReturn
                navigation={navigation}
            />
            <ScrollView >
                {userInfo && userInfo.roleId === "2" ?
                    <SafeAreaView
                        style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                        }}>
                        <View style={{ width: '100%', backgroundColor: '#F0F0F0', padding: 20 }}>
                            <Text style={{ fontSize: 12, color: '#ccc' }}>Account Settings</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderTopColor: '#ccc',
                                borderBottomWidth: 1,
                                borderTopWidth: 1
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
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Profile
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <MaterialCommunityIcons name="storefront-outline" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Store Info
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <MaterialCommunityIcons name="qrcode" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    My QR Code
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <MaterialIcons name="payment" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Payment
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Ionicons name="analytics" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Analytics
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Ionicons name="wallet-outline" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    My Wallet
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <MaterialCommunityIcons name="wallet-outline" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    My Community Wallet
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <View style={{ width: '100%', backgroundColor: '#F0F0F0', padding: 20 }}>
                            <Text style={{ fontSize: 12, color: '#ccc' }}>Security Settings</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                                borderTopColor: '#ccc',
                                borderTopWidth: 1
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <MaterialCommunityIcons name="lock-reset" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Password reset
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <MaterialCommunityIcons name="face-recognition" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Face ID and PIN
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <View style={{ width: '100%', backgroundColor: '#F0F0F0', padding: 20 }}>
                            <Text style={{ fontSize: 12, color: '#ccc' }}>App Settings</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                                borderTopColor: '#ccc',
                                borderTopWidth: 1
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Ionicons name="ios-notifications-outline" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Notifications
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <View style={{ width: '100%', backgroundColor: '#F0F0F0', padding: 20 }}>
                            <Text style={{ fontSize: 12, color: '#ccc' }}>General</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                                borderTopColor: '#ccc',
                                borderTopWidth: 1
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <MaterialIcons name="privacy-tip" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Privacy Notice
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <MaterialCommunityIcons name="ruler" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Community Rules
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <MaterialIcons name="feedback" color="black" size={26} style={{ marginRight: 10 }} />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Help & Feedback
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // backgroundColor: '#AD40AF',
                                padding: 20,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomColor: '#ccc',
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
                                        fontWeight: 600,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Sign out
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>
                    </SafeAreaView>
                    :
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
                                        fontWeight: 600,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Edit Profile
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
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
                                        fontWeight: 600,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Email Address
                                </Text>
                            </View>
                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
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
                                        fontWeight: 600,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Phone Number
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
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
                                        fontWeight: 600,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Residential addresses
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
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
                                        fontWeight: 600,
                                        fontFamily: 'Roboto-MediumItalic',
                                    }}>
                                    Sign out
                                </Text>
                            </View>

                            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
                        </TouchableOpacity>

                    </SafeAreaView>
                }
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