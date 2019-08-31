import React from 'react';
import {Image, Text, View} from 'react-native';

const LogoTitle = ({loadingImages, data, navigation}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row',justifyContent: "center",alignItems: "center"}}>
      <Image
        style={{marginLeft: '10'}}
        source={require('../assets/images/appIcon.png')}
        style={{width: 25, height: 25}}
      />
      <Text
        style={{
          color: '#333333',
          fontSize: 20,
          fontFamily: 'BloomSpeakOT-Bold',textAlign: 'center'
        }}>
        {' '}Personal Fitness
      </Text>
    </View>
  );
};
export default LogoTitle;
