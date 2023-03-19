import React, { useEffect, useState, useContext } from "react"
import { View, Text, Linking, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { CheckButton, TopAppBar } from "../../../component/ItemComponent"
import { CheckOnlyNotificationPermission } from "../../../function/common/CommonFunction"
import { CommonColor, CommonFont } from "../../../text/CommonStyle"
import ToggleSwitch from "toggle-switch-react-native"
import { AuthContext } from "../../../context/AuthContext"
import { screenHeight, screenWidth } from "../../../style/DimentStyle"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 알림 수신
 */
const NotificationSettingScreen = ({ navigation }) => {
    const { goToWorkPush, SetGoToWorkPush, leaveWorkPush, SetLeaveWorkPush } = useContext(AuthContext)
    const [boardOn, setBoardOn] = useState(false)

    const CheckPushNotificationPermission = async () => {
        const checkP = await CheckOnlyNotificationPermission()
        if (checkP === false) {
            setBoardOn(true)
        }
    }

    useEffect(() => {
        CheckPushNotificationPermission()
    }, [])

    useEffect(() => {}, [])

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <TopAppBar title={"알림 수신"} onPress={() => navigation.goBack()} hasLine={true} backVisible={true} />
            {boardOn && (
                <View style={styles.boardView}>
                    <Text style={CommonFont.modal_text_1}>설정에서 알림을 허용하고</Text>
                    <Text style={CommonFont.modal_text_1}>매일 날씨 정보를 받아보세요!</Text>
                    <Text style={[CommonFont.detail_2, { color: CommonColor.basic_gray_dark, marginTop: 8, marginBottom: 31 }]}>매일 날씨 정보를 받아보세요!</Text>
                    <CheckButton activate={true} text={"설정하러 바로가기"} onPress={() => Linking.openSettings()} />
                </View>
            )}
            <View style={[styles.view]}>
                <View style={styles.toggleView}>
                    <View>
                        <Text style={[CommonFont.heading, { marginBottom: 10 }]}>출근 알림</Text>
                        <Text style={[CommonFont.detail_3, { color: CommonColor.basic_gray_dark }]}>매일 오전 8시에 당일 날씨 정보를 알려드려요</Text>
                    </View>
                    <ToggleSwitch isOn={goToWorkPush} onColor={CommonColor.main_blue} offColor={CommonColor.basic_gray_medium} size='medium' onToggle={value => SetGoToWorkPush(value)} animationSpeed={100} />
                </View>
                <View style={styles.toggleView}>
                    <View>
                        <Text style={[CommonFont.heading, { marginBottom: 10 }]}>퇴근 알림</Text>
                        <Text style={[CommonFont.detail_3, { color: CommonColor.basic_gray_dark }]}>매일 오후 6시에 다음날 날씨 정보를 알려드려요</Text>
                    </View>
                    <ToggleSwitch isOn={leaveWorkPush} onColor={CommonColor.main_blue} offColor={CommonColor.basic_gray_medium} size='medium' onToggle={value => SetLeaveWorkPush(value)} animationSpeed={100} />
                </View>
            </View>
            {/* <View style={[styles.modalBackground, { backgroundColor: boardOn ? "rgba(0, 0, 0, 0.6)" : "transparent" }]}> */}
            <View style={[styles.preview, { backgroundColor: boardOn ? "rgba(0, 0, 0, 0.6)" : "#faf" }]}>
                <Text style={[CommonFont.body_1, { color: CommonColor.main_blue }]}>출퇴근 알림 미리보기</Text>
            </View>
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1
    },
    preview: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: CommonColor.basic_gray_light
    },
    toggleView: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 40
    },
    view: {
        width: "100%",
        paddingHorizontal: 16,
        marginBottom: 43
    },
    boardView: {
        width: "100%",
        height: 220,
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: "#fff",
        position: "absolute",
        zIndex: 10,
        top: 52
    }
})
export default NotificationSettingScreen
//
