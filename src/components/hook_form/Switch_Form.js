import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
const Switch_Form = ({ control, name, defaultValue, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value }, fieldState: { invalid, isTouched, isDirty, error } }) => (
          <View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={value ? '#ec5990' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                onChange(!value)
              }}
              value={value}
            />
            <Text style={{ color: '#ef4146' }}>{error ? error.message : null}</Text>
          </View>

        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
  label: {
    marginRight: 10,
    marginBottom: 15
  },
});

export default Switch_Form;