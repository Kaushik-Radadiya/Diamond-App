import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonDropDown from '../../component/CommonDropDown';

import CommonHeader from '../../component/CommonHeader';
import CommonTextinput from '../../component/CommonTextInput';
import DropDownModal from '../../component/DropDownModal';

export default function JobPost({navigation}) {
  const [type, setType] = useState('');
  const [dropDownVisible, showHideDropDown] = useState(false);
  const [selectedCategory, setCategory] = useState('Select Category');
  const [selectedEmployemnetType, setEmployementType] = useState(
    'Select employement type',
  );
  const [jobTitle, setjobTitle] = useState('Job Title (Designation)');
  const [experience, setExperience] = useState('Work experience you need');
  const [sallery, setSallery] = useState('10000 - 100000');
  const [description, setDescription] = useState(
    'Describe your job post, What you need',
  );
  const [role, setRole] = useState('Employee role');
  const [skill, setSkill] = useState('Skills you need for work');
  const [qualificaiton, setQualificaiton] = useState(
    'Qualification (Optional)',
  );
  const [vacancy, setVacancy] = useState('How many employees you recruit');
  const [location, setLocation] = useState('Job location (City)');

  const DATA = [
    {title: 'Hello'},
    {title: 'Hello1'},
    {title: 'Hello2'},
    {title: 'Hell3'},
    {title: 'Hello4'},
    {title: 'Hello5'},
  ];

  const onSave = (item) => {
    if (type == 'Category') {
      setCategory(item);
    } else if (type == 'Employement Type') {
      setEmployementType(item);
    }

    showHideDropDown(false);
  };

  const onInfoPress = () => {};
  const showDropDown = (type) => {
    setType(type);
    showHideDropDown(true);
  };

  const renderTextInput = (
    title,
    placeholder,
    setdata,
    keyboardType = 'default',
  ) => {
    return (
      <View style={{paddingVertical: 5}}>
        <Text style={{fontFamily: Theme.fontFamily.PoppinsRegular}}>
          {title}
        </Text>
        <CommonTextinput
          icon={'ic_category'}
          placeholder={placeholder}
          onChangeText={(text) => setdata(text)}
          returnKeyType={'next'}
          keyboardType={keyboardType}
        />
      </View>
    );
  };

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        isBack={true}
        title={'Post Job'}
        headerRightButtonPress={onInfoPress}
        headerRightIcon={'ic_info'}
        navigation={navigation}
      />
      <DropDownModal
        type={type}
        visible={dropDownVisible}
        onSave={onSave}
        onCancel={() => showHideDropDown(false)}
        data={DATA}
      />
      <ScrollView>
        <View style={{padding: 15}}>
          <CommonDropDown
            title={'Category'}
            buttonText={selectedCategory}
            buttonIcon={'ic_category'}
            onDropDwonPress={showDropDown}
          />
          {renderTextInput('Job Title (Designation)', jobTitle, setjobTitle)}
          {renderTextInput('Experience', experience, setExperience)}
          {renderTextInput('Sallery', sallery, setSallery)}
          {renderTextInput('Job Description', description, setDescription)}
          <CommonDropDown
            title={'Employement Type'}
            buttonText={selectedEmployemnetType}
            buttonIcon={'ic_category'}
            onDropDwonPress={showDropDown}
          />
          {renderTextInput('Employee Role', role, setRole)}
          {renderTextInput('Employee Skills', skill, setSkill)}
          {renderTextInput('Qualification', qualificaiton, setQualificaiton)}
          {renderTextInput('Vacancy', vacancy, setVacancy)}
          {renderTextInput('Location', location, setLocation)}

          <CommonButton
            buttonStyle={[
              styles.buttonStyle,
              {
                backgroundColor: Theme.colors.theme,
                justifyContent: 'center',
              },
            ]}
            text={'POST JOB'}
            textStyle={[
              styles.buttonTextStyle,
              {
                color: Theme.colors.whiteText,
              },
            ]}
            buttonPress={() => {}}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  buttonTextStyle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.theme,
    includeFontPadding: false,
    alignItems: 'center',
  },
});
