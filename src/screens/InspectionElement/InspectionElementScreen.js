import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Picker,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {connect} from 'react-redux';
import styles from './_inspectionElement';
import {submitInspection} from '../../actions/SubmitInspectionAction';

let inspectionObject = {
  id: '',
  tags: [],
  inspectionItem: '',
  inspectionResult: '',
  fixedOnsite: '',
  postInspectionWorkReq: '',
  workOrdeNo: '',
};

let untouchedFlag = true;

class InspectionElementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: {},
      toggleTypes: [{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}],
    };
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5b97533d30000070000bd533')
      .then(response => response.json())
      .then(responseJson => {
        let tempArray = [];
        responseJson.data.forEach(element => {
          let clonedObj = {...inspectionObject};
          clonedObj.id = element.id;
          clonedObj.inspectionItem = element.name;
          clonedObj.tags = element.tags;
          tempArray.push(clonedObj);
        });
        this.setState({
          loading: false,
          dataSource: tempArray,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  checkAllDataEntry(index) {
    if (index === 0) {
      untouchedFlag = false;
      return true;
    } else {
      const element = this.state.dataSource[index - 1];
      if (
        element.inspectionResult !== '' &&
        element.fixedOnsite !== '' &&
        element.postInspectionWorkReq !== '' &&
        element.workOrdeNo !== ''
      ) {
        untouchedFlag = false;
        return true;
      } else {
        for (; index < this.state.dataSource.length; index++) {
          let delElement = this.state.dataSource[index];
          delElement.inspectionResult = '';
          delElement.fixedOnsite = '';
          delElement.postInspectionWorkReq = '';
          delElement.workOrdeNo = '';
        }
        this.setState();
        return false;
      }
    }
  }

  onPickerChange(value, index) {
    let checkValue = this.checkAllDataEntry(index);
    if (!checkValue) {
      Alert.alert('Please fill above datas');
      return;
    } else {
      if (value !== 0) {
        let clonedataSource = [...this.state.dataSource];
        clonedataSource[index].inspectionResult = value;
        this.setState({
          dataSource: clonedataSource,
        });
      }
    }
  }

  onRadioButtonChange(value, index, pos) {
    let checkValue = this.checkAllDataEntry(index);
    if (!checkValue) {
      Alert.alert('Please fill above datas');
      return;
    } else {
      let clonedataSource = [...this.state.dataSource];
      if (pos === 1) {
        clonedataSource[index].fixedOnsite = value;
      } else if (pos === 2) {
        clonedataSource[index].postInspectionWorkReq = value;
      }
      this.setState({
        dataSource: clonedataSource,
      });
    }
  }

  onTextChange(value, index) {
    let checkValue = this.checkAllDataEntry(index);
    if (!checkValue) {
      Alert.alert('Please fill above datas');
      return;
    } else {
      let clonedataSource = [...this.state.dataSource];
      clonedataSource[index].workOrdeNo = value;
      this.setState({
        dataSource: clonedataSource,
      });
    }
  }

  textCheck(index) {
    let checkValue = this.checkAllDataEntry(index);
    if (!checkValue) {
      Alert.alert('Please fill above datas');
      return;
    } else {
      if (this.state.dataSource[index].inspectionResult === '') {
        Alert.alert('Please select value for Inspection result');
      }
    }
  }

  onSubmit() {
    if (untouchedFlag) {
      Alert.alert('Please fill above datas');
    } else {
      this.props.onSubmitInspection(this.state.dataSource);
    }
  }

  renderItem = data => {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>INSPECTION ITEM : </Text>
          <Text style={styles.text}>{data.item.inspectionItem}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>INSPECTION RESULT : </Text>
          <Picker
            selectedValue={data.item.inspectionResult}
            style={{height: 40, width: 150, marginLeft: 'auto'}}
            onValueChange={itemValue =>
              this.onPickerChange(itemValue, data.index)
            }>
            <Picker.Item key={'unselectable'} label={''} value={0} />
            {data.item.tags.map(element => {
              return (
                <Picker.Item key={element} label={element} value={element} />
              );
            })}
          </Picker>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>FIXED ONSITE : </Text>
          <View style={{marginLeft: 'auto'}}>
            <TouchableOpacity onPress={() => this.textCheck(data.index)}>
              <View>
                <RadioForm
                  ref="radioForm"
                  radio_props={this.state.toggleTypes}
                  initial={'No'}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  labelColor={'#000'}
                  animation={false}
                  disabled={
                    this.state.dataSource[data.index].inspectionResult
                      ? false
                      : true
                  }
                  onPress={value => {
                    this.onRadioButtonChange(value, data.index, 1);
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>POST INSP. WORK REQ : </Text>
          <View style={{marginLeft: 'auto'}}>
            <TouchableOpacity onPress={() => this.textCheck(data.index)}>
              <View>
                <RadioForm
                  ref="radioForm"
                  radio_props={this.state.toggleTypes}
                  initial={'No'}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  labelColor={'#000'}
                  animation={false}
                  disabled={
                    this.state.dataSource[data.index].inspectionResult
                      ? false
                      : true
                  }
                  onPress={value => {
                    this.onRadioButtonChange(value, data.index, 2);
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>WORK ORDER NO. : </Text>
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: 'gray',
              borderWidth: 1,
              marginLeft: 'auto',
            }}
            onChangeText={text => this.onTextChange(text, data.index)}
            value={data.item.workOrdeNo}
          />
        </View>
        <Text>{'\n'}</Text>
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
      <View
        style={{flex: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.promobuttonouter1}>
            <FlatList
              data={this.state.dataSource}
              extraData={this.state}
              keyExtractor={item => item.id.toString()}
              renderItem={item => this.renderItem(item)}
            />
            <Text>{'\n'}</Text>
            <TouchableOpacity
              style={styles.promobuttonouter2}
              onPress={() => {
                this.onSubmit();
              }}>
              <View style={styles.promobuttonouter2}>
                <Text style={styles.promobutton}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    inspectionSubmitted: state.inspectionSubmitted,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitInspection: value => dispatch(submitInspection(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InspectionElementScreen);
