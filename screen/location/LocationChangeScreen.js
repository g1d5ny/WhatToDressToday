import React, { useContext, useEffect, useState } from "react"
import { View, Platform, NativeModules, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Text, ScrollView, TouchableOpacity } from "react-native"
import { AddressTextField, CheckButtonRectangle, LocationComponent, TopBar } from "../../component/ItemComponent"
import useInput from "../../hook/useInput"
import { CoordinateToAddress, SearchAddressFunction } from "../../function/search/SearchAddressFunction"
import { AuthContext } from "../../context/AuthContext"
import { CheckOnlyLocationPermission, DateFormat } from "../../function/common/CommonFunction"
import Geolocation from "react-native-geolocation-service"
import Loader from "../../component/lottieComponent/Loader"
import { LocationPermissionModal } from "../../component/modal/ModalComponent"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 위치 변경
 */
const LocationChangeScreen = ({ navigation }) => {
    const { StatusBarManager } = NativeModules
    const { myLocationArray, DeleteMyLocation, AddMyLocation } = useContext(AuthContext)
    const [statusBarHeight, setStatusBarHeight] = useState(0)
    const [addressFocus, setAddressFocus] = useState(false)
    const [listData, setListData] = useState([])
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [permissionModalVisible, setPermissionModalVisible] = useState(false)

    const address = useInput("")

    useEffect(() => {
        Platform.OS === "ios"
            ? StatusBarManager.getHeight(statusBarFrameData => {
                  setStatusBarHeight(statusBarFrameData.height)
              })
            : null
        // LocationDateMap()
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
            })
            .then(() => setLoading(false))
            .catch(rej => {
                console.error(rej)
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <TopBar title={"위치 설정"} text={edit ? "완료" : "편집"} onPress={() => setEdit(prev => !prev)} />
            {loading ? (
                <Loader />
            ) : (
                <View style={{ paddingHorizontal: 15 }}>
                    <AddressTextField
                        address={address}
                        addressFocus={addressFocus}
                        setAddressFocus={setAddressFocus}
                        listData={listData}
                        onFocus={() => navigation.navigate("LocationSearchScreen")}
                        onBlur={() => setAddressFocus(false)}
                        onPress={ScreenCheckLocationPermission}
                        onSubmitEditing={() => {
                            setListData([])
                            SearchAddressFunction(setListData, setLoading, address.value)
                        }}
                    />
                    <ScrollView>
                        {myLocationArray.map((item, index) => {
                            return (
                                <View key={index}>
                                    <LocationComponent item={item} index={index} edit={edit} onPressDelete={() => DeleteMyLocation(index)} onPressAdd={() => AddMyLocation(item)} />
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            )}
            <LocationPermissionModal isVisible={permissionModalVisible} setIsVisible={setPermissionModalVisible} />
        </View>
    )
}

export default LocationChangeScreen
