import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import {
  AddressTextField,
  CheckButton,
  CheckButtonRectangle,
  Chips, DailyWeather, DivisionLine, DropDownMenu, HandSelect, NormalTextField, PreferSlider,
  SegmentedControls, TextFieldOnBoarding,
  ToastFunction, TopBar, WeatherCard,
} from "../../component/ItemComponent";
import useInputLength from "../../hook/useInputLength";
import useInput from "../../hook/useInput";

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherPresenter = ({ navigation }) => {
  const text = useInputLength("", 5);
  const text2 = useInputLength("", 5);
  const addressText = useInput("");
  const [dataDone, setDataDone] = useState(false);
  const [listData, setListData] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/*<View style={{ flexDirection: "row" }}>*/}
      {/*  <Chips season={"봄"} />*/}
      {/*  <Chips season={"여름"} />*/}
      {/*  <Chips season={"가을"} />*/}
      {/*  <Chips season={"겨울"} />*/}
      {/*</View>*/}
      {/*<SegmentedControls A={"달력"} B={"계절"} />*/}
      {/*<CheckButton activate={true} text={"앱 구경하러 가기"} onPress={() => ToastFunction('캐릭터 변경이 완료되었습니다.')} />*/}
      {/*<CheckButton activate={false} text={"앱 구경하러 가기"} />*/}
      {/*<CheckButtonRectangle activate={true} text={'확인'}/>*/}
      {/*<CheckButtonRectangle activate={false} text={'확인'}/>*/}
      {/*<TextFieldOnBoarding text={text} onSubmitEditing={() => ToastFunction('검색이 완료되었습니다.')}/>*/}
      {/*<NormalTextField text={text2} onSubmitEditing={() => ToastFunction('검색이 완료되었습니다.')}/>*/}
      {/*<AddressTextField address={addressText} listData={listData} setListData={setListData} setDataDone={setDataDone} setLoading={setLoading} setMoreLoading={setMoreLoading}/>*/}
      {/*<PreferSlider/>*/}
      {/*<View style={{marginTop: 30, marginBottom: 10}}>*/}
      {/*  <TopBar title={'위치 변경'} navigation={navigation}/>*/}
      {/*</View>*/}
      {/*<DivisionLine/>*/}
      {/*<HandSelect />*/}
      <ScrollView style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
        {/*<DropDownMenu />*/}
        <DailyWeather date={13} day={'월'} weather={'Sunny'} high={33} low={22}/>
        <WeatherCard month={6} date={12} location={'서울시 중구'} high={31} low={23} humidity={'매우 높음'} wind={3} weather={'Sunny'}/>
        <WeatherCard month={6} date={12} location={'서울시 중구'} high={31} low={23} humidity={'매우 높음'} wind={3} weather={'Thunder'}/>
        <WeatherCard month={6} date={12} location={'서울시 중구'} high={31} low={23} humidity={'매우 높음'} wind={3} weather={'Rainy'}/>
        <WeatherCard month={6} date={12} location={'서울시 중구'} high={31} low={23} humidity={'매우 높음'} wind={3} weather={'Cloudy'}/>
        <WeatherCard month={6} date={12} location={'서울시 중구'} high={31} low={23} humidity={'매우 높음'} wind={3} weather={'PartyCloudy'}/>
        <WeatherCard month={6} date={12} location={'서울시 중구'} high={31} low={23} humidity={'매우 높음'} wind={3} weather={'Snow'}/>
      </ScrollView>
    </View>
  );
};
export default WeatherPresenter;
