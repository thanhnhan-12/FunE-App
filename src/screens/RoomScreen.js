import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    StyleSheet,

} from 'react-native';
import SquareAlbum from '../components/SquareAlbum';
import CustomSwitch from '../components/CustomSwitch';
import { useRoute } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalPostRoom from './modal/ModalPostRoom';
import Header from '../components/Header';
import { IP_CONFIG } from '@env';
import { userApi } from '../clients/user_api';
import { roomApi } from '../clients/room_api';
import { postRoomApi } from '../clients/post_room_api';

import { AuthContext } from '../context/AuthContext';

const RoomScreen = ({ navigation }) => {
    const { transmissionPropsPost } = useContext(AuthContext);
    const [chooseTab, setChooseTab] = useState(1);
    const onSelectSwitch = value => {
        setChooseTab(value);
    };
    const route = useRoute();
    const dataRoom = route.params.dataItem;

    const [modalVisible, setModalVisible] = useState(false);
    const [opacityModal, setOpacityModal] = useState(false);
    const [idUserRoom, setIdUserRoom] = useState([]);
    const [members, setMembers] = useState([]);
    const [posts, setPosts] = useState([]);

    const handleOnClickCloseModal = (modalVisible, setModalVisible, opacityModal, setOpacityModal) => {
        setModalVisible(!modalVisible);
        setOpacityModal(!opacityModal);
    }

    useEffect(() => {
        async function fetchData() {
            const userById = await userApi.getUserByID(dataRoom.idUser);
            setIdUserRoom(userById.users);
            const memberRoom = await roomApi.getMembers(dataRoom.id);
            setMembers(memberRoom.data);
            transmissionPropsPost(dataRoom.id);
        }
        fetchData();
        fetchPost(10, 0, dataRoom.id);
    }, [modalVisible])

    async function fetchPost(limit, offset, idRoom) {
        const result = await postRoomApi.getPosts({ limit, offset, idRoom });
        if (result.posts) {
            setPosts(result.posts);
        }
        else {
            console.log("get post fail!");
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header
                    trueBell
                    trueCart
                    trueCoin
                    trueHear
                    trueReturn
                    navigation={navigation}
                />
                {
                    opacityModal && opacityModal === true ?
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ padding: 15 }}>
                            <View style={{
                                opacity: 0.4
                            }}>
                                <View style={styles.container}>
                                    <ImageBackground source={{ uri: `http://${IP_CONFIG}:3000/individuals/${dataRoom.background}` }} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 10 }}>
                                        <TouchableOpacity style={{ height: '100%', marginLeft: 15, justifyContent: 'flex-end' }}>
                                            <ImageBackground
                                                source={{ uri: `http://${IP_CONFIG}:3000/individuals/${dataRoom.image}` }}
                                                style={{ width: 70, height: 70 }}
                                                imageStyle={{ borderRadius: 70 }}
                                            />
                                            <TouchableOpacity style={{
                                                // backgroundColor: '#AD40AF',
                                                width: '90%',
                                            }}>
                                                <Text style={{ marginBottom: 15, marginLeft: 10, fontSize: 20, fontFamily: 'Roboto-Medium', color: 'white', fontWeight: 'bold' }}>
                                                    {dataRoom.name}
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
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>6</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black' }}>Posts</Text>
                                    </View>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>6</Text>
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
                                <View
                                    style={{
                                        marginVertical: 15,
                                        flexDirection: 'row',
                                    }}>
                                    <Text style={{ fontWeight: 600, marginLeft: 15, fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                        Members
                                    </Text>
                                    <MaterialIcons
                                        name="emoji-people"
                                        size={26}
                                        color="black"
                                        style={{ marginLeft: 15 }}
                                    />
                                </View>
                                <TouchableOpacity style={{
                                    // backgroundColor: '#AD40AF',
                                    padding: 20,
                                    width: '100%',
                                    borderRadius: 10,
                                    marginBottom: 5,
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                }}>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }}>
                                        <ImageBackground
                                            source={{ uri: `http://${IP_CONFIG}:3000/individuals/${idUserRoom.image}` }}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                {idUserRoom.firstName}
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    {members && members.length > 0 && members.map((item, index) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={{
                                                marginRight: 5
                                            }}>
                                            <ImageBackground
                                                source={{ uri: `http://${IP_CONFIG}:3000/individuals/${members[index].User.image}` }}
                                                style={{ width: 50, height: 50 }}
                                                imageStyle={{ borderRadius: 50 }}
                                            />
                                            <TouchableOpacity style={{
                                                // backgroundColor: '#AD40AF',
                                                width: '90%',
                                            }}>
                                                <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                                                    {members[index].User.firstName}
                                                </Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    ))}
                                </TouchableOpacity>
                                <View style={{ marginVertical: 10 }}>
                                    <CustomSwitch
                                        selectionMode={1}
                                        // option1="Post"
                                        // option2="Information"
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
                                                        <View key={index}>
                                                            <SquareAlbum data={item} onPress={() => {
                                                                navigation.navigate('SocialPostScreen', {
                                                                    data: item
                                                                })
                                                            }} />
                                                        </View>

                                                    ))
                                                }
                                            </View>
                                        </View>
                                    </>)
                                }
                            </View>
                        </ScrollView>
                        :
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ padding: 15 }}>
                            <View style={{
                                opacity: 1
                            }}>
                                <View style={styles.container}>
                                    <ImageBackground source={{ uri: `http://${IP_CONFIG}:3000/individuals/${dataRoom.background}` }} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 10 }}>
                                        <TouchableOpacity style={{ height: '100%', marginLeft: 15, justifyContent: 'flex-end' }}>
                                            <ImageBackground
                                                source={{ uri: `http://${IP_CONFIG}:3000/individuals/${dataRoom.image}` }}
                                                style={{ width: 70, height: 70 }}
                                                imageStyle={{ borderRadius: 70 }}
                                            />
                                            <TouchableOpacity style={{
                                                // backgroundColor: '#AD40AF',
                                                width: '90%',
                                            }}>
                                                <Text style={{ marginBottom: 15, marginLeft: 10, fontSize: 20, fontFamily: 'Roboto-Medium', color: 'white', fontWeight: 'bold' }}>
                                                    {dataRoom.name}
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
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>6</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black' }}>Posts</Text>
                                    </View>
                                    <View style={{
                                        textAlign: 'center',
                                    }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>6</Text>
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
                                <View
                                    style={{
                                        marginVertical: 15,
                                        flexDirection: 'row',
                                    }}>
                                    <Text style={{ fontWeight: 600, marginLeft: 15, fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                        Members
                                    </Text>
                                    <MaterialIcons
                                        name="emoji-people"
                                        size={26}
                                        color="black"
                                        style={{ marginLeft: 15 }}
                                    />
                                </View>
                                <TouchableOpacity style={{
                                    // backgroundColor: '#AD40AF',
                                    padding: 20,
                                    width: '100%',
                                    borderRadius: 10,
                                    marginBottom: 5,
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                }}>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }}>
                                        <ImageBackground
                                            source={{ uri: `http://${IP_CONFIG}:3000/individuals/${idUserRoom.image}` }}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                {idUserRoom.firstName}
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    {members && members.length > 0 && members.map((item, index) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={{
                                                marginRight: 5
                                            }}>
                                            <ImageBackground
                                                source={{ uri: `http://${IP_CONFIG}:3000/individuals/${members[index].User.image}` }}
                                                style={{ width: 50, height: 50 }}
                                                imageStyle={{ borderRadius: 50 }}
                                            />
                                            <TouchableOpacity style={{
                                                // backgroundColor: '#AD40AF',
                                                width: '90%',
                                            }}>
                                                <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                                                    {members[index].User.firstName}
                                                </Text>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    ))}

                                </TouchableOpacity>
                                <View style={{ marginVertical: 10 }}>
                                    <CustomSwitch
                                        selectionMode={1}
                                        // option1="Post"
                                        // option2="Information"
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
                                                        <View key={index}>
                                                            <SquareAlbum data={item} onPress={() => {
                                                                navigation.navigate('SocialPostScreen', {
                                                                    data: item
                                                                })
                                                            }} />
                                                        </View>

                                                    ))
                                                }
                                            </View>
                                        </View>
                                    </>)
                                }
                            </View>
                        </ScrollView>
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
            <ModalPostRoom
                opacityModal={opacityModal}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setOpacityModal={setOpacityModal}
                idRoom={dataRoom.id}
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

export default RoomScreen;