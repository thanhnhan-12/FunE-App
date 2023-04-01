import React from 'react'
import { ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
const Preview = ({ style, file, onDeleteImage, onPress }) => {
  const { type, uri } = file
  return (
    uri &&
    <TouchableOpacity
      style={style}
      onPress={() => { onPress && onPress() }}
    >
      {
        type.startsWith('video') ?
          <Video source={{ uri }} style={{ width: '100%', height: '100%' }} controls={true} />
          :
          <ImageBackground source={type.startsWith('image') ? { uri } : require('../../assets/images/music-preview.png')} style={{ width: "100%", height: '100%' }} />
      }
    </TouchableOpacity>
  )
}

export default Preview