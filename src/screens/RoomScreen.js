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
import CustomSwitch from '../components/CustomSwitch';
import { useRoute } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListPhoto from '../components/ListPhotos';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { freeGames } from '../model/data';
import ModalPostRoom from './modal/ModalPostRoom';
import Header from '../components/Header';
import { IP_CONFIG } from '@env';
import { userApi } from '../clients/user_api';
import { roomApi } from '../clients/room_api';

import { AuthContext } from '../context/AuthContext';

const RoomScreen = ({ navigation }) => {
    const { transmissionPropsPost } = useContext(AuthContext);
    const [chooseTab, setChooseTab] = useState(1);
    const onSelectSwitch = value => {
        setChooseTab(value);
    };
    const route = useRoute();
    const dataRoom = route.params.dataItem;
    console.log(dataRoom);
    const handleTransPage = (item, page) => {
        transmissionPropsPost(item);
        navigation.navigate(page);
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityModal, setOpacityModal] = useState(false);
    const [idUserRoom, setIdUserRoom] = useState([]);
    const [members, setMembers] = useState([]);

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
    }, [])

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
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
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
                                        <TouchableOpacity
                                            style={{
                                                marginVertical: 15,
                                                flexDirection: 'row',
                                            }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                Postings
                                            </Text>
                                            <MaterialIcons
                                                name="post-add"
                                                size={26}
                                                color="black"
                                                style={{ marginLeft: 15 }}
                                            />
                                        </TouchableOpacity>

                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            flexWrap: 'wrap',
                                        }}>

                                            {freeGames.map(item => (
                                                <TouchableOpacity key={item.id}>
                                                    <TouchableOpacity onPress={() => handleTransPage(item, 'SocialPost')}>
                                                        <ListPhoto
                                                            key={item.id}
                                                            photo={item.poster}
                                                            title={item.title}
                                                        />
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            ))}
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
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
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
                                        <TouchableOpacity
                                            style={{
                                                marginVertical: 15,
                                                flexDirection: 'row',
                                            }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                Postings
                                            </Text>
                                            <MaterialIcons
                                                name="post-add"
                                                size={26}
                                                color="black"
                                                style={{ marginLeft: 15 }}
                                            />
                                        </TouchableOpacity>

                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            marginBottom: 20,
                                            flexWrap: 'wrap',
                                        }}>

                                            {freeGames.map(item => (
                                                <TouchableOpacity key={item.id}>
                                                    <TouchableOpacity onPress={() => handleTransPage(item, 'SocialPost')}>
                                                        <ListPhoto
                                                            key={item.id}
                                                            photo={item.poster}
                                                            title={item.title}
                                                        />
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            ))}
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