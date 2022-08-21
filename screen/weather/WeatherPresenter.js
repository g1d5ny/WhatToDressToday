import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {
  AddressTextField,
  CheckButton,
  CheckButtonRectangle,
  Chips, DivisionLine, NormalTextField, PreferSlider,
  SegmentedControls, TextFieldNormal, TextFieldOnBoarding,
  ToastFunction, TopBar,
} from "../../component/ItemComponent";
import useInputLength from "../../hook/useInputLength";
import useInput from "../../hook/useInput";

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherPresenter = () => {
  const text = useInputLength("", 5);
  const text2 = useInputLength("", 5);
  const addressText = useInput("");
  const [dataDone, setDataDone] = useState(false);
  const [listData, setListData] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row" }}>
        <Chips season={"봄"} />
        <Chips season={"여름"} />
        <Chips season={"가을"} />
        <Chips season={"겨울"} />
      </View>
      <SegmentedControls A={"달력"} B={"계절"} />
      <CheckButton activate={true} text={"앱 구경하러 가기"} onPress={() => ToastFunction('캐릭터 변경이 완료되었습니다.')} />
      <CheckButton activate={false} text={"앱 구경하러 가기"} />
      <CheckButtonRectangle activate={true} text={'확인'}/>
      <CheckButtonRectangle activate={false} text={'확인'}/>
      <TextFieldOnBoarding text={text} onSubmitEditing={() => ToastFunction('검색이 완료되었습니다.')}/>
      <NormalTextField text={text2} onSubmitEditing={() => ToastFunction('검색이 완료되었습니다.')}/>
      <AddressTextField address={addressText} listData={listData} setListData={setListData} setDataDone={setDataDone} setLoading={setLoading} setMoreLoading={setMoreLoading}/>
      <PreferSlider/>
      <View style={{marginTop: 30, marginBottom: 10}}>
        <TopBar title={'위치 변경'}/>
      </View>
      <DivisionLine/>
    </View>
  );
};
export default WeatherPresenter;
