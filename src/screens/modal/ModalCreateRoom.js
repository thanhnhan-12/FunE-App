import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalCreateRoom = ({ modalVisible, setModalVisible, opacityModal, setOpacityModal, onPress, onChangeTextName, onChangeTextDescription }) => {
    const handleOnClick = (modalVisible, setModalVisible, opacityModal, setOpacityModal) => {
        setModalVisible(!modalVisible);
        setOpacityModal(!opacityModal);
    }

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
                        width: "100%",
                        alignItems: "flex-end",
                    }}>
                        <Ionicons
                            onPress={() => handleOnClick(modalVisible, setModalVisible, opacityModal, setOpacityModal)}
                            name="close"
                            size={40}
                            color="red"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'left',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Room Name*
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={onChangeTextName}
                        style={{
                            paddingVertical: 0,
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            borderColor: '#545E61',
                            borderWidth: 1,
                            textAlign: 'left',
                            justifyContent: 'center',
                            height: 45,
                        }}
                    />
                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'left',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Description*
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={onChangeTextDescription}
                        style={{
                            paddingVertical: 0,
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            borderColor: '#545E61',
                            borderWidth: 1,
                            textAlign: 'left',
                            justifyContent: 'center',
                            height: 45,
                        }}
                    />
                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            backgroundColor: '#D62965',
                            padding: 10,
                            borderRadius: 10,
                            marginTop: 30,
                            marginBottom: 30,
                            width: '80%',
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: 16,
                                color: '#fff',
                            }}>
                            Create
                        </Text>
                    </TouchableOpacity>
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
        width: '70%',
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

export default ModalCreateRoom;