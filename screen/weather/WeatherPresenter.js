import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Chips, SegmentedControls } from "../../component/ItemComponent";

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherPresenter = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{flexDirection: 'row'}}>
        <Chips season={"봄"} />
        <Chips season={"여름"} />
        <Chips season={"가을"} />
        <Chips season={"겨울"} />
      </View>
      <SegmentedControls A={'달력'} B={'계절'} />
    </View>
  );
};
export default WeatherPresenter;
