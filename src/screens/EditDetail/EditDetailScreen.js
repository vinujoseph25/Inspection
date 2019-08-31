/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './_editDetail';
import { connect } from 'react-redux';
import {
  updateWaterConsumption,
  updateWorkoutDuration,
  updateSleepTime,
} from '../../actions/TrackerUpdateActions';

class EditDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { myNumber: '', context: '' };
    this.onPressButton = this.onPressButton.bind(this);
    this.onChanged = this.onChanged.bind(this);
  }

  onChanged(text) {
    this.setState({
      myNumber: text.replace(/[^0-9]/g, ''),
    });
  }
  onPressButton(value) {
    if (value !== '') {
      if (this.state.context === 'waterConsumption') {
        this.props.onWaterConsumptionUpdate(value);
      } else if (this.state.context === 'workoutDuration') {
        this.props.onWorkoutDurationUpdate(value);
      } else if (this.state.context === 'sleepTime') {
        this.props.onSleepTimeUpdate(value);
      }
      this.props.navigation.goBack();
    }
  }
  componentWillMount() {
    let valueFromStore = '';
    const context = this.props.navigation.getParam(
      'context',
      'waterConsumption',
    );
    if (this.props.tracker.tracker[3]) {
      // storeTracker = this.props.tracker.tracker;
      if (context === 'waterConsumption') {
        valueFromStore = this.props.tracker.tracker[3].waterConsumption;
      } else if (context === 'workoutDuration') {
        valueFromStore = this.props.tracker.tracker[3].workoutDuration;
      } else if (context === 'sleepTime') {
        valueFromStore = this.props.tracker.tracker[3].sleepTime;
      }
    }
    this.setState({
      context: context,
      myNumber: valueFromStore,
    });
  }
  render() {
    return (
      <View>
        <Text style={styles.banner}>
          {this.state.context === 'waterConsumption' ? (
            <Text style={styles.promosecondheader}>
              Enter today's water consumption in number of glasses
            </Text>
          ) : null}
          {this.state.context === 'workoutDuration' ? (
            <Text style={styles.promosecondheader}>
              Enter today's workout duration in minuntes
            </Text>
          ) : null}
          {this.state.context === 'sleepTime' ? (
            <Text style={styles.promosecondheader}>
              Enter today's sleep time in hours
            </Text>
          ) : null}
          {'\n'}
        </Text>
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 30,
            paddingRight: 30,
          }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            keyboardType="numeric"
            onChangeText={text => this.onChanged(text)}
            value={this.state.myNumber}
            maxLength={10} //setting limit of input
          />
        </View>
        <View style={styles.promobuttonouter1}>
          <TouchableOpacity
            onPress={() => {
              this.onPressButton(this.state.myNumber);
            }}>
            <View style={styles.promobuttonouter2}>
              <Text style={styles.promobutton}>Update</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    tracker: state.fitnessTracker,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    onWaterConsumptionUpdate: value => dispatch(updateWaterConsumption(value)),
    onWorkoutDurationUpdate: value => dispatch(updateWorkoutDuration(value)),
    onSleepTimeUpdate: value => dispatch(updateSleepTime(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDetailScreen);
