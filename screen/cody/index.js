import React, { useContext } from "react"
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { DivisionLine, TopAppBar } from "../../component/ItemComponent"
import DeviceInfo from "react-native-device-info"
import { CommonColor, CommonFont } from "../../text/CommonStyle"
import { AuthContext } from "../../context/AuthContext"
import Location from "../../asset/icon/location_blue.svg"
import Arrow from "../../asset/icon/right_arrow.svg"
import EditCharacter from "../../asset/icon/edit_character.svg"
import EditOutfit from "../../asset/icon/edit_outfit.svg"
import EditOutfitCalendar from "../../asset/icon/edit_outfit_calendar.svg"
import Notification from "../../asset/icon/notification2_dark_gray.svg"
import Setting from "../../asset/icon/setting_dark_gray.svg"
import { screenWidth } from "../../style/DimentStyle"
import Girl from "../../asset/icon/3d_girl_character"
import Boy from "../../asset/icon/3d_boy_character"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 코디 설정
 */
const CodySettingScreen = ({ navigation }) => {
    const { nickname, gender, profileBgColor, myLocationArray } = useContext(AuthContext)

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <TopAppBar title={"설정"} backVisible={false} hasLine={false} />
            <View style={{ marginHorizontal: isTablet ? 32 : 16 }}>
                <TouchableOpacity style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} onPress={() => navigation.navigate("ProfileChangeScreen")}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={[style.profileImage, { backgroundColor: profileBgColor }]}>{gender === 1 ? <Boy width={72} height={68} /> : <Girl width={72} height={68} />}</View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={[CommonFont.detail_3, { color: CommonColor.basic_gray_dark }]}>현재 프로필</Text>
                            <Text style={[CommonFont.modal_text_1, { marginVertical: 10 }]}>{nickname}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Location />
                                <Text style={[CommonFont.detail_2, { color: CommonColor.main_blue, marginLeft: 4 }]}>{myLocationArray[0].location}</Text>
                            </View>
                        </View>
                    </View>
                    <Arrow />
                </TouchableOpacity>
                {/* <View style={style.grayBox}>
                    <TouchableOpacity style={style.grayBoxDetail} onPress={() => navigation.navigate("ProfileChangeScreen")}>
                        <EditCharacter />
                        <Text style={[CommonFont.detail_2]}>프로필 변경</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.grayBoxDetail} onPress={() => navigation.navigate("CodyRegisterScreen")}>
                        <EditOutfit />
                        <Text style={[CommonFont.detail_2]}>맞춤 코디 등록</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.grayBoxDetail} onPress={() => navigation.navigate("CodyRecordScreen")}>
                        <EditOutfitCalendar />
                        <Text style={[CommonFont.detail_2]}>코디 기록</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={style.divisionLine} />
                <TouchableOpacity style={style.container} onPress={() => navigation.navigate("NotificationSettingScreen")}>
                    <View style={style.menu}>
                        <Notification width={24} height={24} />
                        <Text style={[CommonFont.body_2, { marginLeft: 15 }]}>알림 수신</Text>
                    </View>
                    <Arrow />
                </TouchableOpacity>
                <TouchableOpacity style={[style.container, { marginTop: isTablet ? 48 : 40 }]} onPress={() => navigation.navigate("AppInfoScreen")}>
                    <View style={style.menu}>
                        <Setting width={24} height={24} />
                        <Text style={[CommonFont.body_2, { marginLeft: 15 }]}>앱 정보</Text>
                    </View>
                    <Arrow />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const isTablet = DeviceInfo.isTablet()
const style = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    menu: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10
    },
    divisionLine: {
        width: screenWidth,
        height: 8,
        alignSelf: "center",
        backgroundColor: CommonColor.basic_gray_light,
        marginTop: isTablet ? 40 : 32,
        marginBottom: isTablet ? 52 : 32
    },
    grayBox: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: isTablet ? 100 : 82,
        marginTop: isTablet ? 32 : 20,
        borderRadius: 10,
        backgroundColor: CommonColor.basic_gray_light
    },
    grayBoxDetail: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    profileImage: {
        width: 102,
        height: 102,
        borderRadius: 51,
        // backgroundColor: CommonColor.profile_background_blue,
        // marginRight: 16,
        alignItems: "center",
        justifyContent: "center"
    }
})
export default CodySettingScreen
