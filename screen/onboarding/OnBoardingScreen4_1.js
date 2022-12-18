import React, { useContext, useEffect, useState } from "react"
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, NativeModules, Keyboard, TouchableWithoutFeedback, ScrollView } from "react-native"
import { AddressTextField, CheckButton, CheckButtonRectangle } from "../../component/ItemComponent"
import { CoordinateToAddress, SearchAddressFunction } from "../../function/search/SearchAddressFunction"
import { CommonColor, CommonFont } from "../../text/CommonStyle"
import GreenCheck from "../../asset/icon/check_green_filed.svg"
import FailCheck from "../../asset/icon/faill_red_filled.svg"
import { screenWidth } from "../../style/DimentStyle"
import useInput from "../../hook/useInput"
import Loader from "../../component/lottieComponent/Loader"
import { AuthContext } from "../../context/AuthContext"
import { CheckOnlyLocationPermission, DateFormat } from "../../function/common/CommonFunction"
import Geolocation from "react-native-geolocation-service"
import { LocationPermissionModal } from "../../component/modal/ModalComponent"

/**
 * @dates 2022-09-30
 * @author jw
 * @description
 */
const OnBoardingScreen4_1 = ({ navigation, route }) => {
    const { StatusBarManager } = NativeModules
    const { logUserIn, AddMyLocation } = useContext(AuthContext)
    const [statusBarHeight, setStatusBarHeight] = useState(0)
    const [addressFocus, setAddressFocus] = useState(false)
    const [listData, setListData] = useState([])
    const [myLocation, setMyLocation] = useState({ location: "", coordinate: { longitude: 0, latitude: 0 }, date: DateFormat() })
    const [loading, setLoading] = useState(false)
    const [permissionModalVisible, setPermissionModalVisible] = useState(false)

    const address = useInput("")

    useEffect(() => {
        Platform.OS === "ios"
            ? StatusBarManager.getHeight(statusBarFrameData => {
                  setStatusBarHeight(statusBarFrameData.height)
              })
            : null
    }, [])

    // TODO 전역 함수로 뺴기
    // 현위치 권한 + 현위치 가져오기
    const ScreenCheckLocationPermission = async () => {
        setLoading(true)
        const checkP = await CheckOnlyLocationPermission()
        if (!checkP) {
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

                if (route.params.page) {
                    AddMyLocation(myLocation)
                    navigation.goBack()
                } else {
                    logUserIn(route.params.skinColor, route.params.gender, route.params.nickname, myLocation)
                }
            })
            .then(() => setLoading(false))
            .catch(rej => {
                console.error(rej)
            })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    paddingHorizontal: 15,
                    backgroundColor: "#fff",
                    justifyContent: addressFocus ? "space-between" : undefined
                }}
                behavior={"padding"}
                keyboardVerticalOffset={statusBarHeight}
            >
                <View style={{ alignItems: "center" }}>
                    <Text style={[CommonFont.regular_16, styles.blueText]}>위치 서비스</Text>
                    <Text style={[CommonFont.bold_on_boarding, { marginBottom: 10 }]}>정확한 날씨 정보를 위해</Text>
                    <Text style={[CommonFont.bold_on_boarding, { marginBottom: 44 }]}>위치 서비스를 입력해주세요!</Text>
                    <AddressTextField
                        address={address}
                        addressFocus={addressFocus}
                        onPress={ScreenCheckLocationPermission}
                        onFocus={() => setAddressFocus(true)}
                        listData={listData}
                        onSubmitEditing={() => {
                            setListData([])
                            SearchAddressFunction(setListData, setLoading, address.value)
                        }}
                        onBlur={() => setAddressFocus(false)}
                    />
                </View>
                {!addressFocus ? (
                    listData.length === 0 ? (
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
                    ) : (
                        <View style={{ flex: 1, justifyContent: "space-between" }}>
                            {listData[0] !== "NOT_FOUND" && (
                                <>
                                    <Text style={[CommonFont.semi_bold_14, { marginBottom: 26, marginTop: 5 }]}>'{address.value}' 검색 결과</Text>
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        <ScrollView>
                                            {listData.map(({ address_name, address_type, x, y }, index) => {
                                                if (address_type === "ROAD_ADDR") {
                                                    setListData(["NOT_FOUND"])
                                                    return
                                                }
                                                return (
                                                    <TouchableOpacity
                                                        key={index}
                                                        style={{ width: "100%", height: 63, justifyContent: "center" }}
                                                        onPress={() =>
                                                            setMyLocation(myLocation => {
                                                                return { ...myLocation, location: address_name, coordinate: { longitude: parseFloat(x), latitude: parseFloat(y) }, date: DateFormat() }
                                                            })
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                myLocation.location === address_name ? CommonFont.semi_bold_16 : CommonFont.regular_16,
                                                                {
                                                                    color: myLocation.location === address_name ? CommonColor.main_blue : undefined,
                                                                    letterSpacing: -0.5
                                                                }
                                                            ]}
                                                        >
                                                            {address_name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </ScrollView>
                                    )}
                                    <CheckButton
                                        activate={myLocation.location !== ""}
                                        text={route.params.page === undefined ? "앱 구경하러 가기" : "위치 추가하기"}
                                        disabled={myLocation.location === ""}
                                        style={{ marginBottom: 44 }}
                                        onPress={async () => {
                                            if (!route.params.page) {
                                                logUserIn(route.params.skinColor, route.params.gender, route.params.nickname, myLocation)
                                            } else {
                                                await AddMyLocation(myLocation)
                                                navigation.navigate(route.params.page)
                                            }
                                        }}
                                    />
                                </>
                            )}
                        </View>
                    )
                ) : (
                    <View style={{ width: screenWidth, alignSelf: "center" }}>
                        <CheckButtonRectangle
                            text={"확인"}
                            disabled={address.value === ""}
                            activate={address.value !== ""}
                            onPress={() => {
                                setListData([])
                                SearchAddressFunction(setListData, setLoading, address.value)
                                Keyboard.dismiss()
                            }}
                        />
                    </View>
                )}
                <LocationPermissionModal isVisible={permissionModalVisible} setIsVisible={setPermissionModalVisible} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    addressBox: {
        width: 152,
        height: 98,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.19,
        shadowRadius: 4.65,
        elevation: 7
    },
    blueText: {
        color: CommonColor.main_blue,
        marginBottom: 28,
        marginTop: 100
    },
    view: {
        width: screenWidth
    }
})

export default OnBoardingScreen4_1
