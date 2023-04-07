import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ImageBackground
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BannerSlider from '../components/BannerSlider';
import { windowWidth } from '../utils/Dimensions';
import { freeGames, paidGames, sliderData } from '../model/data';
import Header from '../components/Header';

const SearchScreen = ({ navigation }) => {
    const renderBanner = ({ item, index }) => {
        return <BannerSlider data={item} />;
    };

    const [searchText, setSearchText] = useState('');


    const backgroundIndividual = { uri: `https://luattreem.vn/wp-content/uploads/2022/04/background-black-background-den-cong-nghe-800x450-1.jpg` };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                trueBell
                trueCart
                trueCoin
                title={"Search"}
                trueReturn
                navigation={navigation}
            />
            <ScrollView style={{ padding: 20 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        borderColor: '#C6C6C6',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        height: 60,
                        justifyContent: 'space-between'
                    }}>
                    <TextInput placeholder="Search Posting / Room"
                        onChangeText={text => setSearchText(text)}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('DetailSearch', {
                        searchText: searchText
                    })}>
                        <Ionicons
                            name="search"
                            size={20}
                            color="black"
                            style={{ marginTop: 10 }}
                        />
                    </TouchableOpacity>
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
                <View style={{
                    flex: 1,
                    width: '100%',
                    height: 130,
                    opacity: 1,
                    marginBottom: 30
                }}>
                    <ImageBackground source={backgroundIndividual} resizeMode="cover"
                        style={
                            {
                                flex: 1,
                                justifyContent: 'center',
                                borderRadius: 10,
                            }
                        } imageStyle={{ borderRadius: 10 }}>
                        <View style={{ height: '100%', marginLeft: 15, justifyContent: 'space-evenly' }}>

                            <View style={{
                                width: '90%',
                            }}>
                                <Text style={{ marginBottom: 15, marginLeft: 10, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'white', fontWeight: 'bold' }}>
                                    Welcome to Fun E Global Selling
                                </Text>
                                <Text style={{
                                    marginBottom: 10, marginLeft: 10, fontSize: 12, fontFamily: 'Roboto-Medium', color: 'white'
                                }}>
                                    Get access to 100 mln buyer worldwide.Start with creating an Fun E seller account.
                                </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('SellingGlobal')}
                                    style={{
                                        backgroundColor: '#36B81A',
                                        padding: 5,
                                        width: 100,
                                        marginLeft: 10
                                    }}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12,
                                            color: '#fff',
                                        }}>
                                        Start Selling
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default SearchScreen;