import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import RNModal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
type ModalProps = {
  isVisible: boolean;
  setVisible: (status: boolean) => void;
  children: React.ReactNode;
  [x: string]: any;
};
export const Modal = ({
  isVisible = false,
  children,
  setVisible,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      onBackButtonPress={() => {
        setVisible(false);
      }}
      onBackdropPress={() => {
        setVisible(false);
      }}
      isVisible={isVisible}
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({
  children,
  style,
}: {
  style?: any;
  children: React.ReactNode;
}) => <View style={[styles.container, style]}>{children}</View>;

const ModalHeader = ({
  title,
  isCloseIcon,
  setVisible,
}: {
  title: string;
  isCloseIcon?: Boolean;
  setVisible?: (status: boolean) => void;
}) => (
  <View style={styles.header}>
    {isCloseIcon && (
      <TouchableOpacity
        onPress={() => {
          setVisible && setVisible(false);
        }}
        style={{padding: 10, marginTop: 5, marginRight: 20}}>
        <Ionicons name="close" size={28} color="red" />
      </TouchableOpacity>
    )}
    {title && <Text style={styles.text}>{title}</Text>}
  </View>
);

const ModalBody = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: any;
}) => <View style={[styles.body, style]}>{children}</View>;

const ModalFooter = ({children}: {children?: React.ReactNode}) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    maxWidth: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  body: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    minHeight: 100,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    maxWidth: '100%',
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
