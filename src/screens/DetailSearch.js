import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ListSearch from '../components/ListSearch';
import { productApi } from '../clients/product_api';
import { MEDIA_URL } from '../config';

const DetailSearch = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [previous, setPrevious] = useState('');
    const [searchText, setSearchText] = useState('');

    const route = useRoute();
    const keyword = route.params.searchText;
    const getIPFSLink = (hash) => {
        return MEDIA_URL + hash;
    };
    const handleCloseSearchText = () => {
        setPrevious('');
    }
    useEffect(() => {
        async function fetchData() {
            setPrevious(keyword);
            const result = await productApi.getProductSearch({ keyword: keyword });
            setProducts(result.products);
        }
        fetchData();
    }, [])

    const onSearh = async () => {
        const result = await productApi.getProductSearch({ keyword: searchText });
        setProducts(result.products);
        setPrevious(searchText);
    }

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
                        height: 60,
                        justifyContent: 'space-between'
                    }}>
                    {
                        previous && previous.length > 0 ?
                            <View style={{
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 5,
                                borderRadius: 5,
                                backgroundColor: "#D62965",
                                flexDirection: "row"
                            }}>
                                <Text style={{ color: 'white' }}>{previous}</Text>
                                <TouchableOpacity onPress={() => handleCloseSearchText()}>
                                    <Ionicons
                                        name="close"
                                        size={20}
                                        color="white"
                                        style={{ marginLeft: 10 }}
                                    />
                                </TouchableOpacity>
                            </View>
                            :
                            <TextInput placeholder="Search Posting / Room"
                                onChangeText={text => setSearchText(text)}
                            />
                    }

                    <TouchableOpacity onPress={() => onSearh()}>
                        <Ionicons
                            name="search"
                            size={20}
                            color="black"
                            style={{ marginTop: 10 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 15,
                    marginBottom: 15,
                }}>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <MaterialIcons
                            name="sort"
                            size={20}
                            color="black"
                        />
                        <Text style={{ color: 'black', fontSize: 14 }}>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <MaterialIcons
                            name="filter-alt"
                            size={20}
                            color="black"
                        />
                        <Text style={{ color: 'black', fontSize: 14 }}>Filter</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginBottom: 20,
                    flexWrap: 'wrap',
                }}>
                    {products.map(item => (
                        <ListSearch
                            key={item.id}
                            photo={getIPFSLink(item.media)}
                            title={item.name}
                            price={item.pricing}
                            dot={true}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default DetailSearch;