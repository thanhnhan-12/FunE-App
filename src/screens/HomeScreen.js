import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import CustomSwitch from '../components/CustomSwitch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import ModalPost from './modal/ModalPost';
import { IP_CONFIG } from '@env';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { productApi } from '../clients/product_api';
import { postApi } from '../clients/post_api';
import ListProduct from '../components/ListProduct';
import { MEDIA_URL } from '../config';
import SquareAlbum from '../components/SquareAlbum';
import { livestreamApi } from '../clients/livestream_api';

const HomeScreen = ({ route }) => {

    const navigation = useNavigation();
    const { userInfo } = useContext(AuthContext);
    const [chooseTab, setChooseTab] = useState(1);
    const id_user = userInfo.id;
    const onSelectSwitch = value => {
        setChooseTab(value);
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityModal, setOpacityModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [livestreams, setLiveSteams] = useState([]);
    const [products, setProducts] = useState([]);
    const handleOnClickCloseModal = (modalVisible, setModalVisible, opacityModal, setOpacityModal) => {
        setModalVisible(!modalVisible);
        setOpacityModal(!opacityModal);
    }

    async function fetchPost(limit, offset) {
        const result = await postApi.getPosts({ id_user, limit, offset });
        if (result.posts) {
            setPosts(result.posts);
        }
        else {
            console.log("get category fail!");
        }
    }

    const getIPFSLink = (hash) => {
        return MEDIA_URL + hash;
    };

    const backgroundIndividual = { uri: `http://${IP_CONFIG}:3000/individuals/${userInfo.background}` };
    const imageIndividual = { uri: `http://${IP_CONFIG}:3000/individuals/${userInfo.image}` };

    useEffect(() => {
        if (route.params?.key === 'reset') {
            async function fetchData() {
                const productUser = await productApi.getProductByUserId(id_user);
                setProducts(productUser.product);
                const livestream = await livestreamApi.getsLive({ id_user });
                setLiveSteams(livestream.data)
                console.log("ABC", liveSteams)
            }
            fetchData();
            fetchPost(10, 0);
        } else {
            async function fetchData() {
                const productUser = await productApi.getProductByUserId(id_user);
                setProducts(productUser.product);
                const livestream = await livestreamApi.getsLive({ id_user });
                setLiveSteams(livestream.data)
                console.log("ABC", livestreams)
            }
            fetchData();
            fetchPost(10, 0);
        }
    }, [route.params?.key, modalVisible])
    return (
        <>
            <Header
                trueCart
                trueHear
                trueCoin
                trueBell
                navigation={navigation}
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                {
                    opacityModal && opacityModal === true ?
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ padding: 15 }}>
                            <View style={{
                                opacity: 0.4
                            }}>
                                <View style={{
                                    flex: 1,
                                    width: '100%',
                                    height: 200,
                                    opacity: 1,
                                }}>
                                    <ImageBackground source={backgroundIndividual} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 10 }}>
                                        <TouchableOpacity style={{ height: '100%', marginLeft: 15, justifyContent: 'flex-end' }}>
                                            <ImageBackground
                                                source={imageIndividual}
                                                style={{ width: 70, height: 70 }}
                                                imageStyle={{ borderRadius: 70 }}
                                            />
                                            <TouchableOpacity style={{
                                                // backgroundColor: '#AD40AF',
                                                width: '90%',
                                            }}>
                                                <Text style={{ marginBottom: 15, marginLeft: 10, fontSize: 20, fontFamily: 'Roboto-Medium', color: 'white', fontWeight: 'bold' }}>
                                                    {userInfo.firstName}
                                                </Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                                <TouchableOpacity style={{
                                    // backgroundColor: '#AD40AF',
                                    padding: 20,
                                    width: '100%',
                                    borderRadius: 10,
                                    marginBottom: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>14</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black' }}>Posts</Text>
                                    </View>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>4</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black' }}>Followers</Text>
                                    </View>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>3</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black' }}>Following</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#AD40AF',
                                            paddingTop: 14,
                                            paddingRight: 10,
                                            paddingBottom: 14,
                                            paddingLeft: 10,
                                            borderRadius: 10,
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontSize: 14,
                                                color: '#fff',
                                            }}>
                                            Following
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                <View style={{ marginVertical: 10 }}>
                                    <CustomSwitch
                                        selectionMode={1}
                                        // option1="Post"
                                        // option2="Sell"
                                        icon1={<MaterialCommunityIcons
                                            name="text-box-plus-outline"
                                            size={30}
                                            color="black"
                                            style={{ marginLeft: 15 }}
                                        />}
                                        icon2={<Ionicons
                                            name="md-information-circle-outline"
                                            size={30}
                                            color="black"
                                            style={{ marginLeft: 15 }}
                                        />}
                                        onSelectSwitch={onSelectSwitch}
                                    />
                                </View>
                                {chooseTab == 1 &&
                                    (<>
                                        <View
                                            style={{
                                                marginVertical: 15,
                                                flexDirection: 'row',
                                            }}>
                                            <Text style={{ color: 'black', fontWeight: 600, marginLeft: 15, fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                Postings
                                            </Text>
                                            <Ionicons
                                                name="cut-outline"
                                                size={26}
                                                color="black"
                                                style={{ marginLeft: 15 }}
                                            />
                                            <MaterialIcons
                                                name="delete-outline"
                                                size={26}
                                                color="black"
                                                style={{ marginLeft: 15 }}
                                            />
                                        </View>

                                        <View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start',
                                                marginBottom: 20,
                                                flexWrap: 'wrap',
                                            }}>
                                                {posts && posts.length > 0 &&
                                                    posts.map((item, index) => (
                                                        <TouchableOpacity key={index}>
                                                            <SquareAlbum data={item} onPress={() => {
                                                                navigation.navigate('ScrollView')
                                                            }} />
                                                        </TouchableOpacity>
                                                    ))
                                                }
                                            </View>
                                        </View>
                                    </>)
                                }
                                {
                                    chooseTab == 2 &&
                                    (<>
                                        <View
                                            style={{
                                                marginVertical: 15,
                                                flexDirection: 'row',
                                            }}>
                                            <Text style={{ color: 'black', marginLeft: 15, fontWeight: 600, fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                Products
                                            </Text>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            marginBottom: 10,
                                            flexWrap: 'wrap',
                                        }}>
                                            {products.map(item => (
                                                <TouchableOpacity key={item.id}>
                                                    <ListProduct
                                                        key={item.id}
                                                        photo={getIPFSLink(item.media)}
                                                        title={item.name}
                                                        price={item.pricing}
                                                    />
                                                </TouchableOpacity>
                                            ))}
                                        </View>

                                        <View
                                            style={{
                                                marginVertical: 15,
                                                flexDirection: 'row',
                                            }}>
                                            <Text style={{ color: 'black', marginLeft: 15, fontWeight: 600, fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                LIVE Schedule
                                            </Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            flexWrap: 'wrap',
                                        }}>
                                            {livestreams.map(item => (
                                                <TouchableOpacity key={item.id}>
                                                    <TouchableOpacity
                                                        style={{ alignItems: 'center', marginBottom: 10, marginLeft: 5 }}>
                                                        <View style={{
                                                            position: 'absolute',
                                                            top: 5,
                                                            left: -10,
                                                            right: 0,
                                                            zIndex: 1,
                                                            flexDirection: "row",
                                                            paddingHorizontal: 20,
                                                            width: "100%",
                                                        }}>
                                                            <Text style={{ color: "white", backgroundColor: "#365959", padding: 6 }}>LIVE</Text>
                                                        </View>
                                                        <View>
                                                            <Image
                                                                source={{ uri: getIPFSLink(item.media) }}
                                                                style={{ width: 90, height: 100, borderRadius: 10, borderColor: 'black', borderWidth: 1 }}
                                                            />
                                                            <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
                                                                <Text
                                                                    style={{
                                                                        color: 'black',
                                                                        fontFamily: 'Roboto-Medium',
                                                                        fontSize: 12,
                                                                    }}>
                                                                    {item.description}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </>)
                                }
                            </View >
                        </ScrollView >
                        :
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ padding: 15 }}>
                            <View style={{
                                opacity: 1
                            }}>
                                <View style={{
                                    flex: 1,
                                    width: '100%',
                                    height: 200,
                                }}>
                                    <ImageBackground source={backgroundIndividual} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 10 }}>
                                        <TouchableOpacity style={{ height: '100%', marginLeft: 15, justifyContent: 'flex-end' }}>
                                            <ImageBackground
                                                source={imageIndividual}
                                                style={{ width: 70, height: 70 }}
                                                imageStyle={{ borderRadius: 70 }}
                                            />
                                            <TouchableOpacity style={{
                                                // backgroundColor: '#AD40AF',
                                                width: '90%',
                                            }}>
                                                <Text style={{ marginBottom: 15, marginLeft: 10, fontSize: 20, fontFamily: 'Roboto-Medium', color: 'white', fontWeight: 'bold' }}>
                                                    {userInfo.firstName}
                                                </Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                                <TouchableOpacity style={{
                                    // backgroundColor: '#AD40AF',
                                    padding: 20,
                                    width: '100%',
                                    borderRadius: 10,
                                    marginBottom: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>14</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black' }}>Posts</Text>
                                    </View>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>4</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black' }}>Followers</Text>
                                    </View>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>3</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black' }}>Following</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#AD40AF',
                                            paddingTop: 14,
                                            paddingRight: 10,
                                            paddingBottom: 14,
                                            paddingLeft: 10,
                                            borderRadius: 10,
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontSize: 14,
                                                color: '#fff',
                                            }}>
                                            Following
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                <View style={{ marginVertical: 10 }}>
                                    <CustomSwitch
                                        selectionMode={1}
                                        // option1="Post"
                                        // option2="Sell"
                                        icon1={<MaterialCommunityIcons
                                            name="text-box-plus-outline"
                                            size={30}
                                            color="black"
                                            style={{ marginLeft: 15 }}
                                        />}
                                        icon2={<Ionicons
                                            name="md-information-circle-outline"
                                            size={30}
                                            color="black"
                                            style={{ marginLeft: 15 }}
                                        />}
                                        onSelectSwitch={onSelectSwitch}
                                    />
                                </View>
                                {chooseTab == 1 &&
                                    (<>
                                        <View
                                            style={{
                                                marginVertical: 15,
                                                flexDirection: 'row',
                                            }}>
                                            <Text style={{ color: 'black', fontWeight: 600, marginLeft: 15, fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                Postings
                                            </Text>
                                            <Ionicons
                                                name="cut-outline"
                                                size={26}
                                                color="black"
                                                style={{ marginLeft: 15 }}
                                            />
                                            <MaterialIcons
                                                name="delete-outline"
                                                size={26}
                                                color="black"
                                                style={{ marginLeft: 15 }}
                                            />
                                        </View>

                                        <View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start',
                                                marginBottom: 20,
                                                flexWrap: 'wrap',
                                            }}>
                                                {posts && posts.length > 0 &&
                                                    posts.map((item, index) => (
                                                        <TouchableOpacity key={index}>
                                                            <SquareAlbum data={item} onPress={() => {
                                                                navigation.navigate('ScrollView')
                                                            }} />
                                                        </TouchableOpacity>
                                                    ))
                                                }
                                            </View>
                                        </View>
                                    </>)
                                }
                                {
                                    chooseTab == 2 &&
                                    (<>
                                        <View
                                            style={{
                                                marginVertical: 15,
                                                flexDirection: 'row',
                                            }}>
                                            <Text style={{ color: 'black', marginLeft: 15, fontWeight: 600, fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                Products
                                            </Text>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            marginBottom: 10,
                                            flexWrap: 'wrap',
                                        }}>
                                            {products.map(item => (
                                                <TouchableOpacity key={item.id}>
                                                    <ListProduct
                                                        photo={getIPFSLink(item.media)}
                                                        title={item.name}
                                                        price={item.pricing}
                                                    />
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                        <View
                                            style={{
                                                marginVertical: 15,
                                                flexDirection: 'row',
                                            }}>
                                            <Text style={{ color: 'black', marginLeft: 15, fontWeight: 600, fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                LIVE Schedule
                                            </Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            flexWrap: 'wrap',
                                        }}>
                                            {livestreams.map(item => (
                                                <TouchableOpacity key={item.id}>
                                                    <TouchableOpacity
                                                        style={{ alignItems: 'center', marginBottom: 10, marginLeft: 5 }}>
                                                        <View style={{
                                                            position: 'absolute',
                                                            top: 5,
                                                            left: -10,
                                                            right: 0,
                                                            zIndex: 1,
                                                            flexDirection: "row",
                                                            paddingHorizontal: 20,
                                                            width: "100%",
                                                        }}>
                                                            <Text style={{ color: "white", backgroundColor: "#365959", padding: 6 }}>LIVE</Text>
                                                        </View>
                                                        <View>
                                                            <Image
                                                                source={{ uri: getIPFSLink(item.media) }}
                                                                style={{ width: 90, height: 100, borderRadius: 10, borderColor: 'black', borderWidth: 1 }}
                                                            />
                                                            <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
                                                                <Text
                                                                    style={{
                                                                        color: 'black',
                                                                        fontFamily: 'Roboto-Medium',
                                                                        fontSize: 12,
                                                                    }}>
                                                                    {item.description}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </>)
                                }
                            </View >
                        </ScrollView >
                }

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}>
                    <TouchableOpacity
                        onPress={() => handleOnClickCloseModal(modalVisible, setModalVisible, opacityModal, setOpacityModal)}
                        style={{
                            opacity: 1,
                            backgroundColor: '#AD40AF',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 20,
                            width: 60,
                            height: 60,
                            borderRadius: 60,
                            marginRight: 30,
                            marginBottom: 80
                        }}>
                        <Ionicons
                            name="add"
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
            <ModalPost
                navigation={navigation}
                opacityModal={opacityModal}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setOpacityModal={setOpacityModal}
                setRoom={false}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 200,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});

export default HomeScreen;