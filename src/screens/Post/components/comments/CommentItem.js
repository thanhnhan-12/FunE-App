import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { individuals_URL } from '../../../../config';
import { AuthContext } from '../../../../context/AuthContext';
import { Avatar } from "react-native-paper";
import images from '../../../../assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CommentItem = () => {
  const { userInfo } = useContext(AuthContext);
  const imageIndividual = userInfo.image ? { uri: `${individuals_URL}${userInfo.image}` } : images.avatar;
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={46}
        source={imageIndividual}
        marginRight={10}
      />
      <View style={{ width: '65%' }}>
        <Text style={styles.username}>Phạm Thiên</Text>
        <Text>Beautiful</Text>
        <View style={styles.info}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 20 }}>9-12</Text>
            <TouchableOpacity><Text style={{ fontWeight: 700 }}>Reply</Text></TouchableOpacity>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: 26, height: 26 }} >
            <Ionicons
              name={'heart-outline'}
              size={26}
              color={'#444'}
            />
            <Text style={{ marginLeft: 2 }}>323</Text>

          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    with: '100%',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 800,
    marginRight: 5
  }

})
export default CommentItem