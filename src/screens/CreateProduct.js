import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MediaPicker from '../components/MediaPicker/MediaPicker';
import { View, Text, TextInput, Lab, StyleSheet, Alert, ScrollView } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import { Button } from 'react-native-paper';
import Input_Form from '../components/hook_form/Input_Form';
import { objToForm } from '../functions';
import { productApi } from '../clients/product_api';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import Select_Form from '../components/hook_form/Select_Form';
import { currency } from '../utils/model';
import Media_Form from '../components/hook_form/Media_Form';
import Switch_Form from '../components/hook_form/Switch_Form';


const CreateProduct = ({ navigation }) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [categories, setCategories] = useState([])
  const id_user = userInfo.id;

  const { register, reset, watch, setValue, control, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { medias, ...restData } = data
    console.log(data)
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
      // console.log("media", file)
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

  useEffect(() => {
    async function fetchData() {
      const result = await productApi.getCategories();
      // console.log(result)
      if (result.categories) {
        setCategories(result.categories);
      }
      else {
        Alert.alert("get category fail!");
      }
    }
    fetchData();

  }, [])
  return <SafeAreaView >
    {/* <MediaPicker
      medias={medias}
      setMedias={setMedias}
    /> */}
    <ScrollView >
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Media_Form
          control={control}
          required
          label='Media'
          name='medias' />
        <Input_Form
          name='name'
          label='Product Name'
          required
          control={control}

        />
        <Input_Form
          name='description'
          label='Description'
          control={control}
        />
        {categories && categories.length > 0 &&
          <Select_Form
            required
            control={control}
            name={'category'}
            options={categories}
            label={"Category"}
          />}
        <Input_Form
          name='pricing'
          label='Pricing'
          required
          control={control}
          keyboardType={"numeric"}
        />
        <Select_Form
          required
          control={control}
          name={'currency'}
          options={currency}
          label={"Currency"}
          defaultValue={'USD'}
        />
        <Input_Form
          name='stock'
          label='Stock'
          required
          control={control}
          keyboardType={"numeric"}
        />
        <Switch_Form
          name='is_public'
          label='Public This Product'
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
export default CreateProduct
