import React, { useState } from "react";
import { Text, View } from "react-native";
import useInputLength from "../../hook/useInputLength";
import useInput from "../../hook/useInput";

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherPresenter = ({ navigation, skinColor, gender, nickname, myLocation }) => {

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text>내 피부 색 : {skinColor}</Text>
      <Text>내 성별 : {gender}</Text>
      <Text>내 닉네임 : {nickname}</Text>
      <Text>내 주소 : {myLocation}</Text>
    </View>
  );
};
export default WeatherPresenter;
