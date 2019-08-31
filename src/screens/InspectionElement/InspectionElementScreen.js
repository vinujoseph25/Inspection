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
  Button,
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

class InspectionElementScreen extends Component {
  constructor(props) {
    super(props);
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

  onPickerChange(value, index) {
    let clonedataSource = [...this.state.dataSource];
    clonedataSource[index].inspectionResult = value;
    this.setState({
      dataSource: clonedataSource,
    });
  }

  onRadioButtonChange(value, index, pos) {
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

  onTextChange(value, index) {
    let clonedataSource = [...this.state.dataSource];
    clonedataSource[index].workOrdeNo = value;
    this.setState({
      dataSource: clonedataSource,
    });
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
            style={{height: 50, width: 200}}
            onValueChange={itemValue =>
              this.onPickerChange(itemValue, data.index)
            }>
            {data.item.tags.map(element => {
              return (
                <Picker.Item key={element} label={element} value={element} />
              );
            })}
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
            onPress={value => {
              this.onRadioButtonChange(value, data.index, 1);
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
            onPress={value => {
              this.onRadioButtonChange(value, data.index, 2);
            }}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.headingText}>WORK ORDER NO. : </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={text => this.onTextChange(text, data.index)}
            value={data.item.workOrdeNo}
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
            <TouchableOpacity
              onPress={() => {
                this.props.onSubmitInspection(this.state.dataSource);
              }}>
              <View style={styles.promobuttonouter2}>
                <Text style={styles.promobutton}>Update</Text>
              </View>
            </TouchableOpacity>
            {/* <Button
              onPress={this.props.onSubmitInspection(this.state.dataSource)}
              title="Next"
              color="#841584"
            /> */}
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
