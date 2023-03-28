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
    Image
} from 'react-native';
import CustomSwitch from '../components/CustomSwitch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListPhoto from '../components/ListPhotos';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import { freeGames, paidGames, sliderData } from '../model/data';
import ModalPost from './modal/ModalPost';
import Header from '../components/Header';

import { AuthContext } from '../context/AuthContext';

const RoomScreen = ({ navigation }) => {
    const { userInfo, transmissionPropsPost, dataPost } = useContext(AuthContext);
    const [chooseTab, setChooseTab] = useState(1);
    const onSelectSwitch = value => {
        setChooseTab(value);
    };

    const handleTransPage = (item, page) => {
        transmissionPropsPost(item);
        console.log("Post ter", item.poster)
        navigation.navigate(page);
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [opacityModal, setOpacityModal] = useState(false);

    const handleOnClickCloseModal = (modalVisible, setModalVisible, opacityModal, setOpacityModal) => {
        setModalVisible(!modalVisible);
        setOpacityModal(!opacityModal);
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
                                    <ImageBackground source={require('../assets/images/homescreen/game-2.jpeg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 10 }}>
                                        <TouchableOpacity style={{ height: '100%', marginLeft: 15, justifyContent: 'flex-end' }}>
                                            <ImageBackground
                                                source={require('../assets/images/user-profile-logo.jpg')}
                                                style={{ width: 70, height: 70 }}
                                                imageStyle={{ borderRadius: 70 }}
                                            />
                                            <TouchableOpacity style={{
                                                // backgroundColor: '#AD40AF',
                                                width: '90%',
                                            }}>
                                                <Text style={{ marginBottom: 15, marginLeft: 10, fontSize: 20, fontFamily: 'Roboto-Medium', color: 'white', fontWeight: 'bold' }}>
                                                    Fun E Internal
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
                                            source={require('../assets/images/image-user.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                {userInfo.firstName}
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }}>
                                        <ImageBackground
                                            source={require('../assets/images/user-profile-3.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                                                Lệ
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }}>
                                        <ImageBackground
                                            source={require('../assets/images/user-profile-4.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                Thiên
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }} >
                                        <ImageBackground
                                            source={require('../assets/images/user-profile-5.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                Tiến
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }}>
                                        <ImageBackground
                                            source={require('../assets/images/user-profile-2.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                Ngân
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
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
                                    <ImageBackground source={require('../assets/images/homescreen/game-2.jpeg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 10 }}>
                                        <TouchableOpacity style={{ height: '100%', marginLeft: 15, justifyContent: 'flex-end' }}>
                                            <ImageBackground
                                                source={require('../assets/images/user-profile-logo.jpg')}
                                                style={{ width: 70, height: 70 }}
                                                imageStyle={{ borderRadius: 70 }}
                                            />
                                            <TouchableOpacity style={{
                                                // backgroundColor: '#AD40AF',
                                                width: '90%',
                                            }}>
                                                <Text style={{ marginBottom: 15, marginLeft: 10, fontSize: 20, fontFamily: 'Roboto-Medium', color: 'white', fontWeight: 'bold' }}>
                                                    Fun E Internal
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
                                            source={require('../assets/images/image-user.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                {userInfo.firstName}
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }}>
                                        <ImageBackground
                                            source={require('../assets/images/user-profile-3.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                                                Lệ
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }}>
                                        <ImageBackground
                                            source={require('../assets/images/user-profile-4.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                Thiên
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }} >
                                        <ImageBackground
                                            source={require('../assets/images/user-profile-5.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                Tiến
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        marginRight: 5
                                    }}>
                                        <ImageBackground
                                            source={require('../assets/images/user-profile-2.jpg')}
                                            style={{ width: 50, height: 50 }}
                                            imageStyle={{ borderRadius: 50 }}
                                        />
                                        <TouchableOpacity style={{
                                            // backgroundColor: '#AD40AF',
                                            width: '90%',
                                        }}>
                                            <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black', fontWeight: 'bold' }}>
                                                Ngân
                                            </Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
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
            <ModalPost
                opacityModal={opacityModal}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setOpacityModal={setOpacityModal}

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