import React, { useState, useEffect } from 'react'
import { postApi } from '../../clients/post_api';
import VideoPlayer from './components/MediaPlayer';
import { FlatList, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const ScrollView = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const bottomTabHeight = /* useBottomTabBarHeight() ||  */50;
  const { height: WINDOW_HEIGHT } = Dimensions.get("window");
  async function fetchData(limit, offset) {
    const result = await postApi.getPosts({ limit, offset });
    if (result.posts) {
      setPosts((prev) => [...prev, ...result.posts]);
    }
    else {
      Alert.alert("get category fail!");
    }
  }
  useEffect(() => {
    fetchData(10, 0);
  }, [])
  const handleLoadMore = () => {
    const offset = posts.length;
    fetchData(10, offset);
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={posts}
        pagingEnabled
        renderItem={({ item, index }) => {
          {
            const { medias, id: id_post, description } = item;
            const firstMedia = medias[0];
            const { type, media, id_media, firstName, lastName, avatar } = firstMedia;

            return <VideoPlayer data={{ type, media, id_media, id_post, description, firstName, lastName, avatar }} isActive={activeVideoIndex === index} />
          }
        }}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight)
          );
          setActiveVideoIndex(index);
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // load more when the end is within half the visible length
        keyExtractor={(item) => item.medias[0].id_media}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  }
})


export default ScrollView