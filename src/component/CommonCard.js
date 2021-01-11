import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import CommonButton from '../component/CommonButton';
import Theme from '../utils/Theme';

export default function CommonCard({...props}) {
  const width = useWindowDimensions().width;
  const [isMorePopupVisible, setisMorePopupVisible] = useState(false);

  const {
    data,
    onEmployeeApplied,
    onClosedRecruitment,
    onDeactivePost,
    OnDeletePost,
  } = props;
  const renderImageAndText = (icon, title) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <Image style={{height: 18, width: 18}} source={{uri: icon}} />
        <Text
          style={{
            fontFamily: Theme.fontFamily.PoppinsRegular,
            fontSize: Theme.fontSizes.mini,
            marginLeft: 10,
          }}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
      }}>
      <View style={styles.cardContainer}>
        <View style={{paddingHorizontal: 10, marginTop: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.imageContainer,
                  {height: width * 0.14, width: width * 0.14},
                ]}>
                <Image
                  style={{height: width * 0.11, width: width * 0.11}}
                  source={{uri: data.image}}></Image>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subTitle}>{data.subTitle}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{paddingVertical: 5}}
              activeOpacity={1}
              onPress={() => setisMorePopupVisible(!isMorePopupVisible)}>
              <Image
                style={{height: 22, width: 22}}
                source={{uri: 'ic_more'}}
              />
            </TouchableOpacity>
          </View>

          <View style={{paddingVertical: 10}}>
            {renderImageAndText('ic_sm_location', data.location)}
            {renderImageAndText('ic_sm_experiance', data.experiance)}
            {renderImageAndText('ic_sm_calendar', data.postedData)}
          </View>
          {data.status ? (
            <View style={styles.statusContainer}>
              <Text style={styles.status}>Status</Text>
              <View
                style={[
                  styles.statusBackground,
                  {
                    backgroundColor:
                      data.status == 'OPEN'
                        ? Theme.colors.greenBg
                        : Theme.colors.blackBg,
                  },
                ]}>
                <Text
                  style={[
                    styles.status,
                    {
                      color:
                        data.status == 'OPEN'
                          ? Theme.colors.greenText
                          : Theme.colors.blackText,
                    },
                  ]}>
                  {data.status}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        {onEmployeeApplied && onClosedRecruitment ? (
          <View style={styles.bottomContainer}>
            <CommonButton
              buttonStyle={styles.bottomButtom}
              text={`Employee Applied (${data.employApplied})`}
              textStyle={styles.buttonText}
              buttonPress={() => onEmployeeApplied(data.id)}
            />
            <View style={styles.bottomSeprator}></View>
            <CommonButton
              buttonStyle={styles.bottomButtom}
              text={'Closed Recruitment'}
              textStyle={styles.buttonText}
              buttonPress={() => onClosedRecruitment(data.id)}
            />
          </View>
        ) : null}
        {isMorePopupVisible ? (
          <View style={styles.popupContainer}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                setisMorePopupVisible(false);
                onDeactivePost(data.id);
              }}>
              <Text style={styles.popupButtonText}>Deactive Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.popupButtonContainer}
              onPress={() => {
                setisMorePopupVisible(false);
                OnDeletePost(data.id);
              }}>
              <Text style={styles.popupButtonText}>Delete Post</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  imageContainer: {
    backgroundColor: Theme.colors.whiteText,
    borderRadius: 5,
    borderColor: Theme.colors.border,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini + 2,
    color: Theme.colors.theme,
  },
  subTitle: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
    marginTop: 5,
  },
  popupContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    position: 'absolute',
    backgroundColor: Theme.colors.whiteText,
    width: 120,
    right: 15,
    top: 40,
    borderRadius: 10,
    shadowColor: Theme.colors.theme,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Theme.colors.whiteText,
    borderColor: Theme.colors.border,
    borderTopWidth: 1,
    borderRadius: 10,
  },
  bottomButtom: {
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  buttonText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini + 1,
    color: Theme.colors.theme,
  },
  bottomSeprator: {
    width: 0.5,
    backgroundColor: Theme.colors.theme,
    marginVertical: 5,
  },
  popupButtonText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
  },
  popupButtonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: Theme.colors.border,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  status: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
  },
  statusBackground: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 10,
  },
});
