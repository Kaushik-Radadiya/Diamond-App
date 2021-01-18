import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Theme from '../utils/Theme';

const DropDownModal = ({...props}) => {
  const {visible, data, onItemSelect, onCancel} = props;

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          onItemSelect(item.title);
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          style={{height: 20, width: 20}}
          source={{uri: item.isSelected ? 'ic_radiofill' : 'ic_radio'}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            extraData={data}
          />
          <TouchableOpacity
            style={styles.cancelContainer}
            onPress={() => onCancel()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '80%',
    width: '90%',
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.medium - 1,
  },
  cancelContainer: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  cancelText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.theme,
  },
});

export default DropDownModal;
