import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import { Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import Input_Form from '../../../../components/hook_form/Input_Form';
import { Modal } from '../../../../components/Modal';
import { AuthContext } from '../../../../context/AuthContext';
import CommentItem from './CommentItem';
import { postApi } from '../../../../clients/post_api';


const CommentModal = ({ id_post, children }) => {
  const navigation = useNavigation();
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const id_user = userInfo.id;
  const { control, handleSubmit, setValue, reset } = useForm({ defaultValues: { comment: '', realComment: '' } });
  const [id_parent, setId_parent] = useState(0);
  const [comments, setComments] = useState([])
  async function fetchData(limit, offset) {
    const result = await postApi.getCommentsByPostID({ limit, offset, id_post });
    if (result.comments) {
      setComments((prev) => [...prev, ...result.comments]);
    }
    else {
      Alert.alert("get category fail!");
    }
  }
  useEffect(() => {
    fetchData(10, 0);
  }, [])
  const setComment = (value) => {
    if (value && value.trim() != '')
      setValue('comment', value);
  }

  const onSubmit = async (data) => {
    const { comment } = data;
    console.log(comment, id_post, id_user);
    if (comment && id_post && id_user) {
      let match = comment.match(/@[^ ]+\s?/);
      const parentName = match ? match[0].replace("@", "") : null;
      const newComment = comment.replace(/@[^ ]+\s?/, "");
      const result = await postApi.createPostComment({ id_parent, id_post, id_user, comment: newComment });
      if (result.comment) {
        const commentResult = { ...result.comment, fullname: userInfo.lastName + userInfo.firstName };
        if (parentName) commentResult.parent = { parentName }
        setComments((prev) => [...prev, commentResult]);
        reset();
      }
      else {
        Alert.alert("get category fail!");
      }
    }

  }
  return <SafeAreaView>
    <TouchableOpacity style={{
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    }}
      onPress={() => {
        setIsVisibleModal((prev) => !prev)
      }}
    >
      {children}
    </TouchableOpacity>
    <Modal
      style={styles.modal}
      setVisible={setIsVisibleModal}
      isVisible={isVisibleModal}>
      <Modal.Container style={styles.container}>
        {/* <Modal.Header setVisible={setIsVisibleModal} isCloseIcon /> */}
        <Modal.Body style={styles.body}>
          <ScrollView>
            <View>
              <View>
                {comments.map((comment) => <CommentItem
                  comment={comment}
                  setComment={setComment}
                  onReply={setId_parent}
                  key={comment.id}
                />)}
              </View>
            </View>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <View>
            <View style={styles.form}>
              <Input_Form
                style={styles.input}
                name='comment'
                required
                control={control}
              />
              <Button
                mode="contained"
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
              >
                <Text>Send</Text>
              </Button>
            </View>
          </View>
        </Modal.Footer>
      </Modal.Container>
    </Modal>


  </SafeAreaView>

}
const styles = StyleSheet.create({

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },

  body: {
    minHeight: 300,
    maxHeight: 400
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    color: "#841584",
    backgroundColor: '#ec5990',
    borderRadius: 10,

    marginBottom: 15,
  },
  input: {
    width: '76%',
    marginRight: 5
  }
})
export default CommentModal
