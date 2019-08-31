import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Picker,
  TextInput,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {connect} from 'react-redux';
import styles from './_inspectionElement';
import inspectionElementItems from '../../assets/inspectionElementsItems.json';
import {submitInspection} from '../../actions/SubmitInspectionAction';

class InspectionElementScreen extends Component {
  constructor(props) {
    super(props);
    // this.pickerChange = this.pickerChange.bind(this);
    // this.onChanged = this.onChanged.bind(this);
    this.state = {
      loading: true,
      dataSource: {},
      language: '',
      toggleValue: '',
      myNumber: '',
      text: 'Useless Placeholder',
      toggleTypes: [{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}],
    };
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5b97533d30000070000bd533')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  pickerChange(value, index) {
    this.setState({
      language: value,
    });
    console.log('Value');
  }

  onChanged(text) {
    // this.setState({
    //   myNumber: text,
    // });
  }

  renderItem = data => {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>INSPECTION ITEM : </Text>
          <Text style={styles.text}>{data.item.name}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>INSPECTION RESULT : </Text>
          {/* <Picker
            selectedValue={this.state.language}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue, itemIndex) =>
              this.pickerChange(itemValue, itemIndex)
            }>
            {data.item.tags.map(element => {
              return (
                <Picker.Item key={element} label={element} value={element} />
              );
            })}
          </Picker> */}
          <Picker
            selectedValue={this.state.language}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>FIXED ONSITE : </Text>
          <RadioForm
            ref="radioForm"
            radio_props={this.state.toggleTypes}
            initial={'No'}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            labelColor={'#000'}
            animation={false}
            onPress={(value, index) => {
              this.setState({
                toggleValue: value,
              });
            }}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>POST INSP. WORK REQ : </Text>
          <RadioForm
            ref="radioForm"
            radio_props={this.state.toggleTypes}
            initial={'No'}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            labelColor={'#000'}
            animation={false}
            onPress={(value, index) => {
              this.setState({
                toggleValue: value,
              });
            }}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>WORK ORDER NO. : </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <View style={styles.separator} />
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <FlatList
              data={inspectionElementItems.data}
              keyExtractor={item => item.id.toString()}
              renderItem={item => (
                <View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.headingText}>INSPECTION ITEM : </Text>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.headingText}>INSPECTION RESULT : </Text>
                    {/* <Picker
            selectedValue={this.state.language}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue, itemIndex) =>
              this.pickerChange(itemValue, itemIndex)
            }>
            {data.item.tags.map(element => {
              return (
                <Picker.Item key={element} label={element} value={element} />
              );
            })}
          </Picker> */}
                    <Picker
                      selectedValue={this.state.language}
                      style={{height: 50, width: 200}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                      }>
                      <Picker.Item label="Java" value="java" />
                      <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.headingText}>FIXED ONSITE : </Text>
                    <RadioForm
                      ref="radioForm"
                      radio_props={this.state.toggleTypes}
                      initial={'No'}
                      formHorizontal={true}
                      labelHorizontal={true}
                      buttonColor={'#2196f3'}
                      labelColor={'#000'}
                      animation={false}
                      onPress={(value, index) => {
                        this.setState({
                          toggleValue: value,
                        });
                      }}
                    />
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.headingText}>
                      POST INSP. WORK REQ :{' '}
                    </Text>
                    <RadioForm
                      ref="radioForm"
                      radio_props={this.state.toggleTypes}
                      initial={'No'}
                      formHorizontal={true}
                      labelHorizontal={true}
                      buttonColor={'#2196f3'}
                      labelColor={'#000'}
                      animation={false}
                      onPress={(value, index) => {
                        this.setState({
                          toggleValue: value,
                        });
                      }}
                    />
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.headingText}>WORK ORDER NO. : </Text>
                    <TextInput
                      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                      onChangeText={text => this.setState({text})}
                      value={this.state.text}
                    />
                  </View>
                  <View style={styles.separator} />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitInspection: value => dispatch(submitInspection(value)),
  };
};

export default connect(mapDispatchToProps)(InspectionElementScreen);
