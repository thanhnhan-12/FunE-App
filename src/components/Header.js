import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({
    title,
    trueCart,
    trueHear,
    trueCoin,
    trueBell,
    trueReturn,
    navigation
}) {

    return (
        <View
            style={{
                height: 60,
                width: '100%',
                backgroundColor: '#F0F0F0',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                shadowColor: '#171717',
                shadowOffset: { width: -2, peak: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginRight: 20
            }}>
                {trueReturn &&
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={30}
                            color="red"
                            style={{ marginLeft: 15 }}
                        />
                    </TouchableOpacity>
                }
                {title &&
                    <Text style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 22,
                        fontWeight: '600',
                        color: 'black',
                    }}>
                        {title}
                    </Text>
                }
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginRight: 20
            }}>
                {trueHear &&
                    <TouchableOpacity>
                        <MaterialCommunityIcons
                            name="heart-multiple-outline"
                            size={28}
                            color="black"
                            style={{ marginLeft: 15 }}
                        />
                    </TouchableOpacity>
                }
                {trueCoin &&
                    <TouchableOpacity style={{
                        tabBarBadge: 3
                    }}>
                        <MaterialCommunityIcons
                            name="bitcoin"
                            size={28}
                            color="orange"
                            style={{ marginLeft: 15 }}
                        />
                    </TouchableOpacity>
                }
                {trueCart &&
                    <TouchableOpacity onPress={() => navigation.navigate('CartNavigation')}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Ionicons
                            name="cart-outline"
                            size={28}
                            color="black"
                            style={{ marginLeft: 15 }}
                        />
                        <View style={{
                            backgroundColor: '#D62965',
                            paddingLeft: 5,
                            paddingRight: 5,
                            borderRadius: 50,
                            marginLeft: -12,
                            marginTop: -15
                        }}>
                            <Text style={{ color: 'white' }}>2</Text>
                        </View>
                    </TouchableOpacity>
                }
                {trueBell &&
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                        <MaterialCommunityIcons
                            name="bell-outline"
                            size={28}
                            color="black"
                            style={{ marginLeft: 15 }}
                        />
                        <View style={{
                            backgroundColor: '#D62965',
                            paddingLeft: 5,
                            paddingRight: 5,
                            borderRadius: 50,
                            marginLeft: -12,
                            marginTop: -15
                        }}>
                            <Text style={{ color: 'white' }}>3</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}
