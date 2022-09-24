import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { HandSelect } from "../../component/ItemComponent";
import { CommonColor, CommonFont } from "../../text/CommonStyle";
import { screenHeight, screenWidth } from "../../style/DimentStyle";
import FrameBlue from "../../asset/icon/character_frame_blue.svg";
import FrameGray from "../../asset/icon/character_frame_gray.svg";
import IdCard from "../../asset/icon/3d_id_card.svg"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 온보딩 1
 */
const OnBoarding1Screen = ({ navigation }) => {
  const ref = useRef();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(1);

  const setSelectedIndex = ({ nativeEvent }) => {
    const viewSize = nativeEvent.layoutMeasurement.width; // viewSize : 현재 보여지는 화면의 가로 값
    const contentOffset = nativeEvent.contentOffset.x; // offset : 오브젝트 내의 위치
    const selectedIndex = Math.floor(contentOffset / viewSize);

    if (selectedIndex !== active) {
      setActive(selectedIndex);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={ref}
                  pagingEnabled={true} scrollEventThrottle={1} onMomentumScrollEnd={setSelectedIndex}>
        <View style={[styles.view, { paddingTop: 170, paddingHorizontal: 60 }]}>
          <HandSelect selected={selected} setSelected={setSelected} />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={[CommonFont.regular_16, styles.blueText]}>피부색
              고르기</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>맞춤 코디를 대신 입어줄{"\n"}캐릭터를 선택해주세요!</Text>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>이후 설정에서 언제든 변경 가능합니다.</Text>
          </View>
          <TouchableOpacity style={{
            justifyContent: "flex-end",
            borderBottomWidth: 1,
            borderColor: CommonColor.basic_gray_dark,
            position: "absolute",
            bottom: 36,
            alignSelf: "center",
          }} onPress={() => setSelected(Math.round(Math.random() * (3 - 1) + 1))}>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>랜덤으로 정하기</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.view, { paddingHorizontal: 45, paddingTop: 100 }]}>
          <TouchableOpacity style={{
            // width: 0,
            // height: 0,
            // backgroundColor: "#fafa",
            // borderStyle: "solid",
            // borderRightWidth: 274,
            // borderTopWidth: 274,
            // borderRightColor: CommonColor.basic_gray_light,
            // borderRadius: 10,
            // borderColor: CommonColor.main_blue,
          }}>
            <FrameBlue />
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <View style={{ position: "absolute", top: -240, left: 40, transform: [{ rotate: "0deg" }] }}>
              <FrameGray />
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={[CommonFont.regular_16, styles.blueText]}>외형 고르기</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>맞춤 코디를 대신 입어줄{"\n"}캐릭터를 선택해주세요!</Text>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>이후 설정에서 언제든 변경 가능합니다.</Text>
          </View>
        </View>
        <View style={[styles.view, {alignItems: 'center', justifyContent: 'space-between', marginBottom: 100}]}>
          <View style={{alignItems: 'center'}}>
            <Text style={[CommonFont.regular_16, styles.blueText]}>이름 정하기</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>사용하실 별명을 입력해주세요!</Text>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>5글자 이내의 별명을 입력해주세요.</Text>
          </View>
          <IdCard/>
          <TouchableOpacity style={{width: 368, height: 55, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: CommonColor.basic_gray_light}} onPress={() => navigation.navigate('OnBoarding2Screen')}>
            <Text style={[CommonFont.regular_16, {color: CommonColor.basic_gray_medium}]}>별명을 입력하세요</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.view]}>

        </View>
      </ScrollView>
      <View style={{ marginBottom: 27, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <View style={active === 0 ? styles.blueDotStyle : styles.dotStyle} />
        <View style={active === 1 ? styles.blueDotStyle : styles.dotStyle} />
        <View style={active === 2 ? styles.blueDotStyle : styles.dotStyle} />
        <View style={active === 3 ? styles.blueDotStyle : styles.dotStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blueText: {
    color: CommonColor.main_blue, marginBottom: 30, marginTop: 90,
  },
  blueDotStyle: {
    width: 30, height: 6, borderRadius: 5, backgroundColor: CommonColor.main_blue, marginRight: 8,
  },
  dotStyle: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: CommonColor.basic_gray_medium, marginRight: 8,
  },
  view: {
    width: screenWidth,
    // alignItems: "center",
  },
});
export default OnBoarding1Screen;
