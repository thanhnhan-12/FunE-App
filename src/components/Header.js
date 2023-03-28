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
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={30}
                        color="red"
                        style={{ marginLeft: 15 }}
                    />
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
                    <TouchableOpacity>
                        <MaterialCommunityIcons
                            name="bitcoin"
                            size={28}
                            color="orange"
                            style={{ marginLeft: 15 }}
                        />
                    </TouchableOpacity>
                }
                {trueCart &&
                    <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
                        <Ionicons
                            name="cart-outline"
                            size={28}
                            color="black"
                            style={{ marginLeft: 15 }}
                        />
                    </TouchableOpacity>
                }
                {trueBell &&
                    <TouchableOpacity>
                        <MaterialCommunityIcons
                            name="bell-outline"
                            size={28}
                            color="black"
                            style={{ marginLeft: 15 }}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}
