import React from 'react'
import { View, ImageBackground } from 'react-native'
import Video from 'react-native-video';
const Preview = ({ style, file, onDeleteImage }) => {
  const { type, uri } = file
  // console.log("file in preview", file)
  // console.log("file.type", type)
  // console.log("file.uri", uri)
  return (
    <View style={style}>
      {
        type.startsWith('image') ?
          uri && <ImageBackground source={{ uri }} style={{ width: "100%", height: 250 }} />
          : uri && <Video source={{ uri }} style={{ width: '100%', height: 250 }} controls={true} />
      }
    </View>
  )
}

export default Preview