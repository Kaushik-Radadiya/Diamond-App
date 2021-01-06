import React, {useState, forwardRef, useRef, useImperativeHandle} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Theme from '../utils/Theme';
const windowSize = Dimensions.get('window');

/**
 *  Displays toast for given text
 */
export default Toast = forwardRef((props, ref) => {
  const toastAnimation = useRef(new Animated.Value(0)).current;
  const [toastText, setToastText] = useState('Toast');
  const [toastType, setToastType] = useState('MESSAGE');
  const [isVisible, setVisble] = useState(false);

  useImperativeHandle(ref, () => ({
    getAlert() {
      alert('getAlert from Child');
    },

    show(text, type = 'ERROR') {
      setVisble(true);
      toastAnimation.setValue(0);
      animationDown();
      setTimeout(() => {
        setVisble(false);
      }, props.duration);
      setToastText(text);
      setToastType(type);
    },
  }));

  /**
   *  Animates Toast
   *  @param { } None
   *  @returns { } None
   */
  const animationDown = () => {
    Animated.timing(toastAnimation, {
      toValue: 1,
      duration: props.duration,
      useNativeDriver: false,
    }).start();
  };

  const firstTopPosition = -(
    styles.toastTextStyle.padding * 5 +
    styles.toastTextStyle.fontSize * 5
  );
  const topPosition = toastAnimation.interpolate({
    inputRange: [0, 0.03, 0.95, 1],
    outputRange: [firstTopPosition, 10, 10, firstTopPosition],
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}>
      <SafeAreaView>
        <TouchableOpacity
          style={{height: '100%', width: '100%'}}
          activeOpacity={1}
          onPress={() => setVisble(false)}>
          <Animated.View
            style={[
              styles.toastStyle,
              {
                top: topPosition,
                backgroundColor:
                  toastType == 'ERROR'
                    ? Theme.colors.error
                    : Theme.colors.success,
              },
            ]}>
            <Text style={styles.toastTextStyle}>{toastText}</Text>
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
});

const styles = {
  toastStyle: {
    borderRadius: 4,
    marginHorizontal: windowSize.width > 500 ? '23%' : '4%',
    width: '94%',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  toastTextStyle: {
    ...Platform.select({
      android: {
        padding: 10,
      },
      ios: {
        padding: 15,
      },
    }),
    color: Theme.colors.blackText,
    fontSize: Theme.fontSizes.medium,
  },
};
