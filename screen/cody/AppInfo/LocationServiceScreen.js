import React from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { TopAppBar } from "../../../component/ItemComponent"
import { CommonColor, CommonFont } from "../../../text/CommonStyle"
/**
 * @dates 2022-08-14
 * @author jw
 * @description 위치 기반 서비스 이용약관
 */
const LocationServiceScreen = ({ navigation }) => (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopAppBar title={"위치 기반 서비스 이용약관"} backVisible={true} hasLine={true} onPress={() => navigation.goBack()} />
        <ScrollView style={styles.view}>
            <Text style={[CommonFont.heading]}>위치정보 이용 약관</Text>
            <Text style={[styles.title]}>제 1조 (목적)</Text>
            <Text style={styles.content}>
                본 약관은 주식회사 오늘머입지(이하 "회사")가 제공하는 위치기반서비스에 대해 회사와 위치기반서비스를 이용하는 개인위치정보주체(이하 "이용자")간의 권리·의무 및 책임사항, 기타 필요한 사항 규정을 목적으로 합니다.
            </Text>
            <Text style={[styles.title]}>제 2조 (이용약관의 효력 및 변경)</Text>
            <View style={styles.numView}>
                <Text style={styles.numContent}>1.</Text>
                <Text style={styles.numContent}>본 약관은 이용자가 본 약관에 동의하고 회사가 정한 절차에 따라 위치기반서비스의 이용자로 등록됨으로써 효력이 발생합니다.</Text>
            </View>
            <View style={styles.numView}>
                <Text style={styles.numContent}>2.</Text>
                <Text style={styles.numContent}>이용자가 본 약관의 “동의하기” 버튼을 클릭하였을 경우 본 약관의 내용을 모두 읽고 이를 충분히 이해하였으며, 그 적용에 동의한 것으로 봅니다.</Text>
            </View>
            <View style={styles.numView}>
                <Text style={styles.numContent}>3.</Text>
                <Text style={styles.numContent}>회사는 위치기반서비스의 변경사항을 반영하기 위한 목적 등으로 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 수정할 수 있습니다.</Text>
            </View>
            <View style={styles.numView}>
                <Text style={styles.numContent}>4.</Text>
                <Text style={styles.numContent}>
                    약관이 변경되는 경우 회사는 변경사항을 그 적용일자 최소 15일 전에 회사의 홈페이지 또는 서비스 공지사항 등(이하, 홈페이지 등)을 통해 공지합니다. 다만, 개정되는 내용이 이용자 권리의 중대한 변경을 발생시키는 경우 적용일
                    최소 30일 전에 이메일(이메일주소가 없는 경우 서비스 내 전자쪽지 발송, 서비스 내 알림 메시지를 띄우는 등의 별도의 전자적 수단) 발송 또는 등록한 휴대폰번호로 카카오톡 메시지 또는 문자메시지를 발송하는 방법 등으로
                    개별적으로 고지합니다.
                </Text>
            </View>
            <View style={styles.numView}>
                <Text style={styles.numContent}>5.</Text>
                <Text style={styles.numContent}>
                    회사가 전항에 따라 공지 또는 통지를 하면서 공지 또는 통지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 이용자의 의사표시가 없는 경우에는 변경된 약관을
                    승인한 것으로 봅니다. 이용자가 개정약관에 동의하지 않을 경우 본 약관에 대한 동의를 철회할 수 있습니다.
                </Text>
            </View>
            <Text style={[styles.title]}>제 3 조 (약관 외 준칙)</Text>
            <Text style={styles.content}>
                이 약관에 명시되지 않은 사항에 대해서는 위치 정보의 보호 및 이용 등에 관한 법률, 개인정보보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계법령 및 회사가 정한 지침 등의 규정에 따릅니다.
            </Text>
        </ScrollView>
    </View>
)

const styles = StyleSheet.create({
    numContent: [CommonFont.detail_3, { marginRight: 8, color: CommonColor.basic_gray_dark }],
    numView: {
        marginTop: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    content: [CommonFont.detail_3, { marginTop: 8, paddingHorizontal: 16, color: CommonColor.basic_gray_dark }],
    title: [CommonFont.body_1, { marginTop: 32, color: CommonColor.basic_gray_dark }],
    view: {
        paddingTop: 32,
        marginHorizontal: 16
    }
})

export default LocationServiceScreen
