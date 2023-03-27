import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';

import BannerSlider from '../components/BannerSlider';
import { windowWidth } from '../utils/Dimensions';

import { freeGames, paidGames, sliderData } from '../model/data';
import { useNavigation } from '@react-navigation/native'

const SearchScreen = () => {
    const renderBanner = ({ item, index }) => {
        return <BannerSlider data={item} />;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{ padding: 20 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        borderColor: '#C6C6C6',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        height: 60
                    }}>
                    <Feather
                        name="search"
                        size={20}
                        color="#C6C6C6"
                        style={{ marginRight: 5, marginTop: 10 }}
                    />
                    <TextInput placeholder="Search Posting / Room" />
                </View>

                <View
                    style={{
                        marginVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: '#AD40AF' }}>
                        Outstanding
                    </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ color: '#0aada8' }}>See all</Text>
                    </TouchableOpacity>
                </View>

                <Carousel
                    ref={c => {
                        this._carousel = c;
                    }}
                    data={sliderData}
                    renderItem={renderBanner}
                    sliderWidth={windowWidth - 40}
                    itemWidth={300}
                    loop={true}
                />

                <View
                    style={{
                        marginVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: '#AD40AF' }}>
                        Recently Viewed
                    </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ color: '#0aada8' }}>Clear</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal={true}
                    data={paidGames}
                    renderItem={({ item, index }) => {
                        return <View key={index}>
                            <Image
                                style={{
                                    width: 100,
                                    height: 150,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                    marginRight: 20
                                }}
                                source={require('../assets/images/genshin-impact.jpeg')}
                            />
                            <Text>{item.price}</Text>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 700,
                            }}>{item.subtitle}</Text>
                        </View>
                    }
                    }
                >

                </FlatList>
                <View
                    style={{
                        marginVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: '#AD40AF' }}>
                        Recommemded
                    </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ color: '#0aada8' }}>Refresh</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row', alignItems: 'center', flex: 1, flexWrap: 'wrap', marginBottom: 10
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Medium',
                        color: 'black',
                        borderWidth: 1,
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        marginBottom: 20
                    }}>
                        Denim Jeans
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Medium',
                        color: 'black',
                        borderWidth: 1,
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        marginBottom: 20
                    }}>
                        Mini Skirt
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Medium',
                        color: 'black',
                        borderWidth: 1,
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        marginBottom: 20
                    }}>
                        Jacket
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Medium',
                        color: 'black',
                        borderWidth: 1,
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        marginBottom: 20
                    }}>
                        Accessories
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Medium',
                        color: 'black',
                        borderWidth: 1,
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        marginBottom: 20
                    }}>
                        Eye Shadow
                    </Text>
                </View>
                <View
                    style={{
                        marginVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: '#AD40AF' }}>
                        You may also like
                    </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ color: '#0aada8' }}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <FlatList
                        horizontal={true}
                        data={paidGames}
                        renderItem={({ item, index }) => {
                            return <View key={index}>
                                <Image
                                    style={{
                                        width: 100,
                                        height: 150,
                                        resizeMode: 'cover',
                                        borderRadius: 10,
                                        marginRight: 20
                                    }}
                                    source={require('../assets/images/god-of-war.jpeg')}
                                />
                                <Text>{item.price}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                }}>{item.subtitle}</Text>
                            </View>
                        }
                        }
                    >

                    </FlatList>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchScreen;