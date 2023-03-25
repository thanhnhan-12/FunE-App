import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MediaPicker from '../components/MediaPicker/MediaPicker';
import { View, Text, TextInput, Lab, StyleSheet, Alert } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import { Button } from 'react-native-paper';
import Input_Form from '../components/hook_form/Input_Form';
import { objToForm } from '../functions';
import { productApi } from '../clients/product_api';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';


const CreateProduct = ({ navigation }) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const id_user = userInfo.id;
  const [medias, setMedias] = useState();

  const { register, reset, watch, setValue, control, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const payload = { ...data, id_user }
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
      console.log("media", file)
    }

    const result = await productApi.createProduct(formData);
    if (result.message) {
      Alert.alert("create product success");
      navigation.navigate('Home')
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
      borderRadius: 4,
    }
  })
  return <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
    <MediaPicker
      medias={medias}
      setMedias={setMedias}
    />
    <View>
      <Input_Form
        name='name'
        label='Product Name'
        required
        control={control}
      />
      <Input_Form
        name='description'
        label='Description'
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
  </SafeAreaView>
}
export default CreateProduct
