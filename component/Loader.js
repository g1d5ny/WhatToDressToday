import React from "react";
import {ActivityIndicator, View} from 'react-native';

export default () => (
  <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
    <ActivityIndicator color={'#000'}/>
  </View>
)
