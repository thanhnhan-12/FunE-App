import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ImageBackground
} from 'react-native';
import { useRoute } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import Video from 'react-native-video';
import { AuthContext } from '../context/AuthContext';
import Carousel from 'react-native-snap-carousel';
import { MEDIA_URL, individuals_URL } from '../config';
import { commentRoomApi } from '../clients/comment_room_api';
import PlayerSound from "./Post/components/PlayerSound";

const HomeScreen = ({ navigation }) => {
    const route = useRoute();
    const dataPost = route.params.data;
    const [comment, setComment] = useState(null);
    const [like, setLike] = useState(false);
    const [post, setPost] = useState([]);
    const [userComment, setUserComment] = useState([]);
    const [countLike, setCountLike] = useState(7);
    const { userInfo } = useContext(AuthContext);
    const id_user = userInfo.id;

    const handleOnClickLike = () => {
        if (like == true) {
            setLike(false);
            setCountLike(countLike - 1)
        } else {
            setLike(true);
            setCountLike(countLike + 1)
        }
    }
    const idPost = dataPost.id;
    const getIPFSLink = (hash) => {
        return MEDIA_URL + hash;
    };
    const getAvatar = (hash) => {
        return individuals_URL + hash;
    }
    _renderItem = ({ item, index }) => {
        if (item.type === 'image/jpeg') {
            return (
                <View style={styles.slide}>
                    <Image source={{ uri: getIPFSLink(item.media) }} style={styles.image} />
                </View>
            );
        } else if (item.type === 'video/mp4') {
            return (
                <View style={styles.slide}>
                    <Video source={{ uri: getIPFSLink(item.media) }} style={styles.video} />
                </View>
            );
        } else if (item.type === 'audio/mpeg') {
            return (
                <View style={styles.slide}>
                    <PlayerSound uri={getIPFSLink(item.media)} style={styles.audio} />
                </View>
            );
        }
    };

    const handleComment = async () => {
        if (comment.length > 0) {
            const result = await commentRoomApi.createComment({ idPost, id_user, comment });
            setComment('');
        }
    }

    useEffect(() => {
        async function fetchData() {
            setPost(dataPost);
            const result = await commentRoomApi.getsComment({ idPost });
            setUserComment(result.data)
        }
        fetchData();
    }, [comment])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
            <Header
                title={"Post"}
                trueReturn
                navigation={navigation}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 15 }}>
                <View>
                    <View style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        borderRadius: 20
                    }}>
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                            }}>
                            <Carousel
                                data={dataPost.medias}
                                renderItem={this._renderItem}
                                sliderWidth={300}
                                itemWidth={400}
                                loop={true}
                            />
                            {/* <SwiperMedia item={dataPost.medias} /> */}
                            {/* <Image
                                source={{ uri: getIPFSLink(dataPost.medias[0].media) }}
                                style={{
                                    width: 300,
                                    height: 270,
                                    borderRadius: 10,
                                    marginTop: 10,
                                    marginBottom: 20,
                                    marginLeft: 20,
                                    marginRight: 20
                                }}
                            /> */}
                            <View
                                style={{
                                    // backgroundColor: '#AD40AF',
                                    padding: 20,
                                    width: '90%',
                                    borderRadius: 10,
                                    marginBottom: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontFamily: 'Roboto-MediumItalic',
                                        }}>
                                        {dataPost.description}
                                    </Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity onPress={() => handleOnClickLike()}>
                                        {like && like === true ?
                                            <Ionicons name="heart" size={25} color="#D62965" />
                                            :
                                            <Ionicons name="heart-outline" size={25} color="#D62965" />
                                        }
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            backgroundColor: '#CF4071',
                                            color: 'white',
                                            textAlign: 'center',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: 7,
                                            paddingRight: 7,
                                            paddingTop: 3,
                                            borderRadius: 20,
                                            marginLeft: 6
                                        }}>
                                        {countLike}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <MaterialCommunityIcons name="comment-text-multiple" size={25} color="#33CC00" />
                    <TextInput
                        placeholder="Say something..."
                        value={comment}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            backgroundColor: '#FFFFFF',
                            color: 'black',
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 30,
                        }}
                        onChangeText={text => setComment(text)}
                    />

                    <TouchableOpacity
                        onPress={() => handleComment()}
                        style={{
                            backgroundColor: '#D62965',
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderRadius: 10,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: 16,
                                color: '#fff',
                            }}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, marginBottom: 40 }} >
                    {userComment && userComment.length > 0 &&
                        userComment.map((item, index) => (
                            <View key={index} style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: getAvatar(item.User.image) }}
                                    style={{ width: 70, height: 70, borderRadius: 70, marginRight: 10 }}

                                />
                                <View style={{ backgroundColor: 'white', width: "70%", borderRadius: 8, padding: 10 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.User.lastName} {item.User.firstName}</Text>
                                    <Text>{item.comment}</Text>
                                    <TouchableOpacity style={{ marginTop: 10 }}>
                                        <Text style={{ fontWeight: 600, color: "gray" }}>Reply</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    slide: {
        width: 300,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 400,
        resizeMode: 'cover',
    },
    video: {
        width: 300,
        height: 400,
    },
    audio: {
        width: 300,
        height: 400,
    },
});

export default HomeScreen;