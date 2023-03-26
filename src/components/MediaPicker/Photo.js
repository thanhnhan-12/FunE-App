import React from 'react'
import { View, ImageBackground } from 'react-native'
import Video from 'react-native-video';
const Photo = ({ style, file, onDeleteImage }) => {
    const { type, uri } = file
    return (
        <View style={style}>
            {
                type.startsWith('image') ?
                    uri && <ImageBackground source={{ uri }} style={{ width: 80, height: 80 }}
                        imageStyle={{ borderRadius: 80 }} />
                    : uri && <Video source={{ uri }} style={{ width: 80, height: 80 }}
                        imageStyle={{ borderRadius: 80 }} controls={true} />
            }
        </View>
    )
}

export default Photo