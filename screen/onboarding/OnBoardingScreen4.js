import React, { useContext, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Geolocation from "react-native-geolocation-service"
import { CommonColor, CommonFont } from "../../text/CommonStyle"
import { CheckButton } from "../../component/ItemComponent"
// import Location from "../../asset/icon/3d_location.svg";
import { screenWidth } from "../../style/DimentStyle"
import { CheckOnlyLocationPermission, DateFormat } from "../../function/common/CommonFunction"
import { CoordinateToAddress } from "../../function/search/SearchAddressFunction"
import { AuthContext } from "../../context/AuthContext"
import Location from "../../component/lottieComponent/Location"
import { LocationPermissionModal } from "../../component/modal/ModalComponent"
import Loader from "../../component/lottieComponent/Loader"

/**
 * @dates 2022-09-30
 * @author jw
 * @description
 */
const OnBoardingScreen4 = ({ skinColor, gender, nickname, navigation }) => {
    const { logUserIn } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [permissionModalVisible, setPermissionModalVisible] = useState(false)
    // const [myLocation, setMyLocation] = useState({ location: "경기도 성남시", coordinate: { longitude: "127.13", latitude: "37.44" }, date: DateFormat() })

    // 현위치 권한 + 현위치 가져오기
    const ScreenCheckLocationPermission = async () => {
        setLoading(true)
        const checkP = await CheckOnlyLocationPermission()
        if (checkP === false) {
            setPermissionModalVisible(true)
            setLoading(false)
        } else {
            Geolocation.getCurrentPosition(
                async position => {
                    const { longitude, latitude } = position.coords
                    CheckNowLocationFunction(longitude, latitude)
                },
                error => {
                    console.error(error)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000
                }
            )
        }
    }

    // 위도, 경도에 따른 지번, 도로명 주소 가져오기
    const CheckNowLocationFunction = (longitude, latitude) => {
        CoordinateToAddress(longitude, latitude)
            .then(res => {
                if (res.documents.length === 0) {
                    setPermissionModalVisible(true)
                    return
                }
                const location = res.documents[0].address.region_1depth_name + " " + res.documents[0].address.region_2depth_name + " " + res.documents[0].address.region_3depth_name
                const myLocation = { location, coordinate: { longitude, latitude }, date: DateFormat() }

                logUserIn(skinColor, gender, nickname, myLocation)
            })
            .then(() => setLoading(false))
            .catch(rej => {
                console.error(rej)
            })
    }

    return (
        <View style={[styles.view, { alignItems: "center", justifyContent: "space-between" }]}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <View style={{ alignItems: "center", marginBottom: 10 }}>
                        <Text style={[CommonFont.regular_16, styles.blueText]}>위치 서비스</Text>
                        <Text style={[CommonFont.semi_bold_24, { marginBottom: 10 }]}>정확한 날씨 정보를 위해</Text>
                        <Text style={[CommonFont.semi_bold_24]}>위치 서비스를 허용해주세요!</Text>
                    </View>
                    <Location />
                    <View style={{ width: "90%", marginBottom: 68 }}>
                        <CheckButton text={"위치 서비스 켜기"} activate={true} onPress={ScreenCheckLocationPermission} />
                        <TouchableOpacity
                            style={{
                                width: "100%",
                                height: 56,
                                backgroundColor: "transparent",
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 10
                            }}
                            onPress={() =>
                                navigation.navigate("OnBoardingScreen4_1", {
                                    skinColor,
                                    gender,
                                    nickname
                                })
                            }
                        >
                            <Text style={[CommonFont.regular_18, { color: CommonColor.basic_gray_dark }]}>위치 직접 입력</Text>
                        </TouchableOpacity>
                    </View>
                    <LocationPermissionModal isVisible={permissionModalVisible} setIsVisible={setPermissionModalVisible} />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    blueText: {
        color: CommonColor.main_blue,
        marginBottom: 28,
        marginTop: 100
    },
    view: {
        width: screenWidth
    }
})

export default OnBoardingScreen4
