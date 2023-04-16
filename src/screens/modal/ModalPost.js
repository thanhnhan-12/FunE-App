import React, { useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreatePostModal from '../Post/CreatePostModal';
import { AuthContext } from '../../context/AuthContext';

const ModalPost = ({ modalVisible, setModalVisible, opacityModal, setOpacityModal, setRoom, navigation }) => {

    const handleOnClick = (modalVisible, setModalVisible, opacityModal, setOpacityModal) => {
        setModalVisible(!modalVisible);
        setOpacityModal(!opacityModal);
    }

    const { userInfo } = useContext(AuthContext);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                setOpacityModal(!opacityModal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <TouchableOpacity style={{
                        marginLeft: 120
                    }}>
                        <Ionicons
                            onPress={() => handleOnClick(modalVisible, setModalVisible, opacityModal, setOpacityModal)}
                            name="close"
                            size={40}
                            color="red"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setOpacityModal(!opacityModal);
                        }}
                        style={{
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: 10,
                            width: '60%',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',

                        }}
                    >
                        <CreatePostModal>
                            <>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        fontFamily: 'Roboto-MediumItalic',
                                        width: "100%",
                                    }}>
                                    Add Pic/Video
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={22} color="red" />
                            </>
                        </CreatePostModal>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: 10,
                            width: '60%',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                        onPress={() => {
                            setOpacityModal(!opacityModal);
                            setModalVisible(!modalVisible);
                            navigation.navigate('AddLiveStream');
                        }}
                    >
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 16,
                                textAlign: 'center',
                                fontFamily: 'Roboto-MediumItalic',
                                width: "80%"

                            }}>
                            Add Livestream
                        </Text>

                        <MaterialIcons name="arrow-forward-ios" size={22} color="red" />
                    </TouchableOpacity>
                    {userInfo && setRoom === false && userInfo.roleId === "2" &&

                        <View>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    padding: 10,
                                    width: '60%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        fontFamily: 'Roboto-MediumItalic',
                                        width: "80%"

                                    }}>
                                    Choose Products
                                </Text>

                                <MaterialIcons name="arrow-forward-ios" size={22} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    padding: 10,
                                    width: '60%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        fontFamily: 'Roboto-MediumItalic',
                                        width: "80%"

                                    }}
                                    onPress={() => {
                                        setOpacityModal(!opacityModal);
                                        setModalVisible(!modalVisible);
                                        navigation.navigate('CreateProduct');
                                    }}
                                >
                                    Add Product
                                </Text>

                                <MaterialIcons name="arrow-forward-ios" size={22} color="red" />
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            </View>
        </Modal >

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ModalPost;