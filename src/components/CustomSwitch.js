import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  icon1,
  icon2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 44,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#AD40AF',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          // backgroundColor: getSelectionMode == 1 ? '#AD40AF' : 'white',
          // borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            // color: getSelectionMode == 1 ? 'white' : '#AD40AF',
            // fontSize: 14,
            // fontFamily: 'Roboto-Medium',
            borderBottomWidth: getSelectionMode == 1 ? 3 : 0,
          }}>
          {option1}
          {icon1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          // backgroundColor: getSelectionMode == 2 ? '#AD40AF' : 'white',
          // borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            // color: getSelectionMode == 2 ? 'white' : '#AD40AF',
            // fontSize: 14,
            // fontFamily: 'Roboto-Medium',
            borderBottomWidth: getSelectionMode == 2 ? 3 : 0,
          }}>
          {option2}
          {icon2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
