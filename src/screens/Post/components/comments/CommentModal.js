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


const CommentModal = ({ children }) => {
  const navigation = useNavigation();
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const id_user = userInfo.id;
  const { control, handleSubmit } = useForm();
  const [comments, setComments] = useState([{
    id_comment: '1',
    name: 'thiên',
    comment: 'bài như cặt',
    datetime: '2/2/2022'
  }, {
    id_comment: '2',
    name: 'thiên',
    comment: 'bài như cặt',
    datetime: '2/2/2022'
  }, {
    id_comment: '3',
    name: 'thiên',
    comment: 'bài như cặt',
    datetime: '2/2/2022'
  }])
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
                {comments.map((comment) => <CommentItem key={comment.id_comment} />)}
              </View>
            </View>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <View>
            <View style={styles.form}>
              <Input_Form
                style={styles.input}
                name='description'
                required
                control={control}
              />
              <Button
                mode="contained"
                style={styles.button}
              // onPress={handleSubmit(onSubmit)}
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
