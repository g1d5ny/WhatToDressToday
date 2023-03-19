import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { TopAppBar } from "../../../component/ItemComponent"
/**
 * @dates 2022-08-14
 * @author jw
 * @description 오픈소스 라이선스
 */
const OpenSourceLicenseScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <TopAppBar title={"오픈소스 라이선스"} backVisible={true} hasLine={true} onPress={() => navigation.goBack()} />
        </View>
    )
}
export default OpenSourceLicenseScreen
