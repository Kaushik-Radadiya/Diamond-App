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
    isJobSeeker,
    isPostedJobs,
    onApply,
    onSave,
    navigation,
  } = props;

  const renderImageAndText = (icon, title) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 3,
          alignItems: 'center',
        }}>
        <Image style={{height: 18, width: 18}} source={{uri: icon}} />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontFamily: Theme.fontFamily.PoppinsRegular,
            fontSize: Theme.fontSizes.mini - 1,
            marginHorizontal: 10,
            includeFontPadding: false,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
    );
  };

  const renderStatusView = () => {
    if (isJobSeeker) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBackground,
                {
                  backgroundColor: data.is_active
                    ? Theme.colors.greenBg
                    : Theme.colors.redBg,
                },
              ]}>
              <Text
                style={[
                  styles.status,
                  {
                    color: data.is_active
                      ? Theme.colors.greenText
                      : Theme.colors.redText,
                  },
                ]}>
                {data.is_active ? 'OPEN' : 'CLOSE'}
              </Text>
            </View>
            {data.isUrgent ? (
              <View
                style={[
                  styles.statusBackground,
                  {
                    backgroundColor: Theme.colors.redBg,
                    marginLeft: 5,
                  },
                ]}>
                <Text
                  style={[
                    styles.status,
                    {
                      color: Theme.colors.redText,
                    },
                  ]}>
                  {'URGENT REQUIREMENT'}
                </Text>
              </View>
            ) : null}
          </View>
          {!data.apply_user ? (
            <TouchableOpacity
              onPress={() => onApply(data.id)}
              style={{
                // paddingVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: Theme.fontFamily.PoppinsMedium,
                  fontSize: Theme.fontSizes.mini - 1,
                  color: Theme.colors.theme,
                  marginRight: 2,
                  includeFontPadding: false,
                }}>
                Apply Now
              </Text>
              <Image
                style={{height: 15, width: 16}}
                source={{uri: 'ic_apply_arow'}}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      );
    } else {
      return (
        <View style={[styles.statusContainer, {paddingBottom: 10}]}>
          <Text style={[styles.status, {marginRight: 10}]}>Status</Text>

          <View
            style={[
              styles.statusBackground,
              {
                backgroundColor:
                  data.is_active == 1
                    ? Theme.colors.greenBg
                    : Theme.colors.blackBg,
              },
            ]}>
            <Text
              style={[
                styles.status,
                {
                  color:
                    data.is_active == 1
                      ? Theme.colors.greenText
                      : Theme.colors.blackText,
                },
              ]}>
              {data.is_active == 1
                ? 'OPEN'
                : data.is_active == 2
                ? 'CLOSE'
                : 'DEACTIVE'}
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        isJobSeeker ? navigation.navigate('JobDetail', {jobData: data}) : {};
      }}
      activeOpacity={1}
      style={{
        paddingTop: 15,
      }}>
      <View style={styles.cardContainer}>
        <View style={{paddingHorizontal: 10, marginTop: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', flex: 9}}>
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
                <Text style={styles.subTitle}>
                  {data.user && data.users.company_name
                    ? data.users.company_name
                    : '-'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 5,
                flex: 1,
                height: 25,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
              activeOpacity={1}
              onPress={() =>
                isJobSeeker
                  ? onSave(data.id)
                  : setisMorePopupVisible(!isMorePopupVisible)
              }>
              <Image
                style={{height: 20, width: 20}}
                source={{
                  uri: isJobSeeker
                    ? data.save_user
                      ? 'ic_bookmarkfill'
                      : 'ic_bookmark'
                    : 'ic_more',
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{paddingVertical: 10}}>
            {renderImageAndText('ic_sm_location', data.location)}
            {renderImageAndText(
              'ic_sm_experiance',
              `Experiance ${data.experience}`,
            )}
            {isJobSeeker
              ? renderImageAndText('ic_sm_experiance', data.description)
              : null}
            {renderImageAndText('ic_sm_calendar', `Posted ${data.created_at}`)}
          </View>
          {!isPostedJobs ? renderStatusView() : null}
        </View>
        {onEmployeeApplied && onClosedRecruitment ? (
          <View style={styles.bottomContainer}>
            <CommonButton
              buttonStyle={styles.bottomButtom}
              text={`Employee Applied (${data.applied_count})`}
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
                onDeactivePost(data.id, data.is_active);
              }}>
              <Text style={styles.popupButtonText}>
                {data.is_active == 0 || data.is_active == 2
                  ? 'Active Post'
                  : 'Deactive Post'}
              </Text>
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
    </TouchableOpacity>
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
    marginTop: 2,
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
    fontSize: Theme.fontSizes.mini,
    color: Theme.colors.theme,
    includeFontPadding: false,
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
    // flex: 7,
  },
  status: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini - 2,
    includeFontPadding: false,
  },
  statusBackground: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: 'center',
  },
});
