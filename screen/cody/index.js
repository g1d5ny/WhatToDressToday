import React, {useContext} from "react";
import {View, Image, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {DivisionLine, TopAppBar} from "../../component/ItemComponent"
import DeviceInfo from "react-native-device-info"
import { CommonColor, CommonFont } from "../../text/CommonStyle";
import { AuthContext } from "../../context/AuthContext"
import Location from "../../asset/icon/location_blue.svg"
import Arrow from "../../asset/icon/right_arrow.svg"
import EditCharacter from "../../asset/icon/edit_character.svg"
import EditOutfit from "../../asset/icon/edit_outfit.svg"
import EditOutfitCalendar from "../../asset/icon/edit_outfit_calendar.svg"
import { screenWidth } from "../../style/DimentStyle"

 /**
* @dates 2022-08-14
* @author jw
* @description 코디 설정
*/
const CodySettingScreen = ({ navigation }) => {
    const { nickname, myLocationArray } = useContext(AuthContext)

    return (
        <View style={{flex:1, backgroundColor: "#fff"}}>
            <TopAppBar title={'코디 설정'} backVisible={false} hasLine={false}/>
            <View style={{marginHorizontal: isTablet ? 32 : 16}}>
                <TouchableOpacity style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                                  onPress={() => navigation.navigate('ProfileChangeScreen')}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../../asset/image/background_profile.png')} style={{width:102, height: 102}}/>
                        <View style={{marginLeft: 12}}>
                            <Text style={[CommonFont.detail_3, {color: CommonColor.basic_gray_dark}]}>현재 프로필</Text>
                            <Text style={[CommonFont.modal_text_1, {marginVertical: 10}]}>{nickname}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Location />
                                <Text style={[CommonFont.detail_2, {color: CommonColor.main_blue, marginLeft:4 }]}>{myLocationArray[0].location}</Text>
                            </View>
                        </View>
                    </View>
                    <Arrow/>
                </TouchableOpacity>
                <View style={style.grayBox}>
                    <TouchableOpacity style={style.grayBoxDetail} onPress={() => navigation.navigate('ProfileChangeScreen')}>
                        <EditCharacter/>
                        <Text style={[CommonFont.detail_2]}>프로필 변경</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.grayBoxDetail} onPress={() => navigation.navigate('CodyRegisterScreen')}>
                        <EditOutfit/>
                        <Text style={[CommonFont.detail_2]}>맞춤 코디 등록</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.grayBoxDetail} onPress={() => navigation.navigate('CodyRecordScreen')}>
                        <EditOutfitCalendar/>
                        <Text style={[CommonFont.detail_2]}>코디 기록</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ width: screenWidth, height: 8, backgroundColor: CommonColor.basic_gray_light }} /> */}
            </View>
        </View>
    )
}

const isTablet = DeviceInfo.isTablet()
const style = StyleSheet.create({
    grayBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: isTablet ? 100 : 82,
        marginTop: isTablet ? 32 : 20,
        borderRadius: 10,
        backgroundColor: CommonColor.basic_gray_light
    },
    grayBoxDetail: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})
export default CodySettingScreen;
