import React from "react";
import { Image, StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { MEDIA_URL, individuals_URL } from "../../../config";
const { height: WINDOW_HEIGHT } = Dimensions.get("window");
import { Divider } from "react-native-paper";
import PlayerSound from "./PlayerSound";
import PlayerVideo from "./PlayerVideo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function MediaPlayer({ data, isActive }) {

  const bottomTabHeight = 50/* useBottomTabBarHeight(); */
  const statusBarHeight = StatusBar.currentHeight || 0;
  const heightView = WINDOW_HEIGHT - bottomTabHeight - statusBarHeight;
  const getIPFSLink = (hash) => {
    const gateway = MEDIA_URL;
    return MEDIA_URL + hash;
  };
  return (
    <View
      style={[
        styles.container,
        { height: WINDOW_HEIGHT - bottomTabHeight - statusBarHeight },
      ]}
    >
      <StatusBar barStyle={"light-content"} />
      {
        data.type.startsWith('video') ?
          <PlayerVideo uri={getIPFSLink(data.media)} isActive={isActive} style={styles.video} />
          :
          data.type.startsWith('image') ?
            <ImageBackground style={styles.video} source={{ uri: getIPFSLink(data.media) }} />
            :
            <PlayerSound uri={getIPFSLink(data.media)} isActive={isActive} />
      }
      <View style={styles.bottomSection}>
        <View style={styles.bottomLeftSection}>
          <Text style={styles.channelName}>{data.firstName ? `${data.firstName} ${data.lastName}` : "Văn Thiên"}</Text>
          <Text style={styles.caption}>{data.description}</Text>
        </View>
        <View style={styles.bottomRightSection}>
          <Image
            source={require("../../../assets/images/posts/floating-music-note.png")}
            style={[styles.floatingMusicNote]}
          />
          <Image
            source={require("../../../assets/images/posts/disc.png")}
            style={[styles.musicDisc]}
          />
        </View>
      </View>

      <View style={styles.verticalBar}>
        <View style={[styles.verticalBarItem, styles.avatarContainer]}>
          <Image
            style={styles.avatar}
            source={data.avatar ? {
              uri: individuals_URL + data.avatar,
            } : require('../../../assets/images/image-user.jpg')}
          />
          <View style={styles.followButton}>
            <Image
              source={require("../../../assets/images/posts/plus-button.png")}
              style={styles.followIcon}
            />
          </View>
        </View>
        <View style={styles.verticalBarItem}>
          <TouchableOpacity
            style={styles.verticalBarIcon}
          >
            <Ionicons
              name={'heart'}
              size={36}
              color={data?.isLove ? 'red' : '#fff'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.verticalBarItem}>
          <TouchableOpacity
            style={styles.verticalBarIcon}
          >
            <Ionicons
              name={'chatbubble-ellipses-sharp'}
              size={36}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.verticalBarItem}>
          <TouchableOpacity
            style={styles.verticalBarIcon}

          >
            <MaterialIcons
              name="reply"
              size={36}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftSection: {
    flex: 4,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  channelName: {
    color: "white",
    fontWeight: "bold",
  },
  caption: {
    color: "white",
    marginVertical: 8,
  },
  musicNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  musicNameIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  musicName: {
    color: "white",
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: "absolute",
    right: 8,
    bottom: 72,
  },
  verticalBarItem: {
    marginBottom: 24,
    alignItems: "center",
  },
  verticalBarIcon: {
    width: 36,
    height: 36,
  },
  verticalBarText: {
    color: "white",
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: "absolute",
    bottom: -8,
  },
  followIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: "absolute",
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: "white",
  },
});
