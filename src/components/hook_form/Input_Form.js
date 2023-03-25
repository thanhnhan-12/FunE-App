import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Controller } from "react-hook-form";

const Input_Form = ({ control, name, label, required }) => {

  const styles = StyleSheet.create({
    input: {
      backgroundColor: 'white',
      height: 40,
      padding: 10,
      borderRadius: 4,
    },
    label: {
      margin: 10,
      marginLeft: 0,
    },
  })
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name={name}
        rules={{ required: required }}
      />
    </View>
  )
}

export default Input_Form