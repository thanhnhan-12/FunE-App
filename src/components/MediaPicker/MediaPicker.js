import React, { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { Divider, Text } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker'
import DocumentPicker from 'react-native-document-picker';
import Preview from './Preview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert } from 'react-native';
const MediaPicker = ({ setMedias, medias }) => {
  const pickerTypeActionSheetRef = useRef(null);
  const handleOpenActionSheet = () => {
    pickerTypeActionSheetRef.current?.setModalVisible(true);
  };

  const onPressCamera = async () => {
    pickerTypeActionSheetRef?.current?.hide(null)

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
        const file = response.assets[0]
        setMedias([...medias, { name: file.fileName, type: file.type, uri: file.uri }])
      }
    })
  }
  const onPressLibrary = async () => {
    const options = {
      mediaType: 'mixed',
      selectionLimit: 5,
      allowMultiSelection: true,
      type: [DocumentPicker.types.images, DocumentPicker.types.audio, DocumentPicker.types.video]
    };
    pickerTypeActionSheetRef?.current?.hide(null)
    try {
      const result = await DocumentPicker.pickMultiple(options);
      const files = result.map((file) => ({ name: file.type.startsWith('audio') ? file.name.trim() + '.mp3' : file.name, type: file.type, uri: file.uri }));
      setMedias([...medias, ...files])
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Nếu người dùng không chọn file nào thì sẽ trả về lỗi cancel.
        console.log('User cancelled the picker');
      } else {
        console.log('Unknown Error: ', JSON.stringify(err));
        throw err;
      }
    }
  }
  return (
    <View style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <ActionSheet
        ref={pickerTypeActionSheetRef}
      >
        <View style={{ height: 150 }}>
          <Divider />
          <TouchableOpacity
            style={{ height: 70 }}
            onPress={onPressLibrary}>
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
      <View style={{
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      }}>

        {medias &&
          medias.map((file, index) => {
            return (
              <Preview
                onPress={() => {
                  Alert.alert('Confirm', 'Delete this media !', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK', onPress: () => {
                        const newMedias = [...medias];
                        newMedias.splice(index, 1);
                        setMedias(newMedias)
                      }
                    },
                  ])
                }}
                key={file.name + index}
                style={{
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: '#841584',
                  borderRadius: 4,
                  margin: 4,
                  width: '30%',
                  height: 100
                }}
                file={file} />)

          })
        }
        <TouchableOpacity style={{
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
          borderStyle: 'solid',
          borderColor: '#777',
          borderWidth: 1,
          margin: 4,
          width: '30%',
          height: 100
        }}
          onPress={() => {
            if (medias) {
              if (medias.length >= 5) {
                Alert.alert("only 5 medias one time!");
                return;
              }
              handleOpenActionSheet();
            }

          }}>
          <Ionicons
            name="add-outline"
            size={40}
            color="#777"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MediaPicker