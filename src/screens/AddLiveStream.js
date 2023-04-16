import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import { Button } from 'react-native-paper';
import Input_Form from '../components/hook_form/Input_Form';
import { objToForm } from '../functions';
import { livestreamApi } from '../clients/livestream_api';
import { AuthContext } from '../context/AuthContext';
import Select_Form from '../components/hook_form/Select_Form';
import { currency } from '../utils/model';
import Switch_Form from '../components/hook_form/Switch_Form';
import Header from '../components/Header';
import * as ImagePicker from 'react-native-image-picker';
import Preview from '../components/MediaPicker/Preview';

const AddLiveStream = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [medias, setMedias] = useState([]);
    const id_user = userInfo.id;
    const { control, handleSubmit } = useForm();
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
                setMedias(response.assets)
            }
        });
    }
    const onPressCamera = async () => {

        const options = {
            title: 'Select Media',
            mediaType: 'mixed',
            quality: 1
        }
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
    const onSubmit = async (data) => {
        const { ...restData } = data
        const payload = { ...restData, id_user }
        const formData = new FormData();

        objToForm(payload, formData)

        if (medias) {
            const media = medias[0];
            const file = {
                name: media.fileName,
                type: media.type,
                uri: media.uri
            }
            formData.append('media', file);
        }

        const result = await livestreamApi.createLive(formData);
        if (result.message) {
            Alert.alert("Create Live Steam Succeed!");
            navigation.navigate("LiveStream");
        }
        else {
            Alert.alert("create product fail!");
        }
    };
    const styles = StyleSheet.create({
        button: {
            marginTop: 40,
            padding: 5,
            backgroundColor: '#ec5990',
            borderRadius: 10,
            marginBottom: 100
        }
    })

    return <SafeAreaView style={{ height: '100%' }}>
        <Header
            trueBell
            trueCart
            trueCoin
            title={"Upload Product"}
            trueReturn
            navigation={navigation}
        />
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={{ flex: 1, justifyContent: 'center', padding: 20, width: '100%' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>
                    Upload Cover Media
                </Text>
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
                        alignItems: 'center',
                        width: "100%"
                    }}
                >
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
                                marginRight: 20,
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
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {
                            medias && medias.length > 0 &&
                            medias.map((file) => {
                                return <Preview style={{ width: '90%', height: 250, borderRadius: 10 }} key={file.fileName} file={file} />
                            })
                        }
                    </View>
                </TouchableOpacity>
                <Input_Form
                    name='description'
                    label='Description'
                    control={control}
                    livestream
                />
                <Switch_Form
                    name='is_live_now'
                    label='LIVE NOW'
                    defaultValue={false}
                    required
                    control={control}
                />
                <Switch_Form
                    name='is_public'
                    label='Public Searchable'
                    defaultValue={false}
                    required
                    control={control}
                />
                <Switch_Form
                    name='is_public_dangerous'
                    label='Dangerous Good'
                    defaultValue={false}
                    required
                    control={control}
                />
                <Button
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                    textColor='white'
                >
                    Submit
                </Button>

            </View>
        </ScrollView>

    </SafeAreaView>
}
export default AddLiveStream
