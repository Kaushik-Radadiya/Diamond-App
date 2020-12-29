import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Theme from '../../utils/Theme';
import DropDownModal from '../../component/DropDownModal';
import CommonDropDown from '../../component/CommonDropDown';
import CommonRadio from '../../component/CommonRadio';

export default function LookingFor() {
  const [dropDownVisible, showHideDropDown] = useState(false);
  const [selectedCategory, setCategory] = useState('Select Category');
  const [selectedColour, setColour] = useState('Select Type');
  const [selectedShape, setShape] = useState('Select Type');
  const [is3XSelected, set3XSelected] = useState(false);
  const [is3XGiaSelected, set3XGiaSelected] = useState(false);
  const [isVXSelected, setVXSelected] = useState(false);
  const [isVXGiaSelected, setVXGiaSelected] = useState(false);

  const [type, setType] = useState('');
  const DATA = [
    {title: 'Hello', isSelected: true},
    {title: 'Hello1', isSelected: false},
    {title: 'Hello2', isSelected: false},
    {title: 'Hell3', isSelected: false},
    {title: 'Hello4', isSelected: false},
    {title: 'Hello5', isSelected: false},
  ];

  const onDropDownItemSelect = (item) => {
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

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={'stretch'}
        source={{uri: 'bg'}}
        style={styles.image}>
        <DropDownModal
          type={type}
          visible={dropDownVisible}
          onItemSelect={onDropDownItemSelect}
          data={DATA}
        />
        <View style={styles.topSubContainer}>
          <Text style={styles.titleText}>What are you looking for?</Text>
          <TouchableOpacity style={styles.skipContainer}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bootomSubContainer}>
          <CommonDropDown
            title={'Category'}
            buttonText={selectedCategory}
            buttonIcon={'ic_category'}
            onDropDwonPress={showDropDown}
          />
          {selectedCategory != 'Select Category' ? (
            <View>
              <CommonDropDown
                title={'Colour & Modify Cut'}
                buttonText={selectedColour}
                buttonIcon={'ic_diamond'}
                onDropDwonPress={showDropDown}
              />
              {selectedColour != 'Select Type' ? (
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
                buttonText={selectedColour}
                buttonIcon={'ic_diamond'}
                onDropDwonPress={showDropDown}
              />
              {selectedShape != 'Select Type' ? (
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
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
  },
  skipText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.theme,
  },
  bootomSubContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
