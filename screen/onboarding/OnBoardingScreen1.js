import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { HandSelect } from "../../component/ItemComponent";
import { CommonColor, CommonFont } from "../../text/CommonStyle";
import { screenWidth } from "../../style/DimentStyle";
import OnBoardingScreen2 from "./OnBoardingScreen2";
import OnBoardingScreen3 from "./OnBoardingScreen3";
import OnBoardingScreen4 from "./OnBoardingScreen4";

/**
 * @dates 2022-08-14
 * @author jw
 * @description 온보딩 1
 */
const OnBoardingScreen1 = ({ navigation, route }) => {
  const ref = useRef();

  const [active, setActive] = useState(0);
  const [skinColor, setSkinColor] = useState(1);
  const [gender, setGender] = useState(1);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (route.params !== undefined) {
      ScrollFunction(3)
      setNickname(route.params.nickname);
    }
  }, [route.params]);

  const setSelectedIndex = ({ nativeEvent }) => {
    const viewSize = nativeEvent.layoutMeasurement.width; // viewSize : 현재 보여지는 화면의 가로 값
    const contentOffset = nativeEvent.contentOffset.x; // offset : 오브젝트 내의 위치
    const selectedIndex = Math.floor(contentOffset / viewSize);
    if (selectedIndex !== active) {
      setActive(selectedIndex);
    }
  };

  const ScrollFunction = (index=1) => {
    ref.current.scrollTo({ x: screenWidth * index, y: 0, animated: true });
    setActive(index);
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={ref}
                  scrollEnabled={!(active === 2 && route.params === undefined)}
                  pagingEnabled={true} scrollEventThrottle={1} onMomentumScrollEnd={setSelectedIndex}>
        <View style={[styles.view, { paddingTop: 170, paddingHorizontal: 55 }]}>
          <HandSelect selected={skinColor} setSelected={setSkinColor} setClicked={ScrollFunction} />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={[CommonFont.regular_16, styles.blueText]}>피부색 고르기</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>맞춤 코디를 대신 입어줄</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>캐릭터를 선택해주세요!</Text>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>이후 설정에서 언제든 변경 가능합니다.</Text>
          </View>
          <TouchableOpacity style={{
            borderBottomWidth: 1,
            borderColor: CommonColor.basic_gray_dark,
            position: "absolute",
            bottom: 36,
            alignSelf: "center",
          }} onPress={() => {
            setSkinColor(Math.round(Math.random() * (3 - 1) + 1));
            ScrollFunction();
          }}>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>랜덤으로 정하기</Text>
          </TouchableOpacity>
        </View>
        <OnBoardingScreen2 gender={gender} setGender={setGender} ScrollFunction={() => ScrollFunction(2)} />
        <OnBoardingScreen3 navigation={navigation} nickname={nickname} />
        <OnBoardingScreen4 skinColor={skinColor} gender={gender} nickname={nickname} navigation={navigation} />
      </ScrollView>
      <View style={{ marginBottom: 44, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
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
    color: CommonColor.main_blue,
    marginBottom: 28,
    marginTop: 86,
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
export default OnBoardingScreen1;
