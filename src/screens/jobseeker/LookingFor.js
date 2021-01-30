import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Theme from '../../utils/Theme';
import DropDownModal from '../../component/DropDownModal';
import CommonDropDown from '../../component/CommonDropDown';
import CommonRadio from '../../component/CommonRadio';

export default function LookingFor({navigation}) {
  const [dropDownVisible, showHideDropDown] = useState(false);
  const [selectedCategory, setCategory] = useState({
    id: 0,
    name: 'Select Category',
  });
  const [selectedColour, setColour] = useState({
    id: 0,
    name: 'Select Type',
  });
  const [selectedShape, setShape] = useState({
    id: 0,
    name: 'Select Type',
  });
  const [is3XSelected, set3XSelected] = useState(false);
  const [is3XGiaSelected, set3XGiaSelected] = useState(false);
  const [isVXSelected, setVXSelected] = useState(false);
  const [isVXGiaSelected, setVXGiaSelected] = useState(false);

  const [type, setType] = useState('');
  const DATA = [
    {
      id: 1,
      name: 'Test',
    },
  ];

  const onSave = (item) => {
    if (type == 'Category') {
      setCategory(item);
    } else if (type == 'Colour & Modify Cut') {
      setColour(item);
    } else if (type == 'Shape & Colour') {
      setShape(item);
    }

    showHideDropDown(false);
  };

  const showDropDown = (type) => {
    setType(type);
    showHideDropDown(true);
  };

  const radioButtonPress = (type) => {
    if (type == 'Color3X') {
      set3XSelected(true);
      set3XGiaSelected(false);
    } else if (type == 'ColorGIA') {
      set3XSelected(false);
      set3XGiaSelected(true);
    } else if (type == 'ShapeVX') {
      setVXGiaSelected(false);
      setVXSelected(true);
    } else {
      setVXGiaSelected(true);
      setVXSelected(false);
    }
  };

  onSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const onClear = () => {
    setCategory('Select Category');
    setColour('Select Type');
    setShape('Select Type');
    set3XSelected(false);
    set3XGiaSelected(false);
    setVXSelected(false);
    setVXGiaSelected(false);
  };

  const OnSubmit = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={'stretch'}
        source={{uri: 'bg'}}
        style={styles.image}>
        <DropDownModal
          type={type}
          visible={dropDownVisible}
          onSave={onSave}
          onCancel={() => showHideDropDown(false)}
          data={DATA}
        />
        <View style={styles.topSubContainer}>
          <Text style={styles.titleText}>What are you looking for?</Text>
          <TouchableOpacity
            style={styles.skipContainer}
            onPress={() => onSkip()}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bootomSubContainer}>
          <CommonDropDown
            title={'Category'}
            buttonText={selectedCategory.name}
            buttonIcon={'ic_category'}
            onDropDwonPress={showDropDown}
          />
          {selectedCategory.name != 'Select Category' ? (
            <View>
              <CommonDropDown
                title={'Colour & Modify Cut'}
                buttonText={selectedColour.name}
                buttonIcon={'ic_diamond'}
                onDropDwonPress={showDropDown}
              />
              {selectedColour.name != 'Select Type' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <CommonRadio
                    type={'Color3X'}
                    buttonText={'3X OR VG-Good'}
                    onRadioPress={radioButtonPress}
                    isSelected={is3XSelected}
                  />
                  <CommonRadio
                    type={'ColorGIA'}
                    buttonText={'GIA OR nonGIA'}
                    onRadioPress={radioButtonPress}
                    isSelected={is3XGiaSelected}
                  />
                </View>
              ) : null}
            </View>
          ) : null}

          {is3XSelected || is3XGiaSelected ? (
            <View>
              <CommonDropDown
                title={'Shape & Colour'}
                buttonText={selectedShape.name}
                buttonIcon={'ic_diamond'}
                onDropDwonPress={showDropDown}
              />
              {selectedShape.name != 'Select Type' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <CommonRadio
                    type={'ShapeVX'}
                    buttonText={'V,X OR VG-Good'}
                    onRadioPress={radioButtonPress}
                    isSelected={isVXSelected}
                  />
                  <CommonRadio
                    type={'ShapeGIA'}
                    buttonText={'GIA OR nonGIA'}
                    onRadioPress={radioButtonPress}
                    isSelected={isVXGiaSelected}
                  />
                </View>
              ) : null}
            </View>
          ) : null}
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              style={styles.cancelContainer}
              onPress={() => {
                onClear();
              }}>
              <Text style={styles.skipText}>Clear</Text>
            </TouchableOpacity>
            {isVXSelected || isVXGiaSelected ? (
              <TouchableOpacity
                style={styles.cancelContainer}
                onPress={() => OnSubmit()}>
                <Text style={styles.skipText}>Submit</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  titleText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.theme,
  },
  topSubContainer: {
    padding: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
  },
  skipText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.theme,
    includeFontPadding: false,
  },
  bootomSubContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
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
