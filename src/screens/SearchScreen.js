import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';

import BannerSlider from '../components/BannerSlider';
import { windowWidth } from '../utils/Dimensions';

import { freeGames, paidGames, sliderData } from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import { AuthContext } from '../context/AuthContext';

const SearchScreen = () => {
    const { userInfo, isLoading, logout } = useContext(AuthContext);
    const [gamesTab, setGamesTab] = useState(1);

    const renderBanner = ({ item, index }) => {
        return <BannerSlider data={item} />;
    };

    const onSelectSwitch = value => {
        setGamesTab(value);
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
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
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

                <View style={{ marginVertical: 20 }}>
                    <CustomSwitch
                        selectionMode={1}
                        option1="Recently Viewed"
                        option2="You May Also Like"
                        onSelectSwitch={onSelectSwitch}
                    />
                </View>

                {gamesTab == 1 &&
                    freeGames.map(item => (
                        <ListItem
                            key={item.id}
                            photo={item.poster}
                            title={item.title}
                            subTitle={item.subtitle}
                            isFree={item.isFree}
                            onPress={() =>
                                navigation.navigate('GameDetails', {
                                    title: item.title,
                                    id: item.id,
                                })
                            }
                        />
                    ))}
                {gamesTab == 2 &&
                    paidGames.map(item => (
                        <ListItem
                            key={item.id}
                            photo={item.poster}
                            title={item.title}
                            subTitle={item.subtitle}
                            isFree={item.isFree}
                            price={item.price}
                            onPress={() =>
                                navigation.navigate('GameDetails', {
                                    title: item.title,
                                    id: item.id,
                                })
                            }
                        />
                    ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchScreen;