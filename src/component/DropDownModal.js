import React, {useState, forwardRef, useImperativeHandle} from 'react';
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

const DropDownModal = forwardRef((props, ref) => {
  const {visible, data, onSave, onCancel, selectedCategory, isFilter} = props;
  const [selectedItem, setselectedItem] = useState(selectedCategory || '');

  const onSavePress = () => {
    if (selectedItem != '') {
      onSave(selectedItem);
      if(!isFilter)setselectedItem('');
    } else {
      onCancel();
      if(!isFilter)setselectedItem('');
    }
  };

  useImperativeHandle(ref, () => ({
    setFilterItem(item) {
      setselectedItem(item);
    },
  }));

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setselectedItem(item);
        }}>
        <Text style={styles.title}>{item.name}</Text>
        <Image
          style={{height: 20, width: 20}}
          source={{
            uri: item == selectedItem ? 'ic_radiofill' : 'ic_radio',
          }}
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
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              style={styles.cancelContainer}
              onPress={() => {
                onCancel();
                if(!isFilter)setselectedItem('');
              }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelContainer}
              onPress={() => onSavePress()}>
              <Text style={styles.cancelText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

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
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Theme.colors.categoryBg,
    marginHorizontal: 10,
  },
  cancelText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.theme,
  },
});

export default DropDownModal;
