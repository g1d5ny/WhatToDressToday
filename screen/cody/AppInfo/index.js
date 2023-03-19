import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { TopAppBar } from "../../../component/ItemComponent"
import { CommonFont } from "../../../text/CommonStyle"
import RightArrow from "../../../asset/icon/right_arrow.svg"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 앱 정보
 */
const AppInfoScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <TopAppBar title={"앱 정보"} backVisible={true} hasLine={true} onPress={() => navigation.goBack()} />
            <TouchableOpacity style={style.menu} onPress={() => navigation.navigate("PrivacyPolicyScreen")}>
                <Text style={CommonFont.body_1}>개인 정보 처리방침</Text>
                <RightArrow />
            </TouchableOpacity>
            <TouchableOpacity style={style.menu} onPress={() => navigation.navigate("OpenSourceLicenseScreen")}>
                <Text style={CommonFont.body_1}>오픈소스 라이선스</Text>
                <RightArrow />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    menu: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "space-between"
    }
})
export default AppInfoScreen
