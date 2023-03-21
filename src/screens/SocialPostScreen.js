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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';

import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
    const { dataPost } = useContext(AuthContext);
    const [comment, setComment] = useState(null);
    const [like, setLike] = useState(false);
    const [countLike, setCountLike] = useState(0);
    const handleOnClickLike = () => {
        if (like == true) {
            setLike(false);
            setCountLike(countLike - 1)
        } else {
            setLike(true);
            setCountLike(countLike + 1)
        }
    }
    console.log(dataPost);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 15 }}>
                <TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        borderRadius: 20
                    }}>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={require("../assets/images/Altos-Odyssey.jpeg")}
                                style={{
                                    width: 300,
                                    height: 270,
                                    borderRadius: 10,
                                    marginTop: 10,
                                    marginBottom: 20,
                                    marginLeft: 20,
                                    marginRight: 20
                                }}
                            />
                            <TouchableOpacity
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
                                        {dataPost.title}
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
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <MaterialCommunityIcons name="comment-text-multiple" size={25} color="#33CC00" />
                    <TextInput
                        placeholder="Say something..."
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
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    )
}

export default HomeScreen;