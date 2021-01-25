import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function CommonHeader({...props}) {
  const {
    title,
    filterPress,
    isJobAvailable,
    isJobProvider,
    navigation,
    isBack,
    headerRightButtonPress,
    headerRightIcon,
  } = props;

  if (isBack) {
    return (
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.headerButton} source={{uri: 'ic_back'}} />
          </TouchableOpacity>
          <Text style={[styles.titleText, {paddingHorizontal: 10}]}>
            {title}
          </Text>
        </View>
        {headerRightButtonPress ? (
          <TouchableOpacity
            style={styles.headerButtonContainer}
            onPress={() => headerRightButtonPress()}>
            <Image
              style={styles.headerButton}
              source={{uri: headerRightIcon}}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  } else {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>{title ? title : ''}</Text>
        <View style={{flexDirection: 'row'}}>
          {filterPress ? (
            <TouchableOpacity
              style={styles.headerButtonContainer}
              onPress={() => filterPress()}>
              <Image style={styles.headerButton} source={{uri: 'ic_filter'}} />
            </TouchableOpacity>
          ) : null}
          {!isJobProvider ? (
            <TouchableOpacity
              style={styles.headerButtonContainer}
              onPress={() => navigation.navigate('FreelanceJobs')}>
              {isJobAvailable ? <View style={styles.jobBadge}></View> : null}

              <Image
                style={styles.headerButton}
                source={{uri: 'ic_jobproviderfill'}}
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.headerButtonContainer}
            onPress={() => navigation.navigate('Setting')}>
            <Image style={styles.headerButton} source={{uri: 'ic_setting'}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 55,
    backgroundColor: Theme.colors.theme,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  titleText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.whiteText,
    textAlign: 'center',
    padding: 0,
  },
  jobBadge: {
    backgroundColor: 'red',
    height: 8,
    width: 8,
    borderRadius: 4,
    position: 'absolute',
    right: 8,
    top: 13,
    zIndex: 1,
  },
  headerButtonContainer: {
    padding: 8,
  },
  headerButton: {height: 25, width: 25},
});
