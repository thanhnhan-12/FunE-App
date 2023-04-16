import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import { GiftedChat } from 'react-native-gifted-chat';
import { AuthContext } from '../context/AuthContext';
import { IP_CONFIG } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalBagLiveStream from './modal/ModalBagLiveStream';

const LiveStream = ({ navigation }) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [countLike, setCountLike] = useState(0);
    const [like, setLike] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const imageIndividual = { uri: `http://${IP_CONFIG}:3000/individuals/${userInfo.image}` };
    const handleOnClickLike = () => {
        if (like == true) {
            setLike(false);
            setCountLike(countLike - 1)
        } else {
            setLike(true);
            setCountLike(countLike + 1)
        }
    }
    useEffect(() => {
        const init = async () => {
            const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);

            const pc = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            });
            stream.getTracks().forEach((track) => {
                pc.addTrack(track, stream);
            });
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    // send the candidate to the other peer
                }
            };
            pc.onaddstream = (event) => {
                setRemoteStream(event.stream);
            };
            setPeerConnection(pc);
        };

        init();
    }, []);

    const onSend = (messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        // send the message to the other peer
    };
    const handleEndLive = () => {
        Alert.alert(
            'Agree',
            'Are you sure to leaven Live Channel?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => agreeEnd(),
                },
            ],
        );
    }

    const handleOnClickCloseModal = (modalVisible, setModalVisible) => {
        setModalVisible(!modalVisible);
    }

    const agreeEnd = () => {
        Alert.alert("The live stream has ended");
        navigation.navigate("Home");
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{
                    position: 'absolute',
                    top: 30,
                    left: 0,
                    right: 0,
                    zIndex: 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    width: "100%",
                }}>
                    <View>
                        <Text style={styles.titleo}>Live Stream</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleEndLive()}
                    >
                        <Text style={styles.titlet}>End Live</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    position: 'absolute',
                    top: 30,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: "row",

                }}>
                    <View style={{ backgroundColor: '#333636', flexDirection: "row", padding: 8, borderRadius: 10 }}>
                        <Ionicons
                            name="eye"
                            size={20}
                            color="white"
                            style={{ marginRight: 10 }}
                        />
                        <Text style={{ color: 'white' }}>1</Text>
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    top: 200,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    width: "100%"
                }}>
                    <TouchableOpacity style={{ alignItems: 'center' }}
                        onPress={() => handleOnClickCloseModal(modalVisible, setModalVisible)}
                    >
                        <MaterialIcons
                            name="shopping-bag"
                            size={35}
                            color="#72D959"
                        />
                        <Text style={{ color: 'white' }}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    position: 'absolute',
                    top: 260,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    width: "100%"
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons
                            name="share-social"
                            size={35}
                            color="#0FCFD9"
                        />
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    top: 320,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    width: "100%"
                }}>

                    <TouchableOpacity style={{ alignItems: 'center' }}
                        onPress={() => handleOnClickLike()}
                    >
                        {like && like === true ?
                            <Ionicons
                                name="heart"
                                size={35}
                                color="red"
                            />
                            :
                            <Ionicons
                                name="heart"
                                size={35}
                                color="white"
                            />
                        }
                        <Text style={{ color: 'white' }}>{countLike}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    position: 'absolute',
                    top: 380,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    width: "100%"
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Entypo
                            name="price-tag"
                            size={35}
                            color="#0F63D9"
                        />
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    top: 440,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    width: "100%"
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons
                            name="gift"
                            size={35}
                            color="#C8D90F"
                        />
                    </View>
                </View>
                {
                    localStream && (
                        <RTCView streamURL={localStream.toURL()} style={styles.localVideo} objectFit="cover" />
                    )
                }
                {
                    remoteStream && (
                        <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} objectFit="cover" />
                    )
                }
                <View style={{ width: '100%', height: '100%' }}>
                    <GiftedChat
                        style={{ flex: 1 }}
                        messages={messages}
                        onSend={onSend}
                        user={{
                            _id: userInfo.id,
                            name: userInfo.firstName + ' ' + userInfo.lastName,
                            avatar: imageIndividual
                        }}
                        placeholder="Type your message here..."
                        renderAvatar={(props) => {
                            return (
                                <View style={{ backgroundColor: 'lightgray', borderRadius: 20, width: 40, height: 40 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', lineHeight: 40 }}>{props.user.name.charAt(0)}</Text>
                                </View>
                            )
                        }}
                        renderUsernameOnMessage={true}
                    />
                </View>
            </View >

            <ModalBagLiveStream
                navigation={navigation}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleo: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 16,
        color: "yellow",
    },
    titlet: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 16,
        color: "red",
    },
    localVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 50,
        right: 0,
    },
    remoteVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 50,
        right: 0,
    },
    avatarContainer: {
        marginRight: 50,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});

export default LiveStream;