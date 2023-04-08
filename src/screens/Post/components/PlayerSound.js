import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');


const PlayerSound = ({ uri, isActive }) => {
  const audio = new Sound(
    uri,
    null,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    },)
  const [playing, setPlaying] = useState();
  const play = () => {
    setPlaying(true);
    audio.play(success => {
      if (success) {
        setPlaying(false);
        console.log('successfully finished playing');
      } else {
        setPlaying(false);
        console.log('playback failed due to audio decoding errors');
      }
    })
  }
  const pause = () => {
    audio.pause();
    setPlaying(false);
  }
  useEffect(() => {
    audio.setVolume(1);
    if (isActive) { play() }
    else pause()
    return () => {
      audio.release();
    };
  }, [uri]);
  const playPause = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      audio.play(success => {
        if (success) {
          setPlaying(false);
          console.log('successfully finished playing');
        } else {
          setPlaying(false);
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playBtn} onPress={playPause}>
        <Ionicons
          name={!playing ? 'volume-mute-outline' : 'volume-high-sharp'}
          size={36}
          color={'#fff'}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    width: '100%',
  },
  playBtn: {
    padding: 20,
  },
});
export default PlayerSound;