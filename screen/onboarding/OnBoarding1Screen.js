import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  NativeModules, Platform,
} from "react-native";
import { AddressTextField, CheckButton, CheckButtonRectangle, HandSelect } from "../../component/ItemComponent";
import { CommonColor, CommonFont } from "../../text/CommonStyle";
import { screenHeight, screenWidth } from "../../style/DimentStyle";
import Man from "../../asset/icon/character_man.svg";
import IdCard from "../../asset/icon/3d_id_card.svg";
import BlueCheck from "../../asset/icon/check_blue_filled.svg";
import Location from "../../asset/icon/3d_location.svg";
import useInput from "../../hook/useInput";
import GreenCheck from "../../asset/icon/check_green_filed.svg";
import FailCheck from "../../asset/icon/faill_red_filled.svg";

/**
 * @dates 2022-08-14
 * @author jw
 * @description 온보딩 1
 */
const OnBoarding1Screen = ({ navigation, route }) => {
  const { StatusBarManager } = NativeModules;
  const ref = useRef();
  const address = useInput("");
  const [active, setActive] = useState(0);
  const [handSelected, setHandSelected] = useState(1);
  const [characterSelected, setCharacterSelected] = useState(1);  // 1 : man, 2 : woman
  const [nickname, setNickname] = useState("");
  const [directInput, setDirectInput] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS === "ios" ? StatusBarManager.getHeight((statusBarFrameData) => {
      setStatusBarHeight(statusBarFrameData.height);
    }) : null;
  }, []);


  useEffect(() => {
    if (route.params !== undefined) {
      ref.current.scrollTo({ x: 390 * 3, y: 0, animated: false });
      setActive(route.params.activate);
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

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={ref}
                  scrollEnabled={!(active === 2 && route.params === undefined)}
                  pagingEnabled={true} scrollEventThrottle={1} onMomentumScrollEnd={setSelectedIndex}>
        <View style={[styles.view, { paddingTop: 170, paddingHorizontal: 60 }]}>
          <HandSelect selected={handSelected} setSelected={setHandSelected} setClicked={() => {
            ref.current.scrollTo({ x: 390, y: 0, animated: false });
            setActive(1);
          }} />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={[CommonFont.regular_16, styles.blueText, {marginTop: 100}]}>피부색 고르기</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>맞춤 코디를 대신 입어줄</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>캐릭터를 선택해주세요!</Text>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>이후 설정에서 언제든 변경 가능합니다.</Text>
          </View>
          <TouchableOpacity style={{
            marginTop: 100,
            borderBottomWidth: 1,
            borderColor: CommonColor.basic_gray_dark,
            // position: "absolute",
            // bottom: 36,
            alignSelf: "center"
          }} onPress={() => {
            setHandSelected(Math.round(Math.random() * (3 - 1) + 1));
            ref.current.scrollTo({ x: 390, y: 0, animated: false });
            setActive(1);
          }}>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>랜덤으로 정하기</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.view, { paddingHorizontal: 55, paddingTop: 165 }]}>
          <View style={{
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <TouchableOpacity style={{
              backgroundColor: characterSelected === 1 ? "#F6F7FF" : null,
              padding: characterSelected === 1 ? 10 : 12,
              //TODO 디자인 변화 없게 paddingTop만 주기
              borderWidth: characterSelected === 1 ? 2 : 0,
              borderColor: CommonColor.main_blue,
              borderRadius: 10,
            }} onPress={() => {
              setCharacterSelected(1);
              ref.current.scrollTo({ x: 390 * 2, y: 0, animated: false });
              setActive(2);
            }}>
              <Man />
              {
                characterSelected === 1 &&
                <View style={{ position: "absolute", bottom: -8, right: -8 }}>
                  <BlueCheck width={18} height={18} />
                </View>
              }
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: characterSelected === 2 ? "#F6F7FF" : null,
              padding: characterSelected === 2 ? 10 : 12,
              //TODO 디자인 변화 없게 paddingTop만 주기
              borderWidth: characterSelected === 2 ? 2 : 0,
              borderColor: CommonColor.main_blue,
              borderRadius: 10,
              marginLeft: 24,
            }} onPress={() => {
              setCharacterSelected(2);
              ref.current.scrollTo({ x: 390 * 2, y: 0, animated: false });
              setActive(2);
            }}>
              <Man />
              {
                characterSelected === 2 &&
                <View style={{ position: "absolute", bottom: -8, right: -8 }}>
                  <BlueCheck width={18} height={18} />
                </View>
              }
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={[CommonFont.regular_16, styles.blueText, { marginTop: 115 }]}>외형 고르기</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>맞춤 코디를 대신 입어줄{"\n"}캐릭터를 선택해주세요!</Text>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>이후 설정에서 언제든 변경 가능합니다.</Text>
          </View>
        </View>
        <View style={[styles.view, { alignItems: "center", justifyContent: "space-between", marginBottom: 100 }]}>
          <View style={{ alignItems: "center" }}>
            <Text style={[CommonFont.regular_16, styles.blueText, { marginTop: 70 }]}>이름 정하기</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>사용하실 별명을 입력해주세요!</Text>
            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark }]}>5글자 이내의 별명을 입력해주세요.</Text>
          </View>
          <IdCard />
          <TouchableOpacity style={{
            width: 368,
            height: 55,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: CommonColor.basic_gray_light,
          }} onPress={() => navigation.navigate("OnBoarding2Screen")}>
            <Text style={[CommonFont.regular_16, { color: nickname === "" ? CommonColor.basic_gray_medium : CommonColor.basic_gray_dark}]}>{nickname === "" ? '별명을 입력하세요' : nickname}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.view, {
          alignItems: "center",
          justifyContent: directInput ? undefined : "space-between",
          marginTOp: 72,
        }]}>
          <View style={{ alignItems: "center" }}>
            <Text style={[CommonFont.regular_16, styles.blueText, { marginTop: 70 }]}>위치 서비스</Text>
            <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>정확한 날씨 정보를 위해</Text>
            <Text style={[CommonFont.semi_bold_24]}>위치 서비스를 허용해주세요!</Text>
          </View>
          {
            directInput ?
              <KeyboardAvoidingView style={{
                flex: 1,
                width: "90%",
                marginTop: 34,
                backgroundColor: "#fff",
                justifyContent: addressFocus ? "space-between" : undefined,
              }}
                                    behavior={"padding"} keyboardVerticalOffset={statusBarHeight}>
                <AddressTextField address={address} onFocus={() => setAddressFocus(true)}
                                  onBlur={() => setAddressFocus(false)} />
                {
                  !addressFocus ?
                    <View style={{ marginTop: 50, flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                      <View style={styles.addressBox}>
                        <Text style={[CommonFont.semi_bold_16, { color: CommonColor.main_blue }]}>서울특별시 중구</Text>
                        <View style={{ position: "absolute", bottom: -15 }}>
                          <GreenCheck />
                        </View>
                      </View>
                      <View style={[styles.addressBox, { marginLeft: 10 }]}>
                        <Text style={[CommonFont.regular_16]}>서울특별시 중구</Text>
                        <Text style={[CommonFont.regular_16, { marginTop: 10 }]}>00대로 000길</Text>
                        <View style={{ position: "absolute", bottom: -15 }}>
                          <FailCheck />
                        </View>
                      </View>
                    </View>
                    :
                    <View style={{ width: "120%", alignSelf: "center" }}>
                      <CheckButtonRectangle text={"확인"}
                                            onPress={() => navigation.navigate("OnBoarding3Screen")} />
                    </View>
                }
              </KeyboardAvoidingView>
              :
              <>
                <Location width={210} height={207} />
                <View style={{ width: "90%", marginBottom: 40 }}>
                  <CheckButton text={"위치 서비스 켜기"} activate={true} />
                  <TouchableOpacity style={{
                    width: "100%",
                    height: 55,
                    backgroundColor: "transparent",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }} onPress={() => setDirectInput(true)}>
                    <Text style={[CommonFont.regular_18, { color: CommonColor.basic_gray_dark }]}>위치 직접 입력</Text>
                  </TouchableOpacity>
                </View>
              </>
          }
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
  addressBox: {
    width: 145,
    height: 95,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.19,
    shadowRadius: 4.65,
    elevation: 7,
  },
  blueText: {
    color: CommonColor.main_blue,
    marginBottom: 27,
    marginTop: 105,
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
