import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import MediaPicker from '../MediaPicker/MediaPicker';
const Media_Form = ({ control, name, label, required, defaultValue }) => {

  const rules = {};
  if (required) {
    rules.required = "This field is required!"
  }

  return (
    <View style={{ width: '100%' }}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState: { invalid, isTouched, isDirty, error } }) => {
          return <View>
            <MediaPicker
              medias={value}
              setMedias={onChange}
            />
            <Text style={{ color: '#ef4146' }}>{error ? error.message : null}</Text>
          </View>
        }}

        rules={rules}
      />
    </View>
  )
}

export default Media_Form