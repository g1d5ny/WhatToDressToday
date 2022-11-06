import React, { useContext, useEffect, useState } from "react"
import { View, Platform, NativeModules, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { AddressTextField, LocationComponent, TopBar } from "../../component/ItemComponent"
import useInput from "../../hook/useInput"
import { SearchAddressFunction } from "../../function/search/SearchAddressFunction"
import { AuthContext } from "../../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 위치 변경
 */
const LocationChangeScreen = ({ navigation }) => {
    const { StatusBarManager } = NativeModules
    const { myLocationArray, DeleteMyLocation } = useContext(AuthContext)

    const [statusBarHeight, setStatusBarHeight] = useState(0)
    const [addressFocus, setAddressFocus] = useState(false)
    const [listData, setListData] = useState([])
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [locationList, setLocationList] = useState([])

    const address = useInput("")

    useEffect(() => {
        Platform.OS === "ios"
            ? StatusBarManager.getHeight(statusBarFrameData => {
                  setStatusBarHeight(statusBarFrameData.height)
              })
            : null
        // LocationDateMap()
    }, [])

    const RenderItem = ({ item, index }) => {
        const getByValue = (locationList, searchValue) => {
            for (let [key, value] of locationList.entries()) {
                if (value === searchValue) return key
            }
        }

        return item.map(item, index)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: "#fff"
                }}
                behavior={"padding"}
                keyboardVerticalOffset={statusBarHeight}
            >
                <TopBar title={"위치 설정"} text={edit ? "완료" : "편집"} onPress={() => setEdit(prev => !prev)} />
                <View style={{ paddingHorizontal: 15 }}>
                    <AddressTextField
                        address={address}
                        onFocus={() => navigation.navigate("OnBoardingScreen4_1", { page: "LocationChangeScreen" })}
                        listData={listData}
                        onSubmitEditing={() => {
                            setListData([])
                            SearchAddressFunction(setListData, setLoading, address.value)
                        }}
                    />
                    {myLocationArray.map((item, index) => {
                        return (
                            <View key={index}>
                                <LocationComponent item={item} index={index} edit={edit} onPress={() => DeleteMyLocation(index)} />
                            </View>
                        )
                    })}
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
export default LocationChangeScreen
