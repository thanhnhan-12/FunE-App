import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { Divider, Text } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker'
import Preview from './Preview';
const MediaPicker = ({ setMedias, medias }) => {
  const pickerTypeActionSheetRef = useRef(null);
  // const [mediaSource, setMediaSource] = useState(null);
  const handleOpenActionSheet = () => {
    pickerTypeActionSheetRef.current?.setModalVisible(true);
  };
  const onPressPhotoLibrary = () => {
    pickerTypeActionSheetRef?.current?.hide(null)
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
    pickerTypeActionSheetRef?.current?.hide(null)

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
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <TouchableOpacity style={{ borderRadius: 4, width: 120, backgroundColor: '#3399ff', padding: 10 }} onPress={handleOpenActionSheet}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Upload Media</Text>
        </TouchableOpacity>
      </View>

      <ActionSheet
        ref={pickerTypeActionSheetRef}
      >
        <View style={{ height: 150 }}>
          <Divider />
          <TouchableOpacity
            style={{ height: 70 }}
            onPress={onPressPhotoLibrary}>
            <Text
              style={{ padding: 20, textAlign: 'center' }}
            >
              Open Library
            </Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            style={{ height: 70 }}
            onPress={onPressCamera}>
            <Text
              style={{ padding: 20, textAlign: 'center' }}
            >
              Camera
            </Text>
          </TouchableOpacity>
          <Divider />
        </View>
      </ActionSheet>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {medias &&
          medias.map((file) => {
            return <Preview style={{ width: '90%', borderRadius: 10 }} key={file.fileName} file={file} />
          })
        }
      </View>
      {/* {errorMesasge !== undefined && <Text
        style={[
          Fonts.textRegular,
          Gutters.regularBMargin,
          { color: Colors.error },
        ]}
      >{validationErrorMessage}</Text>} */}
    </View>
  )
}

export default MediaPicker