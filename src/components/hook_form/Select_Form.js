import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { Controller } from 'react-hook-form';
import { View, StyleSheet, Text } from 'react-native';

const Select_Form = ({ control, name, options, defaultValue, label, required }) => {
  const styles = StyleSheet.create({
    inputContainer: {
      borderWidth: 1,
      backgroundColor: 'white',
      height: 50
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
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { invalid, isTouched, isDirty, error } }) => (
          <View style={{ ...styles.inputContainer, borderColor: invalid ? '#ef4146' : '#ccc', borderRadius: 10 }}>
            <RNPickerSelect
              onValueChange={(value) => {
                onChange(value);
              }}
              value={value}
              items={options}
            />
            <Text style={{ color: '#ef4146' }}>{error ? error.message : null}</Text>
          </View>
        )}
      />
    </View>
  );
};
export default Select_Form
