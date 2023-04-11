import React, { useState } from 'react'
import VideoPlayer from 'react-native-video-controls';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const PlayerVideo = ({ style, isActive, uri }) => {
  const [viewControl, setViewControl] = useState(false);
  const [playing, setPlaying] = useState(!isActive);
  return (
    <View style={styles.container}>
      <View style={styles.playBtn}>
        {
          viewControl && <Ionicons
            name={playing ? 'ios-pause-outline' : 'ios-play-outline'}
            size={36}
            color={'#fff'}
          />
        }
      </View>
      <VideoPlayer
        onHideControls={() => {
          setViewControl(false)
        }}
        onShowControls={
          () => {
            console.log("view controll")
            setViewControl(true)
          }
        }
        onPause={
          () => {
            setPlaying(false)
          }

        }
        onPlay={() => {
          setPlaying(true)
        }}
        showOnStart={false}
        paused={!isActive}
        tapAnywhereToPause={true}
        style={style}
        resizeMode="contain"
        source={{ uri }}
        disableFullscreen
        disableVolume
        disablePlayPause
        disableBack
        seekBarStyle={styles.seekBar}
        repeat={true}
      />
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  playBtn: {
    zIndex: 2,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 },
    { translateY: -25 }]
  },
  seekBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: '#fff',
  },
});
export default PlayerVideo