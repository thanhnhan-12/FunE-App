import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const handleOnClick = (modalVisible, setModalVisible, opacityModal, setOpacityModal) => {
    setModalVisible(!modalVisible);
    setOpacityModal(!opacityModal);
}

const ModalPost = ({ modalVisible, setModalVisible, opacityModal, setOpacityModal, setRoom }) => {
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
                            Add Pic/Video
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

                            }}>
                            Add Livestream
                        </Text>

                        <MaterialIcons name="arrow-forward-ios" size={22} color="red" />
                    </TouchableOpacity>
                    {setRoom === false &&
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

                                    }}>
                                    Add Product
                                </Text>

                                <MaterialIcons name="arrow-forward-ios" size={22} color="red" />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </Modal>

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