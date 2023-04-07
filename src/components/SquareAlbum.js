import { View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { MEDIA_URL } from '../config';
import Video from 'react-native-video';
import { Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        width: 110,
        height: 110,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    box: {
        opacity: 0.8,
        width: 50,
        height: 48,
        margin: 2,
        borderWidth: 1
    },
    boxone: {
        opacity: 0.8,
        width: 110,
        height: 100,
        margin: 2,
        borderWidth: 1
    },
    boxtwo: {
        opacity: 0.8,
        width: 50,
        height: 100,
        margin: 2,
        borderWidth: 1
    },
});


const SquareAlbum = ({ onPress, data, key }) => {
    const getIPFSLink = (hash) => {
        return MEDIA_URL + hash;
    };

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress} key={key}>
                {data.medias.map((item, index) => (
                    <View style={{}}>
                        {
                            data.medias.length === 1 &&
                            <View style={styles.boxone}>

                                <>
                                    {
                                        item.type === "image/jpeg" &&
                                        <ImageBackground source={{ uri: getIPFSLink(item.media) }} style={{ width: 105, height: 100 }}
                                        />
                                    }
                                    {
                                        item.type === "video/mp4" &&
                                        <Video source={{ uri: getIPFSLink(item.media) }} style={{ width: 105, height: 100 }}
                                            muted={true}
                                        />
                                    }
                                    {
                                        item.type === "audio/mpeg" &&
                                        <ImageBackground source={{ uri: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg" }}
                                            style={{ width: 105, height: 100 }}
                                        />
                                    }
                                </>
                            </View>

                        }
                        {
                            data.medias.length === 2 &&
                            <View style={styles.boxtwo}>

                                <>
                                    {
                                        item.type === "image/jpeg" &&
                                        <ImageBackground source={{ uri: getIPFSLink(item.media) }} style={{ width: 50, height: 100 }}
                                        />
                                    }
                                    {
                                        item.type === "video/mp4" &&
                                        <Video source={{ uri: getIPFSLink(item.media) }} style={{ width: 50, height: 100 }}
                                            muted={true}
                                        />
                                    }
                                    {
                                        item.type === "audio/mpeg" &&
                                        <ImageBackground source={{ uri: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg" }}
                                            style={{ width: 50, height: 100 }}
                                        />
                                    }
                                </>

                            </View>

                        }
                        {
                            data.medias.length > 2 &&
                            <View style={styles.box}>

                                <>
                                    {
                                        item.type === "image/jpeg" &&
                                        <ImageBackground source={{ uri: getIPFSLink(item.media) }} style={{ width: 50, height: 47 }}
                                        />
                                    }
                                    {
                                        item.type === "video/mp4" &&
                                        <Video source={{ uri: getIPFSLink(item.media) }} style={{ width: 50, height: 47 }}
                                            muted={true}
                                        />
                                    }
                                    {
                                        item.type === "audio/mpeg" &&
                                        <ImageBackground source={{ uri: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg" }}
                                            style={{ width: 50, height: 47 }}
                                        />
                                    }
                                </>

                            </View>

                        }
                    </View>
                ))}
            </TouchableOpacity>
            <View style={{ marginLeft: 5 }}>
                <Text>{data.description}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons
                        name="eye"
                        size={20}
                        color="black"
                    />
                    <Text style={{ marginLeft: 5 }}>(8)</Text>
                </View>
            </View>
        </View>
    );
};

export default SquareAlbum;