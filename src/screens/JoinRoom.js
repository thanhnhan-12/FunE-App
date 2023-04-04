import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import CustomSwitchRoom from '../components/CustomSwitchRoom';
import { useForm } from "react-hook-form";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import ModalCreateRoom from './modal/ModalCreateRoom';
import { IP_CONFIG } from '@env';
import Header from '../components/Header';
import { roomApi } from '../clients/room_api';

const JoinRoom = ({ navigation }) => {

    const { handleSubmit } = useForm();
    const { userInfo } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [opacityModal, setOpacityModal] = useState(false);
    const [roomName, setRoomName] = useState(null);
    const [description, setDescription] = useState(null);
    const [chooseTab, setChooseTab] = useState(1);
    const [dataRoomCreate, setDataRoomCreate] = useState([]);
    const [dataRoomJoined, setDataRoomJoined] = useState([]);
    const [dataRoomNotJoin, setDataRoomNotJoin] = useState([]);
    const [eff, setEff] = useState(false);
    const onSelectSwitch = value => {
        setChooseTab(value);
    };
    const handleOnClickCloseModal = (modalVisible, setModalVisible, opacityModal, setOpacityModal) => {
        setModalVisible(!modalVisible);
        setOpacityModal(!opacityModal);
    }
    const backgroundIndividual = userInfo.background;
    const imageIndividual = userInfo.image;
    const id_user = userInfo.id;

    const onSubmit = async () => {
        if (roomName !== null) {
            const data = { id_user, roomName, imageIndividual, backgroundIndividual, description };
            const result = await roomApi.createRoom(data);
            if (result.message) {
                setModalVisible(false);
                setOpacityModal(false);
                Alert.alert("Update succeed!");
            }
            else {
                Alert.alert("Update faided!");
            }
        }
        else {
            Alert.alert("Missing parameter!");
        }
    }

    const onJoin = async (idRoom, item) => {
        const data = { id_user, idRoom };
        console.log(data);
        const result = await roomApi.joinRoom(data);
        if (result.message) {
            setEff(!eff);
            Alert.alert("Join succeed!");
            navigation.navigate('RoomScreen', {
                dataItem: item
            })
        }
        else {
            Alert.alert("Joined!");
            navigation.navigate('RoomScreen', {
                dataItem: item
            });
        }
    }

    useEffect(() => {
        async function fetchData() {
            const data = { id_user };
            const dataRoomCreate = await roomApi.getRoomCreate(data);
            const dataRoomNotJoin = await roomApi.getRoomNotJoin(data);
            const dataRoomJoined = await roomApi.getRoomJoined(data);
            setDataRoomCreate(dataRoomCreate.data);
            setDataRoomNotJoin(dataRoomNotJoin.data);
            setDataRoomJoined(dataRoomJoined.data);
        }
        fetchData();
    }, [modalVisible, eff])

    return (
        <>
            <Header
                title={"Room"}
                trueCart
                trueCoin
                trueBell
                trueReturn
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
                                <View style={{ marginVertical: 10 }}>
                                    <CustomSwitchRoom
                                        selectionMode={1}
                                        option1="Join"
                                        option2="Joined"
                                        onSelectSwitch={onSelectSwitch}
                                    />
                                </View>
                            </View>
                            {chooseTab == 1 &&
                                (<>
                                    {dataRoomNotJoin && dataRoomNotJoin.length > 0 && dataRoomNotJoin.map(item => (
                                        <View
                                            key={item.id}
                                            style={{
                                                marginVertical: 4,
                                                flexDirection: 'row',
                                                borderWidth: 1,
                                                borderColor: '#ccc',
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <View style={{
                                                width: "20%",
                                                paddingLeft: 5
                                            }}>
                                                <ImageBackground
                                                    source={{ uri: `http://${IP_CONFIG}:3000/individuals/${item.image}` }}
                                                    style={{ width: 70, height: 70 }}
                                                    imageStyle={{ borderRadius: 10 }}
                                                />
                                            </View>
                                            <View style={{
                                                marginLeft: 20,
                                                width: "50%"
                                            }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                    {item.name}
                                                </Text>
                                                <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
                                                    {item.description}
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => onJoin(item.id, item)}
                                                style={{
                                                    backgroundColor: '#AD40AF',
                                                    padding: 10,
                                                    borderRadius: 10,
                                                    width: 60,
                                                    height: 60,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <Text
                                                    style={{
                                                        textAlign: 'center',
                                                        fontWeight: '700',
                                                        fontSize: 16,
                                                        color: '#fff',
                                                    }}>
                                                    Join
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}

                                </>)
                            }
                            {chooseTab == 2 &&
                                (<>
                                    {dataRoomCreate && dataRoomCreate.length > 0 &&
                                        dataRoomCreate.map(item => (
                                            <TouchableOpacity
                                                key={item.id}
                                                onPress={() => navigation.navigate('RoomScreen', {
                                                    dataItem: item
                                                })}
                                                style={{
                                                    marginVertical: 4,
                                                    flexDirection: 'row',
                                                    borderWidth: 1,
                                                    borderColor: '#ccc',
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                }}>
                                                <View style={{
                                                    width: "20%",
                                                    paddingLeft: 5
                                                }}>
                                                    <ImageBackground
                                                        source={{ uri: `http://${IP_CONFIG}:3000/individuals/${item.image}` }}
                                                        style={{ width: 70, height: 70 }}
                                                        imageStyle={{ borderRadius: 10 }}
                                                    />
                                                </View>
                                                <View style={{
                                                    marginLeft: 20,
                                                    width: "70%"
                                                }}>
                                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
                                                        {item.description}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                    {dataRoomJoined && dataRoomJoined.length > 0 &&
                                        dataRoomJoined.map(item => (
                                            <TouchableOpacity
                                                key={item.id}
                                                onPress={() => navigation.navigate('RoomScreen', {
                                                    dataItem: item
                                                })}
                                                style={{
                                                    marginVertical: 4,
                                                    flexDirection: 'row',
                                                    borderWidth: 1,
                                                    borderColor: '#ccc',
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                }}>
                                                <View style={{
                                                    width: "20%",
                                                    paddingLeft: 5
                                                }}>
                                                    <ImageBackground
                                                        source={{ uri: `http://${IP_CONFIG}:3000/individuals/${item.image}` }}
                                                        style={{ width: 70, height: 70 }}
                                                        imageStyle={{ borderRadius: 10 }}
                                                    />
                                                </View>
                                                <View style={{
                                                    marginLeft: 20,
                                                    width: "70%"
                                                }}>
                                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
                                                        {item.description}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </>)
                            }
                        </ScrollView>
                        :
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ padding: 15 }}>
                            <View style={{
                                opacity: 1
                            }}>
                                <View style={{ marginVertical: 10 }}>
                                    <CustomSwitchRoom
                                        selectionMode={1}
                                        option1="Join"
                                        option2="Joined"
                                        onSelectSwitch={onSelectSwitch}
                                    />
                                </View>
                                {chooseTab == 1 &&
                                    (<>
                                        {dataRoomNotJoin && dataRoomNotJoin.length > 0 && dataRoomNotJoin.map(item => (
                                            <View
                                                key={item.id}
                                                style={{
                                                    marginVertical: 4,
                                                    flexDirection: 'row',
                                                    borderWidth: 1,
                                                    borderColor: '#ccc',
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <View style={{
                                                    width: "20%",
                                                    paddingLeft: 5
                                                }}>
                                                    <ImageBackground
                                                        source={{ uri: `http://${IP_CONFIG}:3000/individuals/${item.image}` }}
                                                        style={{ width: 70, height: 70 }}
                                                        imageStyle={{ borderRadius: 10 }}
                                                    />
                                                </View>
                                                <View style={{
                                                    marginLeft: 20,
                                                    width: "50%"
                                                }}>
                                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
                                                        {item.description}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => onJoin(item.id, item)}
                                                    style={{
                                                        backgroundColor: '#AD40AF',
                                                        padding: 10,
                                                        borderRadius: 10,
                                                        width: 60,
                                                        height: 60,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                            fontWeight: '700',
                                                            fontSize: 16,
                                                            color: '#fff',
                                                        }}>
                                                        Join
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}

                                    </>)
                                }
                                {chooseTab == 2 &&
                                    (<>
                                        {dataRoomCreate && dataRoomCreate.length > 0 &&
                                            dataRoomCreate.map(item => (
                                                <TouchableOpacity
                                                    key={item.id}
                                                    onPress={() => navigation.navigate('RoomScreen', {
                                                        dataItem: item
                                                    })}
                                                    style={{
                                                        marginVertical: 4,
                                                        flexDirection: 'row',
                                                        borderWidth: 1,
                                                        borderColor: '#ccc',
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                    }}>
                                                    <View style={{
                                                        width: "20%",
                                                        paddingLeft: 5
                                                    }}>
                                                        <ImageBackground
                                                            source={{ uri: `http://${IP_CONFIG}:3000/individuals/${item.image}` }}
                                                            style={{ width: 70, height: 70 }}
                                                            imageStyle={{ borderRadius: 10 }}
                                                        />
                                                    </View>
                                                    <View style={{
                                                        marginLeft: 20,
                                                        width: "70%"
                                                    }}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                            {item.name}
                                                        </Text>
                                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
                                                            {item.description}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                        }
                                        {dataRoomJoined && dataRoomJoined.length > 0 &&
                                            dataRoomJoined.map(item => (
                                                <TouchableOpacity
                                                    key={item.id}
                                                    onPress={() => navigation.navigate('RoomScreen', {
                                                        dataItem: item
                                                    })}
                                                    style={{
                                                        marginVertical: 4,
                                                        flexDirection: 'row',
                                                        borderWidth: 1,
                                                        borderColor: '#ccc',
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                    }}>
                                                    <View style={{
                                                        width: "20%",
                                                        paddingLeft: 5
                                                    }}>
                                                        <ImageBackground
                                                            source={{ uri: `http://${IP_CONFIG}:3000/individuals/${item.image}` }}
                                                            style={{ width: 70, height: 70 }}
                                                            imageStyle={{ borderRadius: 10 }}
                                                        />
                                                    </View>
                                                    <View style={{
                                                        marginLeft: 20,
                                                        width: "70%"
                                                    }}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                            {item.name}
                                                        </Text>
                                                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
                                                            {item.description}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                        }
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
                            marginBottom: 50,
                        }}>
                        <Ionicons
                            name="add"
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ModalCreateRoom
                opacityModal={opacityModal}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setOpacityModal={setOpacityModal}
                onPress={handleSubmit(onSubmit)}
                onChangeTextName={(text) => setRoomName(text)}
                onChangeTextDescription={(text) => setDescription(text)}
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

export default JoinRoom;