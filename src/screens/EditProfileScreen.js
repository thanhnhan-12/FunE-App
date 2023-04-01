import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, TextInput, Alert, Image } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from '../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Preview from '../components/MediaPicker/Preview';
import * as ImagePicker from 'react-native-image-picker';
import Photo from '../components/MediaPicker/Photo';
import { useForm } from "react-hook-form";
import { userApi } from '../clients/user_api';
import { objToForm } from '../functions';
import { IP_CONFIG } from '@env';
import Header from '../components/Header';


const EditProfileScreen = ({ navigation }) => {
    const [medias, setMedias] = useState([]);
    const [photo, setPhoto] = useState([]);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState(false);
    const [background, setBackground] = useState(false);
    const [email, setEmail] = useState(false);
    const [note, setNote] = useState(false);
    const [dobLabel, setDobLabel] = useState('Date of Birth');
    const [gender, setGender] = useState('Gender');
    const { control, handleSubmit } = useForm();
    const id_user = userInfo.id;
    const backgroundIndividual = { uri: `http://${IP_CONFIG}:3000/individuals/${userInfo.background}` };
    const imageIndividual = userInfo.image ? { uri: `http://${IP_CONFIG}:3000/individuals/${userInfo.image}` } : require('../assets/images/image-user.jpg');

    useEffect(() => {
        async function fetchData() {
            setDescription(userInfo.description);
            setEmail(userInfo.email);
            // setPhoto(userInfo.image);
            // setMedias(userInfo.background);
            setDobLabel(userInfo.birthday);
            setGender(userInfo.gender);
            setNote(userInfo.note);
            setBackground(userInfo.background);
        }
        fetchData();

    }, [])

    const onSubmit = async () => {
        const data = { id_user, description, email, dobLabel, gender, note };
        const formData = new FormData();
        objToForm(data, formData);
        if (medias && medias.length > 0) {
            const media = medias[0];
            const file = {
                name: media.fileName,
                type: media.type,
                uri: media.uri
            }
            formData.append('media', file);
        }
        if (photo && photo.length > 0) {
            const imageIndi = photo[0];
            const file = {
                name: imageIndi.fileName,
                type: imageIndi.type,
                uri: imageIndi.uri
            }
            formData.append('imageIndi', file);
        }

        const result = await userApi.updateUser(formData);
        const userById = await userApi.getUserByID(id_user);
        setUserInfo(userById.users)
        console.log(userInfo);
        if (result.message) {
            Alert.alert("Update succeed!");
        }
        else {
            Alert.alert("Update faided!");
        }

    };

    const onPressPhotoLibrary = () => {
        const options = {
            title: 'Select Media',
            mediaType: 'mixed',
            quality: 1,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage)
            } else {
                // console.log(response.assets);
                // setMediaSource(response.assets)
                setMedias(response.assets)
                // Do something with the captured file
            }
        });
    }
    const onPressCamera = async () => {

        const options = {
            title: 'Select Media',
            mediaType: 'mixed',
            quality: 1
        }
        // var options = {
        //   mediaType: 'photo' as ImagePicker.MediaType,
        // }
        ImagePicker.launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage)
            } else {
                // setMediaSource(response.assets)
                setMedias(response.assets)
                // Do something with the captured file
            }
        })
    }

    const onPressPhotoLibraryPR = () => {
        const options = {
            title: 'Select Media',
            mediaType: 'mixed',
            quality: 1,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage)
            } else {
                // console.log(response.assets);
                // setMediaSource(response.assets)
                setPhoto(response.assets)
                // Do something with the captured file
            }
        });
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <Header
                title={"Edit Profile"}
                trueReturn
                navigation={navigation}
            />
            <ScrollView >
                <SafeAreaView
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                    }}>
                    <TouchableOpacity onPress={onPressPhotoLibraryPR}>
                        {
                            // console.log("Media", medias)
                            photo && photo.length > 0 ?
                                photo.map((file) => {
                                    return <Photo key={file.fileName} file={file} />
                                })
                                :
                                <ImageBackground
                                    source={imageIndividual}
                                    style={{ width: 80, height: 80 }}
                                    imageStyle={{ borderRadius: 80 }}
                                />
                        }

                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginBottom: 5,
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Update Cover Media
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            justifyContent: 'space-between',
                            borderStyle: 'dotted',
                            borderColor: 'black',
                            borderWidth: 1,
                        }}
                    >
                        <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}>
                            <Ionicons name="cloud-upload-outline" color="black" size={60} />
                        </TouchableOpacity>
                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    fontFamily: 'Roboto-MediumItalic',
                                }}>
                                Let's upload photos and videos
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#71B36F',
                                    padding: 20,
                                    borderRadius: 10,
                                    marginBottom: 20,
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        fontSize: 16,
                                        color: '#fff',
                                    }}
                                    onPress={onPressPhotoLibrary}
                                >
                                    Open Galary
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#7DAEB8',
                                    padding: 20,
                                    borderRadius: 10,
                                    marginBottom: 20,
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        fontSize: 16,
                                        color: '#fff',
                                    }}
                                    onPress={onPressCamera}
                                >
                                    Open Camera
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {
                                // console.log("Media", medias)
                                medias && medias.length > 0 ?
                                    medias.map((file) => {
                                        return <Preview style={{ width: '90%', height: 250, borderRadius: 10 }} key={file.fileName} file={file} />
                                    })
                                    :
                                    userInfo && userInfo.background && userInfo.background.length > 0 &&
                                    <Image source={backgroundIndividual} style={{ width: "100%", height: 250 }} />
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        // backgroundColor: '#AD40AF',
                        padding: 10,
                        width: '95%',
                        marginBottom: 5,
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontFamily: 'Roboto-MediumItalic',
                            }}>
                            Add description
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Descripton"
                        onChangeText={text => setDescription(text)}
                        value={description}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            padding: 20,
                            paddingTop: 10,
                            width: '90%',
                            borderRadius: 10,
                            marginBottom: 5,
                            borderColor: '#545E61',
                            borderWidth: 1,
                            height: 120,
                            verticalAlign: 'top'
                        }}
                    />

                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            marginTop: 10,
                            padding: 20,
                            width: '90%',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderWidth: 1,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <MaterialCommunityIcons
                                name="email-outline"
                                size={26}
                                color="black"
                                style={{ marginRight: 10 }}
                            />
                            <TextInput
                                placeholder="Email"
                                // onChangeText={text => setEmail(text)}
                                value={email}
                                style={{ flex: 1, paddingVertical: 0, width: '100%' }}
                            />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingBottom: 8,
                                }}>
                                <Ionicons
                                    name="calendar-outline"
                                    size={26}
                                    color="black"
                                    style={{ marginRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => setOpen(true)}>
                                    <Text style={{ color: '#666', marginLeft: 5, marginTop: 5 }}>
                                        {dobLabel}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                mode={'date'}
                                maximumDate={new Date('2005-01-01')}
                                minimumDate={new Date('1980-01-01')}
                                onConfirm={date => {
                                    setOpen(false);
                                    setDate(date);
                                    setDobLabel(date.toDateString());
                                }}
                                onCancel={() => {
                                    setOpen(false);
                                }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 30
                        }}>
                            <MaterialCommunityIcons
                                name="gender-male-female"
                                size={26}
                                color="black"
                                style={{ marginRight: 0 }}
                            />
                            <View style={{
                                flex: 1,
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <RNPickerSelect
                                    onValueChange={(g) => setGender(g)}
                                    value={gender}

                                    items={[
                                        { label: "Male", value: "Male" },
                                        { label: "Female", value: "Female" },
                                    ]}

                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: '#AD40AF',
                            padding: 20,
                            width: '90%',
                            marginBottom: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: 'black',
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                            <TextInput
                                placeholder="Note"
                                value={note}
                                onChangeText={text => setNote(text)}
                                style={{ flex: 1, paddingVertical: 0, width: '100%' }}
                            />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={{
                            backgroundColor: '#D62965',
                            padding: 20,
                            borderRadius: 10,
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
                            Update
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfileScreen;