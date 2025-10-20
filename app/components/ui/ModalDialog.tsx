import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
  onRequestClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  showCancel?: boolean;
  variant?: 'default' | 'error';
  children?: React.ReactNode;
};

export default function ModalDialog({ visible, title, message, buttonText = 'OK', onRequestClose, onConfirm, onCancel, cancelText, showCancel = false, variant = 'default', children }: Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.content}>
          {title ? <Text style={[styles.title, variant === 'error' ? styles.titleError : null]}>{title}</Text> : null}
          {message ? <Text style={[styles.message, variant === 'error' ? styles.messageError : null]}>{message}</Text> : null}
          {children}
          <View style={styles.buttonRow}>
            {(showCancel) ? (
              <View style={styles.buttonCol}>
                <PrimaryButton title={cancelText || 'Cancel'} onPress={() => { const cb = onCancel || onRequestClose; if (cb) cb(); }} style={{ backgroundColor: '#333' }} />
              </View>
            ) : null}
            <View style={styles.buttonCol}>
              <PrimaryButton title={buttonText} textColor={variant === 'error' ? '#fff' : undefined} onPress={() => { if (onConfirm) onConfirm(); if (onRequestClose && !onConfirm) onRequestClose(); }} style={variant === 'error' ? { backgroundColor: '#e3342f' } : undefined} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  content: {
    width: '85%',
    backgroundColor: '#1E1E1E',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  titleError: {
    color: '#e3342f'
  },
  message: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  }
  ,
  messageError: {
    color: '#ffb3b0'
  }
  ,
  buttonRow: {
    flexDirection: 'row',
    gap: 5,
    width: '100%'
  }
  ,
  buttonCol: {
    flex: 1,
  }
});
