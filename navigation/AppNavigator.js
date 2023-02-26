import React, { useState, useEffect } from "react"
import { SafeAreaView, StatusBar, Platform, useColorScheme, View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { navigationRef } from "./RootNavigation"
import NavController from "./NavController"
import Toast from "react-native-toast-message"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CommonColor, CommonFont } from "../text/CommonStyle"
import Check from "../asset/icon/check_blue_filled.svg"
import { AuthProvider } from "../context/AuthContext"
import Loader from "../component/lottieComponent/Loader"
import AsyncStorage from "@react-native-async-storage/async-storage"

const AppNavigator = () => {
    const insets = useSafeAreaInsets()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [skinColor, setSkinColor] = useState(1) // 1 : 왼쪽, 2 : 가운데, 3 : 오른쪽
    const [gender, setGender] = useState(1) // 1 : 남자, 2 : 여자
    const [nickname, setNickname] = useState("")
    const [age, setAge] = useState(0) // 0 : 10대 이하, 1 : 20대, 2 : 30대, 3 : 40대, 4 : 50대 이상
    const [myLocationArray, setMyLocationArray] = useState([]) // longitude : 경도 (x), latitude : 위도 (y)
    const [profileBgColor, setProfileBgColor] = useState("#E9F1FF")
    const [recommendClothesPrefer, setRecommendClothesPrefer] = useState(1) // 0 : 얇게 입기, 1 : 보통, 2 : 따뜻하게 입기
    const [weatherBgPrefer, setWeatherBgPrefer] = useState(1) // 0 : 자연, 1 : 랜덤, 2 : 도시
    const [currentWeatherInfo, setCurrentWeatherInfo] = useState()
    const [weekWeatherInfo, setWeekWeatherInfo] = useState([])
    const [goToWorkPush, setGoToWorkPush] = useState(false)
    const [leaveWorkPush, setLeaveWorkPush] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // AsyncStorage.clear()
        GetUserInfo()
    }, [])

    const GetUserInfo = async () => {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
        setIsLoggedIn(isLoggedIn)

        if (isLoggedIn) {
            setLoading(true)

            const skinColor = await AsyncStorage.getItem("skinColor")
            setSkinColor(skinColor)

            const gender = await AsyncStorage.getItem("gender")
            setGender(Number(gender))

            const nickname = await AsyncStorage.getItem("nickname")
            setNickname(nickname)

            const age = await AsyncStorage.getItem("age")
            setAge(age ?? 0)

            const profileBgColor = await AsyncStorage.getItem("profileBgColor")
            setProfileBgColor(profileBgColor ?? "#E9F1FF")

            const recommendClothesPrefer = await AsyncStorage.getItem("recommendClothesPrefer")
            setRecommendClothesPrefer(Number(recommendClothesPrefer) ?? 1)

            const weatherBgPrefer = await AsyncStorage.getItem("weatherBgPrefer")
            setWeatherBgPrefer(Number(weatherBgPrefer) ?? 1)

            const myLocationArray = await AsyncStorage.getItem("myLocationArray")
            setMyLocationArray(myLocationArray ? JSON.parse(myLocationArray) : [])

            const currentWeatherInfo = await AsyncStorage.getItem("currentWeatherInfo")
            setCurrentWeatherInfo(currentWeatherInfo ? JSON.parse(currentWeatherInfo) : [])

            const weekWeatherInfo = await AsyncStorage.getItem("weekWeatherInfo")
            setWeekWeatherInfo(weekWeatherInfo ? JSON.parse(weekWeatherInfo) : [])

            const goToWorkPush = await AsyncStorage.getItem("goToWorkPush")
            setGoToWorkPush(goToWorkPush ? JSON.parse(goToWorkPush) : false)

            const leaveWorkPush = await AsyncStorage.getItem("leaveWorkPush")
            setLeaveWorkPush(leaveWorkPush ? JSON.parse(leaveWorkPush) : false)

            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const toastConfig = {
        my_custom_type: ({ text1 }) => (
            <View
                style={{
                    maxWidth: 300,
                    height: 45,
                    backgroundColor: CommonColor.main_blue,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    borderRadius: 10,
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: 43,
                        backgroundColor: CommonColor.main_white,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        borderRadius: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 13,
                        paddingBottom: 13
                    }}
                >
                    <Check />
                    <Text style={[CommonFont.detail_2, { marginLeft: 8, color: CommonColor.main_blue }]}>{text1}</Text>
                </View>
            </View>
        )
    }

    const isDarkMode = useColorScheme() === "dark"

    const DarkMode = () => {
        if (Platform.OS === "ios") {
            if (isDarkMode) return "dark-content"
            else return "default"
        } else {
            return "default"
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <SafeAreaView style={{ flex: 1, marginBottom: -insets.bottom }}>
            <StatusBar barStyle={DarkMode()} />
            <AuthProvider
                isLoggedIn={isLoggedIn}
                skinColor={skinColor}
                gender={gender}
                nickname={nickname}
                age={age}
                profileBgColor={profileBgColor}
                recommendClothesPrefer={recommendClothesPrefer}
                weatherBgPrefer={weatherBgPrefer}
                myLocationArray={myLocationArray}
                currentWeatherInfo={currentWeatherInfo}
                weekWeatherInfo={weekWeatherInfo}
                goToWorkPush={goToWorkPush}
                leaveWorkPush={leaveWorkPush}
            >
                <NavigationContainer ref={navigationRef}>
                    <NavController />
                    <Toast config={toastConfig} visibilityTime={2500} />
                </NavigationContainer>
            </AuthProvider>
        </SafeAreaView>
    )
}

export default AppNavigator
