import React from "react";
import Modal from "react-native-modal";
import { CommonColor, CommonFont } from "../../text/CommonStyle";
import { ImageBackground, Linking, Text, TouchableOpacity, View } from "react-native";
import Title from "../../asset/icon/title_small.svg";
import BlueDot from "../../asset/icon/blue_dot.svg";

export const LocationPermissionModal = ({ isVisible, setIsVisible }) => {
  return (
    <Modal isVisible={isVisible}
           useNativeDriver={true}
           hideModalContentWhileAnimating={true}
           style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{
        width: 312,
        height: 339,
        backgroundColor: CommonColor.main_white,
        justifyContent: "space-between",
        borderRadius: 20,
      }}>
        <View style={{ paddingLeft: 20, paddingTop: 40 }}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <Title bottom={5}/>
            <Text style={[CommonFont.modal_text_1, { marginLeft: 5 }]}>에서는</Text>
          </View>
          <Text style={[CommonFont.modal_text_1]}>정확한 날씨 정보를 위해{'\n'}위치 접근 허용이 필요합니다.</Text>
          <ImageBackground source={require('../../asset/image/location_background.png')} resizeMode="cover"
                           style={{width: '100%', height: 170}}>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, marginBottom: 10 }}>
              <BlueDot />
              <Text style={[CommonFont.detail_2, { color: CommonColor.main_blue, marginLeft: 10 }]}>선택적 접근 권한</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Text style={[CommonFont.detail_4]}>위치정보</Text>
              <Text style={[CommonFont.detail_3, {marginLeft: 12}]}>실시간 위치 정보에 기반한{'\n'}정확한 날씨 정보 및 콘텐츠 제공</Text>
            </View>
          </ImageBackground>
        </View>
        <View>
          <Text style={[CommonFont.modal_text_2, {marginLeft: 20, marginBottom: 10}]}>동의하지 않으셔도 이용이 가능함을 알려드립니다.</Text>
          <TouchableOpacity style={{
            width: "100%",
            height: 60,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: CommonColor.main_blue,
            alignItems: "center",
            justifyContent: "center",
          }} onPress={() => {
            Linking.openSettings();
            setIsVisible(false)
          }}>
            <Text style={[CommonFont.heading, { color: CommonColor.main_white, letterSpacing: -0.5 }]}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
