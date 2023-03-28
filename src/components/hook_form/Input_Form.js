import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
const Input_Form = ({ control, name, label, required, keyboardType }) => {

  const styles = StyleSheet.create({
    inputContainer: {
      borderWidth: 1
    },
    input: {
      backgroundColor: 'white',
      height: 40,
      padding: 10,
      borderRadius: 10,

      borderColor: '#ccc',
      borderWidth: 1,
    },
    label: {
      margin: 10,
      marginLeft: 0,
    },
  })
  const rules = {};
  if (required) {
    rules.required = "This field is required!"
  }
  return (
    <View style={{
    }}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { invalid, isTouched, isDirty, error } }) => {

          return <View>
            <View style={{ ...styles.inputContainer, borderColor: invalid ? '#ef4146' : 'white' }}>
              <TextInput
                keyboardType={keyboardType}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            </View>
            <Text style={{ color: '#ef4146' }}>{error ? error.message : null}</Text>
          </View>
        }}
        name={name}
        rules={rules}
      />
    </View>
  )
}

export default Input_Form