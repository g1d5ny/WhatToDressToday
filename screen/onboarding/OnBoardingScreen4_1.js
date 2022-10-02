import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  NativeModules, Keyboard, TouchableWithoutFeedback, ScrollView,
} from "react-native";
import { AddressTextField, CheckButton, CheckButtonRectangle } from "../../component/ItemComponent";
import { SearchAddressFunction } from "../../function/search/SearchAddressFunction";
import { CommonColor, CommonFont } from "../../text/CommonStyle";
import GreenCheck from "../../asset/icon/check_green_filed.svg";
import FailCheck from "../../asset/icon/faill_red_filled.svg";
import { screenWidth } from "../../style/DimentStyle";
import useInput from "../../hook/useInput";
import Loader from "../../component/lottieComponent/Loader";
import { AuthContext } from "../../context/AuthContext";

/**
 * @dates 2022-09-30
 * @author jw
 * @description
 */
const OnBoardingScreen4_1 = ({ navigation, route }) => {
  const { StatusBarManager } = NativeModules;

  const { logUserIn } = useContext(AuthContext);

  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [addressFocus, setAddressFocus] = useState(false);
  const [listData, setListData] = useState([]);
  const [myLocation, setMyLocation] = useState();
  const [loading, setLoading] = useState(false);

  const address = useInput("");

  useEffect(() => {
    Platform.OS === "ios" ? StatusBarManager.getHeight((statusBarFrameData) => {
      setStatusBarHeight(statusBarFrameData.height);
    }) : null;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        justifyContent: addressFocus ? "space-between" : undefined,
      }} behavior={"padding"} keyboardVerticalOffset={statusBarHeight}>
        <View style={{ alignItems: "center" }}>
          <Text style={[CommonFont.regular_16, styles.blueText]}>위치 서비스</Text>
          <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>정확한 날씨 정보를 위해</Text>
          <Text style={[CommonFont.semi_bold_24, { marginBottom: 44 }]}>위치 서비스를 입력해주세요!</Text>
          <AddressTextField address={address} onFocus={() => setAddressFocus(true)} listData={listData}
                            onSubmitEditing={() => {
                              setListData([]);
                              SearchAddressFunction(setListData, setLoading, address.value);
                            }}
                            onBlur={() => setAddressFocus(false)} />
        </View>
        {
          !addressFocus ?
            listData.length === 0 ?
              <View style={{ marginTop: 46, flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
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
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                {
                  listData[0] !== "NOT_FOUND" &&
                  <>
                    <Text style={[CommonFont.semi_bold_14, { marginBottom: 26, marginTop: 5 }]}>'{address.value}' 검색
                      결과</Text>
                    {
                      loading ? <Loader/> :
                    <ScrollView>
                      {
                        listData.map(({ address_name, address_type }, index) => {
                          if (address_type === "ROAD_ADDR") {
                            setListData(["NOT_FOUND"]);
                            return;
                          }
                          return (
                            <TouchableOpacity key={index}
                                              style={{ width: "100%", height: 63, justifyContent: "center" }}
                                              onPress={() => setMyLocation(address_name)}>
                              <Text
                                style={[myLocation === address_name ? CommonFont.semi_bold_16 : CommonFont.regular_16, {
                                  color: myLocation === address_name ? CommonColor.main_blue : undefined,
                                  letterSpacing: -0.5,
                                }]}>{address_name}</Text>
                            </TouchableOpacity>
                          );
                        })
                      }
                    </ScrollView>
                    }
                    <CheckButton activate={myLocation !== undefined} text={"앱 구경하러 가기"}
                                 disabled={myLocation === undefined}
                                 style={{ marginBottom: 44 }}
                                 onPress={() => {
                                   logUserIn(route.params.skinColor, route.params.gender, route.params.nickname, myLocation);
                                   navigation.navigate("TabNavigation");
                                 }} />
                  </>
                }
              </View>
            :
            <View style={{ width: screenWidth, alignSelf: "center" }}>
              <CheckButtonRectangle text={"확인"} disabled={address.value === ""} activate={address.value !== ""}
                                    onPress={() => {
                                      setListData([]);
                                      SearchAddressFunction(setListData, setLoading, address.value);
                                      setMyLocation();
                                      Keyboard.dismiss();
                                    }} />
            </View>
        }
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    marginBottom: 28,
    marginTop: 100,
  },
  view: {
    width: screenWidth,
  },
});


export default OnBoardingScreen4_1;
