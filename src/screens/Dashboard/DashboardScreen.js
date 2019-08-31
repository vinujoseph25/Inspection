import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import styles from './_dashboard';

class DashboardScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <LinearGradient style={{flex: 1}} colors={['#99a5c1', '#D3DAEB']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.listSection}>
              <TouchableHighlight
                underlayColor="gray"
                onPress={() => {
                  navigation.navigate('EditDetail', {
                    headerTitle: 'Edit Water Consumption',
                    transition: 'collapseExpand',
                    context: 'waterConsumption',
                  });
                }}>
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                    Water Consumption{' '}
                    {this.props.tracker.tracker[3] &&
                    this.props.tracker.tracker[3].waterConsumption ? (
                      <Text>
                        : {this.props.tracker.tracker[3].waterConsumption}{' '}
                        {this.props.tracker.tracker[3].waterConsumption > 1
                          ? 'Glasses'
                          : 'Glass'}
                      </Text>
                    ) : null}
                  </Text>
                  <Image
                    style={{marginLeft: 'auto'}}
                    source={require('../../assets/images/arrow-right.png')}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="gray"
                onPress={() => {
                  navigation.navigate('EditDetail', {
                    headerTitle: 'Edit Workout Duration',
                    transition: 'fromBottom',
                    context: 'workoutDuration',
                  });
                }}>
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                    Workout Duration{' '}
                    {this.props.tracker.tracker[3] &&
                    this.props.tracker.tracker[3].workoutDuration ? (
                      <Text>
                        : {this.props.tracker.tracker[3].workoutDuration}{' '}
                        {this.props.tracker.tracker[3].workoutDuration > 1
                          ? 'Mins'
                          : 'Min'}
                      </Text>
                    ) : null}
                  </Text>
                  <Image
                    style={{marginLeft: 'auto'}}
                    source={require('../../assets/images/arrow-right.png')}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="gray"
                onPress={() => {
                  navigation.navigate('EditDetail', {
                    headerTitle: 'Edit Sleep Time',
                    transition: 'rightLeft',
                    context: 'sleepTime',
                  });
                }}>
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                    Sleep Time{' '}
                    {this.props.tracker.tracker[3] &&
                    this.props.tracker.tracker[3].sleepTime ? (
                      <Text>
                        : {this.props.tracker.tracker[3].sleepTime}{' '}
                        {this.props.tracker.tracker[3].sleepTime > 1
                          ? 'Hrs'
                          : 'Hr'}
                      </Text>
                    ) : null}
                  </Text>
                  <Image
                    style={{marginLeft: 'auto'}}
                    source={require('../../assets/images/arrow-right.png')}
                  />
                </View>
              </TouchableHighlight>
              <Image
                style={{width: '100%', height: 400}}
                source={require('../../assets/images/fitness.jpg')}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    tracker: state.fitnessTracker,
  };
};

export default connect(mapStateToProps)(DashboardScreen);
