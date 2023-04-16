import React, { useContext, useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import { productApi } from '../../clients/product_api';
import { MEDIA_URL } from '../../config';
import ListProduct from '../../components/ListProduct';

const ModalBagLiveStream = ({ modalVisible, setModalVisible, navigation }) => {
    const [products, setProducts] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const id_user = userInfo.id;
    const handleOnClick = (modalVisible, setModalVisible) => {
        setModalVisible(!modalVisible);
    }

    const handleOnClickCart = (item) => {
        setModalVisible(!modalVisible);
        navigation.navigate('ProductDetailLiveStream', {
            data: item
        })
    }

    useEffect(() => {
        async function fetchData() {
            const productUser = await productApi.getProductByUserId(id_user);
            setProducts(productUser.product);
        }
        fetchData();
    }, [])

    const getIPFSLink = (hash) => {
        return MEDIA_URL + hash;
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView>
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
                                        onPress={() => handleOnClickCart(item)}
                                        navigation={navigation}
                                        key={item.id}
                                        photo={getIPFSLink(item.media)}
                                        title={item.name}
                                        price={item.pricing}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity style={{
                                width: '80%',
                                borderWidth: 1,
                                borderColor: '#FF1493',
                                alignItems: "center",
                                marginBottom: 30,
                                padding: 10,
                                borderRadius: 10
                            }}
                                onPress={() => handleOnClick(modalVisible, setModalVisible)}
                            >
                                <Text style={{ color: '#FF1493' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

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
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: "80%",
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        paddingHorizontal: 20,
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

export default ModalBagLiveStream;