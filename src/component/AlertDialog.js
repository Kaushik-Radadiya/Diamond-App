import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {removeEvent} from '../utils/Utils';

/**
 * Common Alert UI
 */
export class AlertDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlertVisible: false,
      alertData: {
        title: 'Alert',
        alertMessage: '',
        positiveButtonText: '',
        negativeButtonText: '',
        positiveButtonAction: null,
        negativeButtonAction: null,
      },
    };
  }

  componentDidMount = () => {
    removeEvent('AlertOpen');
    EventRegister.addEventListener('AlertOpen', (data) =>
      this.showAlertPopup(data),
    );
  };

  showAlertPopup = (data) => {
    console.log('======alshowAlertPopupe====', data);
    this.setState({isAlertVisible: true, alertData: data});
  };

  render() {
    const {alertData} = this.state;
    return (
      <Modal
        style={styles.MainContainer}
        visible={this.state.isAlertVisible}
        transparent
        animationType={'fade'}
        onRequestClose={() => {
          !this.state.isAlertVisible;
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000099',
          }}>
          <View style={styles.Alert_Main_View}>
            {/* <Text style={styles.Alert_Title}>{alertData.title}</Text>
            <View style={styles.dividerLine} /> */}
            <View
              style={{
                minHeight: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.Alert_Message}>
                {' '}
                {alertData.alertMessage}{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: 50,
                borderTopWidth: 1,
              }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() =>
                  this.setState({isAlertVisible: false}, () => {
                    alertData.positiveButtonAction
                      ? alertData.positiveButtonAction()
                      : null;
                  })
                }
                activeOpacity={0.7}>
                <Text style={styles.TextStyle}>
                  {alertData.positiveButtonText}
                </Text>
              </TouchableOpacity>

              <View style={{width: 1}} />

              {alertData.negativeButtonText != '' ? (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() =>
                    this.setState({isAlertVisible: false}, () => {
                      alertData.negativeButtonAction
                        ? alertData.negativeButtonAction()
                        : null;
                    })
                  }
                  activeOpacity={0.7}>
                  <Text style={styles.TextStyle}>
                    {alertData.negativeButtonText}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 7,
    alignSelf: 'center',
  },

  Alert_Title: {
    fontSize: 17,
    // color: Theme.colors.primaryText,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
  },

  Alert_Message: {
    fontSize: 15,
    // color: Theme.colors.primaryText,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  buttonStyle: {
    // width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  TextStyle: {
    // color: Theme.colors.primaryText,
    textAlign: 'center',
    fontSize: 17,
    marginTop: -5,
    fontWeight: 'bold',
  },
  dividerLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
  },
});
export default AlertDialog;
