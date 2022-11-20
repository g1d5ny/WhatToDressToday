import React, { useContext, useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, NativeModules, Platform } from "react-native"
import { AddressTextField, CheckButton, CheckButtonRectangle, TopBar } from "../../component/ItemComponent"
import Loader from "../../component/lottieComponent/Loader"
import { CoordinateToAddress, SearchAddressFunction } from "../../function/search/SearchAddressFunction"
import useInput from "../../hook/useInput"
import { CheckOnlyLocationPermission, DateFormat } from "../../function/common/CommonFunction"
import Geolocation from "react-native-geolocation-service"
import { CommonColor, CommonFont } from "../../text/CommonStyle"
import { AuthContext } from "../../context/AuthContext"
import LocationGray from "../../asset/icon/location_gray.svg"

/**
 * @dates 2022-11-20
 * @author jw
 * @description 위치 검색 결과
 */
const LocationSearchScreen = ({ navigation }) => {
    const { StatusBarManager } = NativeModules
    const { myLocationArray, AddMyLocation } = useContext(AuthContext)
    const [statusBarHeight, setStatusBarHeight] = useState(0)
    const [addressFocus, setAddressFocus] = useState(false)
    const [listData, setListData] = useState([])
    const [loading, setLoading] = useState(false)
    const [myLocation, setMyLocation] = useState({ location: "", coordinate: { longitude: 0, latitude: 0 }, date: DateFormat() })
    const [permissionModalVisible, setPermissionModalVisible] = useState(false)

    const address = useInput("")

    useEffect(() => {
        Platform.OS === "ios"
            ? StatusBarManager.getHeight(statusBarFrameData => {
                  setStatusBarHeight(statusBarFrameData.height)
              })
            : null
        setAddressFocus(true)
    }, [])

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
                AddMyLocation(myLocation)
                navigation.goBack()
            })
            .then(() => setLoading(false))
            .catch(rej => {
                console.error(rej)
            })
    }

    const LocationHistory = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6, backgroundColor: CommonColor.basic_gray_light, alignItems: "center", justifyContent: "center" }}>
                <Text>{item.location}</Text>
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    justifyContent: "space-between"
                }}
                behavior={"padding"}
                keyboardVerticalOffset={statusBarHeight}
            >
                <View>
                    <TopBar title={"위치 설정"} text={"취소"} onPress={() => navigation.goBack()} cancelOn={true} />
                    {loading ? (
                        <Loader />
                    ) : (
                        <View style={{ paddingHorizontal: 15 }}>
                            <AddressTextField
                                address={address}
                                addressFocus={addressFocus}
                                setAddressFocus={setAddressFocus}
                                listData={listData}
                                autoFocus={true}
                                onFocus={() => setAddressFocus(true)}
                                onBlur={() => setAddressFocus(false)}
                                onPress={ScreenCheckLocationPermission}
                                onSubmitEditing={() => {
                                    setListData([])
                                    SearchAddressFunction(setListData, setLoading, address.value)
                                }}
                            />
                        </View>
                    )}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <LocationGray height={"100%"} />
                        {myLocationArray.map((item, index) => {
                            return (
                                <View key={index}>
                                    <LocationHistory item={item} />
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
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
                            </>
                        )}
                    </View>
                </View>
                <CheckButtonRectangle
                    activate={myLocation.location !== ""}
                    disabled={myLocation.location === ""}
                    onPress={async () => {
                        await AddMyLocation(myLocation)
                        navigation.goBack()
                    }}
                    text={"확인"}
                />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default LocationSearchScreen
