import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import { Button } from 'react-native-paper';
import Input_Form from '../../components/hook_form/Input_Form';
import { objToForm } from '../../functions';
import { AuthContext } from '../../context/AuthContext';
import * as ImagePicker from 'react-native-image-picker';
import { Modal } from '../../components/Modal';
import { useNavigation } from '@react-navigation/native';
import Media_Form from '../../components/hook_form/Media_Form';
import { postRoomApi } from '../../clients/post_room_api';
const CreatePostModalRoom = ({ children }) => {
    const navigation = useNavigation();
    const { userInfo, dataPost } = useContext(AuthContext);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const id_user = userInfo.id;
    const idRoom = dataPost;

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
                // console.log(response.assets);
                // setMediaSource(response.assets)
                setMedias(response.assets)
                // Do something with the captured file
            }
        });
    }
    const onSubmit = async (data) => {
        const { medias, ...restData } = data;
        const payload = { ...restData, id_user, idRoom }
        const formData = new FormData();
        objToForm(payload, formData)

        if (medias) {
            for (let i = 0; i < medias.length; i++) {
                formData.append('medias', medias[i]);
            }
        }
        const result = await postRoomApi.createPost(formData);
        if (result.message) {
            setIsVisibleModal(false)
            Alert.alert("create product success!");
        }
        else {
            Alert.alert("create product fail!");
        }
    };

    const styles = StyleSheet.create({
        button: {
            color: "#841584",
            marginTop: 40,
            padding: 5,
            backgroundColor: '#ec5990',
            borderRadius: 10,
            marginBottom: 100
        }
    })
    return <SafeAreaView style={{ width: '100%' }}>
        <TouchableOpacity style={{
            alignItems: 'center',
            textAlign: 'center',
            padding: 10,
            width: '60%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: "100%"
        }}
            onPress={() => {
                setIsVisibleModal((prev) => !prev)
            }}
        >
            {children}
        </TouchableOpacity>
        <Modal
            setVisible={setIsVisibleModal}
            isVisible={isVisibleModal}>
            <Modal.Container>
                <ScrollView>
                    <Modal.Header setVisible={setIsVisibleModal} isCloseIcon />
                    <Modal.Body>
                        <View>
                            <Input_Form
                                name='description'
                                label='Post description'
                                required
                                control={control}
                            />
                            <View style={{
                                // backgroundColor: '#AD40AF',
                                padding: 10,
                                width: '100%',
                                borderRadius: 10,
                                marginBottom: 5,
                                justifyContent: 'space-between',
                                borderStyle: 'dotted',
                                borderColor: 'black',
                                borderWidth: 1,
                                alignItems: 'center',
                            }}>
                                <Media_Form
                                    defaultValue={[]}
                                    required
                                    control={control}
                                    label='Media'
                                    name='medias' />
                            </View>

                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={handleSubmit(onSubmit)}>
                            Post
                        </Button>
                    </Modal.Footer>
                </ScrollView>

            </Modal.Container>
        </Modal>


    </SafeAreaView>

}
export default CreatePostModalRoom
