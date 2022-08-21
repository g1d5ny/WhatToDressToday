import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, TextInput, TouchableWithoutFeedback } from "react-native";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import { CommonColor, CommonFont } from "../text/CommonStyle";
import Toast from "react-native-toast-message";
import { characterOnlyRegex } from "./regex/RegexComponent";
import Search from "../asset/icon/search_small.svg";
import { SearchAddressFunction } from "../function/search/SearchAddressFunction";
import GrayDot from "../asset/icon/gray_dot.svg";
import Slider from '@react-native-community/slider';
import Back from "../asset/icon/back_arrow.svg";


let utc = require("dayjs/plugin/utc");
let timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);


export const Chips = ({ season }) => {
  const SeasonFunc = () => {
    switch (season) {
      case "봄":
        return { width: 35, backgroundColor: CommonColor.label_background_red, TextColor: CommonColor.label_text_red };
      case "여름":
        return {
          width: 41,
          backgroundColor: CommonColor.label_background_blue,
          TextColor: CommonColor.label_text_blue,
        };
      case "가을":
        return {
          width: 41,
          backgroundColor: CommonColor.label_background_orange,
          TextColor: CommonColor.label_text_orange,
        };
      case "겨울":
        return {
          width: 41,
          backgroundColor: CommonColor.label_background_purple,
          TextColor: CommonColor.label_text_purple,
        };
    }
  };

  return (
    <View style={{
      width: SeasonFunc().width,
      height: 20,
      backgroundColor: SeasonFunc().backgroundColor,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Text style={[CommonFont.regular_12, { color: SeasonFunc().TextColor }]}>{season}</Text>
    </View>
  );
};

export const SegmentedControls = ({ A, B }) => {
  const [clicked, setClicked] = useState("A");

  return (
    <View style={{
      width: "100%",
      height: 36,
      flexDirection: "row",
      borderColor: "#f2f2f5",
      borderWidth: 2,
      backgroundColor: "#f2f2f5",
      borderRadius: 10,
    }}>
      <TouchableOpacity style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: clicked === "A" ? 10 : 0,
        backgroundColor: clicked === "A" ? CommonColor.main_white : "transparent",
      }}
                        onPress={() => setClicked("A")}>
        <Text
          style={[CommonFont.semi_bold_16, { color: clicked === "A" ? CommonColor.basic_black : CommonColor.basic_gray_medium }]}>{A}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: clicked === "B" ? 10 : 0,
        backgroundColor: clicked === "B" ? CommonColor.main_white : "transparent",
      }}
                        onPress={() => setClicked("B")}>
        <Text
          style={[CommonFont.semi_bold_16, { color: clicked === "B" ? CommonColor.basic_black : CommonColor.basic_gray_medium }]}>{B}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CheckButton = ({ activate, text, onPress }) => {
  return (
    <TouchableOpacity style={{
      width: "100%",
      height: 55,
      backgroundColor: activate ? CommonColor.main_blue : CommonColor.basic_gray_medium,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    }} onPress={onPress}>
      <Text style={[CommonFont.semi_bold_18, { color: CommonColor.main_white }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const CheckButtonRectangle = ({ activate, text, onPress }) => {
  return (
    <TouchableOpacity style={{
      width: "100%",
      height: 55,
      backgroundColor: activate ? CommonColor.main_blue : CommonColor.basic_gray_medium,
      alignItems: "center",
      justifyContent: "center",
    }} onPress={onPress}>
      <Text style={[CommonFont.semi_bold_18, { color: CommonColor.main_white }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const ToastFunction = (text1) => {
  Toast.show({
    type: "my_custom_type",
    text1: text1,
    position: "bottom",
    bottomOffset: Platform.OS === "ios" ? 100 : 80,
  });
};

export const TextFieldOnBoarding = ({ text, onSubmitEditing }) => {
  const NicknameFunction = () => {
    if (text.value.length >= 1) {
      if (characterOnlyRegex.test(text.value)) {
        return { borderWidth: 2, color: CommonColor.main_blue, text: "사용 가능한 별명입니다." };
      } else
        return { borderWidth: 2, color: CommonColor.etc_red, text: "사용 불가능한 별명입니다. (특수문자,공백 제외 5글자)" };
    } else return { borderWidth: 0 };
  };

  return (
    <View>
      <TextInput
        value={text.value}
        onChangeText={text.onChange}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={false}
        style={[CommonFont.regular_16, {
          width: "100%",
          height: 55,
          textAlign: "center",
          borderRadius: 10,
          backgroundColor: CommonColor.basic_gray_light,
          borderWidth: NicknameFunction().borderWidth,
          borderColor: NicknameFunction().color,
        }]}
        placeholder={'별명을 입력하세요'}
        placeholderTextColor={CommonFont.regular_16}
      />
      <Text style={[CommonFont.regular_14, {
        marginTop: 5,
        color: NicknameFunction().color,
      }]}>{NicknameFunction().text}</Text>
    </View>
  );
};

export const TextFieldNormal = ({ text, onSubmitEditing }) => {
  const NicknameFunction = () => {
    if (text.value.length >= 1) {
      if (characterOnlyRegex.test(text.value)) {
        return { borderWidth: 2, color: CommonColor.main_blue, text: "사용 가능한 별명입니다." };
      } else
        return { borderWidth: 2, color: CommonColor.etc_red, text: "사용 불가능한 별명입니다. (특수문자,공백 제외 5글자)" };
    } else return { borderWidth: 2, color: CommonColor.basic_gray_light };
  };

  return (
    <View>
      <TextInput
        value={text.value}
        onChangeText={text.onChange}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={false}
        style={[CommonFont.regular_16, {
          width: "100%",
          height: 50,
          borderRadius: 10,
          paddingLeft: 20,
          borderWidth: NicknameFunction().borderWidth,
          borderColor: NicknameFunction().color,
        }]}
      />
      <Text style={[CommonFont.regular_14, {
        marginTop: 5,
        color: NicknameFunction().color,
      }]}>{NicknameFunction().text}</Text>
    </View>
  );
};

export const AddressTextField = ({ address, setDataDone, listData, setListData, setMoreLoading, setLoading }) => {
  const concat = false;
  let numPage = 1;

  const ListDataError = () => {
      return {
        borderWidth: 2,
        color: listData === "error" ? CommonColor.etc_red : CommonColor.main_blue,
        errorMessage: listData === "error" ? "주소를 올바르게 입력해주세요." : null
      };
  }

  return (
    <View>
      <View style={{
        width: "100%",
        height: 55,
        backgroundColor: CommonColor.basic_gray_light,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        padding: 17,
        borderWidth: ListDataError().borderWidth,
        borderColor: ListDataError().color,
      }}>
        <Search />
        <TextInput
          value={address.value}
          onChangeText={address.onChange}
          placeholderTextColor={CommonColor.basic_gray_medium}
          placeholder={"도로명를 제외한 행정구역까지만 입력해주세요."}
          onSubmitEditing={() => SearchAddressFunction(concat, numPage, setDataDone, listData, setListData, setMoreLoading, setLoading, address)}
          autoCorrect={false}
          style={[CommonFont.regular_16, {
            flex: 1,
            marginLeft: 14,
          }]}
        />
      </View>
      <Text style={[CommonFont.regular_14, {
        marginTop: 5,
        color: ListDataError().color,
      }]}>{ListDataError().errorMessage}</Text>
    </View>
  );
};

export const PreferSlider = () => {
  const [prefer, setPrefer] = useState(1);

  return (
      <View style={{ width: "100%", height: 10, flexDirection: 'row', alignItems:'center' }}>
        <View style={{flex: 0.5, height:'100%', alignItems:'flex-end', justifyContent: 'center', backgroundColor: CommonColor.main_blue}}/>
        <View style={{flex: 1, height: '100%', alignItems: 'flex-end', justifyContent: 'center', backgroundColor: prefer >= 2 ? CommonColor.main_blue : CommonColor.basic_gray_light}}/>
        <View style={{flex: 1, height: '100%', alignItems: 'flex-end', justifyContent: 'center', backgroundColor: prefer >= 3 ? CommonColor.main_blue : CommonColor.basic_gray_light}}/>
        <View style={{flex: 0.5, height: '100%', alignItems: 'center', justifyContent:'center', backgroundColor: CommonColor.basic_gray_light}}/>
        {
          prefer === 1 ?
            <>
              <TouchableOpacity style={{width: 21,height: 21, borderRadius: 10,
                backgroundColor: CommonColor.main_white,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, position: 'absolute', left: '14%'}} onPress={() => setPrefer(1)}/>
              <Text style={[CommonFont.semi_bold_14, {color: CommonColor.main_blue, position: 'absolute', top: 20, left: 53}]}>얇게</Text>
            </>
            :
            <>
              <TouchableOpacity style={{padding:8, position: 'absolute', left: '14%'}} onPress={() => setPrefer(1)}>
                <GrayDot/>
              </TouchableOpacity>
              <Text style={[CommonFont.regular_14, {color: CommonColor.basic_gray_dark, position: 'absolute', top: 20, left: 53}]}>얇게</Text>
            </>
        }
        {
          prefer === 2 ?
            <>
              <TouchableOpacity style={{width: 21,height: 21, borderRadius: 10,
                backgroundColor: CommonColor.main_white,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, position: 'absolute', left: '46%'}} onPress={() => setPrefer(2)}/>
              <Text style={[CommonFont.semi_bold_14, {color: CommonColor.main_blue, position: 'absolute', top: 20, left: 178}]}>보통</Text>
            </>
            :
            <>
              <TouchableOpacity style={{padding:8, position: 'absolute', left: '46%'}} onPress={() => setPrefer(2)}>
                <GrayDot/>
              </TouchableOpacity>
              <Text style={[CommonFont.regular_14, {color: CommonColor.basic_gray_dark, position: 'absolute', top: 20, left: 178}]}>보통</Text>
            </>
        }
        {
          prefer === 3 ?
            <>
              <TouchableOpacity style={{width: 21,height: 21, borderRadius: 10,
                backgroundColor: CommonColor.main_white,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, position: 'absolute', right: '14%'}} onPress={() => setPrefer(3)}/>
              <Text style={[CommonFont.semi_bold_14, {color: CommonColor.main_blue, position: 'absolute', top: 20, right: 42}]}>따뜻하게</Text>
            </>
            :
            <>
              <TouchableOpacity style={{padding:8, position: 'absolute', right: '14%'}} onPress={() => setPrefer(3)}>
                <GrayDot/>
              </TouchableOpacity>
              <Text style={[CommonFont.regular_14, {color: CommonColor.basic_gray_dark, position: 'absolute', top: 20, right: 42}]}>따뜻하게</Text>
            </>
        }
    </View>
  );
};

export const TopBar = ({ title }) => {
  return (
    <View style={{width: '100%', padding: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: CommonColor.basic_gray_light}}>
      <Back/>
      <Text style={[CommonFont.semi_bold_18, {flex: 1, textAlign:'center'}]}>{title}</Text>
    </View>
  )
}

export const DivisionLine = () => {
  return (
    <View style={{width: '100%', height: 8, backgroundColor: CommonColor.basic_gray_light}}/>
  )
}
