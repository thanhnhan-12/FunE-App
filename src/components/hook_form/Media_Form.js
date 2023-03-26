import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import MediaPicker from '../MediaPicker/MediaPicker';
const Media_Form = ({ control, name, label, required }) => {

  const rules = {};
  if (required) {
    rules.required = "This field is required!"
  }

  return (
    <View style={{ borderWidth: 1, padding: 3, borderColor: '#3333' }}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { invalid, isTouched, isDirty, error } }) => {
          return <View>
            <MediaPicker
              medias={value}
              setMedias={onChange}
            />
            <Text style={{ color: '#ef4146' }}>{error ? error.message : null}</Text>
          </View>
        }}
        name={name}
        rules={rules}
      />
    </View>
  )
}

export default Media_Form