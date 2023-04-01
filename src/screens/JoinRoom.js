import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert
} from 'react-native';
import CustomSwitchRoom from '../components/CustomSwitchRoom';
import { useForm } from "react-hook-form";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
            console.log(result);
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
                                        option1="Not participate"
                                        option2="Joined"
                                        onSelectSwitch={onSelectSwitch}
                                    />
                                </View>
                            </View>
                            {chooseTab == 1 &&
                                (<>
                                    <View
                                        style={{
                                            marginVertical: 15,
                                            flexDirection: 'row',
                                        }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
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
                                        option1="Not participate"
                                        option2="Joined"
                                        // icon1={<MaterialCommunityIcons
                                        //     name="text-box-plus-outline"
                                        //     size={30}
                                        //     color="black"
                                        //     style={{ marginLeft: 15 }}
                                        // />}
                                        // icon2={<Ionicons
                                        //     name="md-information-circle-outline"
                                        //     size={30}
                                        //     color="black"
                                        //     style={{ marginLeft: 15 }}
                                        // />}
                                        onSelectSwitch={onSelectSwitch}
                                    />
                                </View>
                                {chooseTab == 1 &&
                                    (<>
                                        <View
                                            style={{
                                                marginVertical: 15,
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
                                                    source={{ uri: 'data:image/jpeg;base64,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' }}
                                                    style={{ width: 70, height: 70 }}
                                                    imageStyle={{ borderRadius: 10 }}
                                                />
                                            </View>
                                            <View style={{
                                                marginLeft: 20,
                                                width: "50%"
                                            }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                    Room Name
                                                </Text>
                                                <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
                                                    Description
                                                </Text>
                                            </View>
                                            <TouchableOpacity
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
                                    </>)
                                }
                                {chooseTab == 2 &&
                                    (<>
                                        <TouchableOpacity
                                            style={{
                                                marginVertical: 15,
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
                                                    source={{ uri: 'data:image/jpeg;base64,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' }}
                                                    style={{ width: 70, height: 70 }}
                                                    imageStyle={{ borderRadius: 10 }}
                                                />
                                            </View>
                                            <View style={{
                                                marginLeft: 20,
                                                width: "70%"
                                            }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                                                    Room Name
                                                </Text>
                                                <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
                                                    Description
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
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
                            marginBottom: 0,
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