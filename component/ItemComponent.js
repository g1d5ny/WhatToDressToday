import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import 'dayjs/locale/ko';
import dayjs from "dayjs";
import { CommonColor, CommonFont } from "../text/CommonStyle";


let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)


export const Chips = ({ season }) => {
  const SeasonFunc = () => {
    switch (season) {
      case '봄':
        return { width: 35, backgroundColor: CommonColor.label_background_red, TextColor: CommonColor.label_text_red }
      case '여름':
        return { width: 41, backgroundColor: CommonColor.label_background_blue, TextColor: CommonColor.label_text_blue }
      case '가을':
        return { width: 41, backgroundColor: CommonColor.label_background_orange, TextColor: CommonColor.label_text_orange }
      case '겨울':
        return { width: 41, backgroundColor: CommonColor.label_background_purple, TextColor: CommonColor.label_text_purple }
    }
  }

  return (
    <View style={{width: SeasonFunc().width, height: 20, backgroundColor: SeasonFunc().backgroundColor.color, borderRadius: 4, alignItems:'center', justifyContent: 'center'}}>
      <Text style={[CommonFont.regular_12, {color: SeasonFunc().TextColor.color}]}>{season}</Text>
    </View>
  )
}

export const SegmentedControls = ({ A, B }) => {
  const [clicked, setClicked] = useState('A');

  return (
    <View style={{width: '100%', height: 36, flexDirection: 'row', borderColor: "#f2f2f5", borderWidth: 2, backgroundColor: '#f2f2f5', borderRadius: 10}}>
      <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center',
                                borderRadius: clicked === 'A' ? 10 : 0, backgroundColor: clicked === 'A' ? CommonColor.main_white.color : 'transparent' }}
                        onPress={() => setClicked('A')}>
        <Text style={[CommonFont.semi_bold_16, {color: clicked === 'A' ? CommonColor.basic_black.color : CommonColor.basic_gray_medium.color}]}>{A}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center',
                                borderRadius: clicked === 'B' ? 10 : 0, backgroundColor: clicked === 'B' ? CommonColor.main_white.color : 'transparent' }}
                        onPress={() => setClicked('B')}>
        <Text style={[CommonFont.semi_bold_16, {color: clicked === 'B' ? CommonColor.basic_black.color : CommonColor.basic_gray_medium.color}]}>{B}</Text>
      </TouchableOpacity>
    </View>
  )

}
