import React, { useMemo, useState } from "react"
import { View, Text, TouchableOpacity, Platform, TextInput } from "react-native"
import "dayjs/locale/ko"
import dayjs from "dayjs"
import { CommonColor, CommonFont } from "../text/CommonStyle"
import Toast from "react-native-toast-message"
import { characterOnlyRegex } from "./regex/RegexComponent"
import Search from "../asset/icon/search_small.svg"
import GrayDot from "../asset/icon/gray_dot.svg"
import Hand1 from "../asset/icon/3d_hand_1.svg"
import Hand2 from "../asset/icon/3d_hand_2.svg"
import Hand3 from "../asset/icon/3d_hand_3.svg"
import BlueCheck from "../asset/icon/check_blue_filled.svg"
import DownArrow from "../asset/icon/down_arrow.svg"
import UpArrow from "../asset/icon/up_arrow.svg"
import Sunny from "../asset/icon/sunny.svg"
import Snow from "../asset/icon/light_snow.svg"
import Shower from "../asset/icon/shower_rain.svg"
import Cloudy from "../asset/icon/cloudy-day.svg"
import Overcast from "../asset/icon/cloudy-night.svg"
import Fog from "../asset/icon/fog.svg"
import Rainy from "../asset/icon/rain.svg"
import HeavySnowy from "../asset/icon/snow.svg"
import PartyCloudy from "../asset/icon/pary_cloudy_day.svg"
import Lightning from "../asset/icon/thunderstorm.svg"
import Hail from "../asset/icon/hail.svg"
import Sleet from "../asset/icon/sleet.svg"
import TempHigh from "../asset/icon/temperature_high.svg"
import TempLow from "../asset/icon/temperature_low.svg"
import Location from "../asset/icon/location_dark_gray.svg"
import Humidity from "../asset/icon/humidity_dark_gray.svg"
import Wind from "../asset/icon/windy_dark_gray.svg"
import LinearGradient from "react-native-linear-gradient"
import TdCloudy from "../asset/icon/3d_cloudy.svg"
import TdSunny from "../asset/icon/3d_sunny.svg"
import TdPartyCloudy from "../asset/icon/3d_partly_cloudy.svg"
import TdThunder from "../asset/icon/3d_thunder.svg"
import TdSnow from "../asset/icon/3d_snowy.svg"
import TdRainy from "../asset/icon/3d_rainy.svg"
import Delete from "../asset/icon/minus_red_edit.svg"
import CurrentLocation from "../asset/icon/location_curent.svg"
import CurrentLocationInactive from "../asset/icon/location_curent_inactive.svg"
import Clothes from "../asset/icon/3d_clothes.svg"
import Pants from "../asset/icon/3d_pants.svg"
import Back from "../asset/icon/back_arrow.svg"
import { screenWidth } from "../style/DimentStyle"

let utc = require("dayjs/plugin/utc")
let timezone = require("dayjs/plugin/timezone")
dayjs.extend(utc)
dayjs.extend(timezone)

export const Chips = ({ month }) => {
    const SeasonFunc = () => {
        switch (month) {
            case 3:
            case 4:
            case 5:
                return {
                    season: "봄",
                    backgroundColor: CommonColor.label_background_red,
                    TextColor: CommonColor.label_text_red
                }
            case 6:
            case 7:
            case 8:
                return {
                    season: "여름",
                    backgroundColor: CommonColor.label_background_blue,
                    TextColor: CommonColor.label_text_blue
                }
            case 9:
            case 10:
                return {
                    season: "가을",
                    backgroundColor: CommonColor.label_background_orange,
                    TextColor: CommonColor.label_text_orange
                }
            default:
                return {
                    season: "겨울",
                    backgroundColor: CommonColor.label_background_purple,
                    TextColor: CommonColor.label_text_purple
                }
        }
    }

    return (
        <View
            style={{
                height: 20,
                backgroundColor: SeasonFunc().backgroundColor,
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
                paddingVertical: 2
            }}
        >
            <Text style={[CommonFont.detail_3, { color: SeasonFunc().TextColor }]}>{SeasonFunc().season}</Text>
        </View>
    )
}

export const SegmentedControls = ({ A, B }) => {
    const [clicked, setClicked] = useState("A")

    return (
        <View
            style={{
                width: "100%",
                height: 36,
                flexDirection: "row",
                borderColor: "#f2f2f5",
                borderWidth: 2,
                backgroundColor: "#f2f2f5",
                borderRadius: 10
            }}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: clicked === "A" ? 10 : 0,
                    backgroundColor: clicked === "A" ? CommonColor.main_white : "transparent"
                }}
                onPress={() => setClicked("A")}
            >
                <Text style={[CommonFont.body_1, { color: clicked === "A" ? CommonColor.main_black : CommonColor.basic_gray_medium }]}>{A}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: clicked === "B" ? 10 : 0,
                    backgroundColor: clicked === "B" ? CommonColor.main_white : "transparent"
                }}
                onPress={() => setClicked("B")}
            >
                <Text style={[CommonFont.body_1, { color: clicked === "B" ? CommonColor.main_black : CommonColor.basic_gray_medium }]}>{B}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const CheckButton = ({ activate, text, onPress, disabled, style }) => {
    return (
        <TouchableOpacity
            style={{
                ...style,
                width: "100%",
                height: 55,
                backgroundColor: activate ? CommonColor.main_blue : CommonColor.basic_gray_medium,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center"
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[CommonFont.heading, { color: CommonColor.main_white }]}>{text}</Text>
        </TouchableOpacity>
    )
}

export const CheckButtonRectangle = ({ activate, text, onPress, disabled, paddingBottom }) => {
    return (
        <TouchableOpacity
            style={{
                width: "100%",
                height: 55 + paddingBottom,
                paddingBottom,
                backgroundColor: activate ? CommonColor.main_blue : CommonColor.basic_gray_medium,
                alignItems: "center",
                justifyContent: "center"
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[CommonFont.heading, { color: CommonColor.main_white }]}>{text}</Text>
        </TouchableOpacity>
    )
}

export const ToastFunction = text1 => {
    Toast.show({
        type: "my_custom_type",
        text1: text1,
        position: "bottom",
        bottomOffset: Platform.OS === "ios" ? 100 : 80
    })
}

export const TextFieldOnBoarding = ({ text, onSubmitEditing, NicknameFunction }) => {
    return (
        <View>
            <TextInput
                value={text.value}
                onChangeText={text.onChange}
                onSubmitEditing={onSubmitEditing}
                autoFocus={true}
                autoCorrect={false}
                style={[
                    CommonFont.body_2,
                    {
                        width: "100%",
                        height: 56,
                        textAlign: "center",
                        borderRadius: 10,
                        backgroundColor: CommonColor.basic_gray_light,
                        borderWidth: NicknameFunction().borderWidth,
                        borderColor: NicknameFunction().color
                    }
                ]}
                placeholder={"별명을 입력하세요"}
                placeholderTextColor={CommonFont.body_2}
            />
            <Text
                style={[
                    CommonFont.detail_2,
                    {
                        marginTop: 5,
                        color: NicknameFunction().color
                    }
                ]}
            >
                {NicknameFunction().text}
            </Text>
        </View>
    )
}

export const NormalTextField = ({ text, onSubmitEditing }) => {
    const NicknameFunction = () => {
        if (text.value.length >= 1) {
            if (characterOnlyRegex.test(text.value)) {
                return { color: CommonColor.main_blue, text: "사용 가능한 별명입니다." }
            } else return { color: CommonColor.etc_red, text: "사용 불가능한 별명입니다. (특수문자,공백 제외 5글자)" }
        } else return { color: CommonColor.basic_gray_light }
    }

    return (
        <View>
            <TextInput
                value={text.value}
                onChangeText={text.onChange}
                onSubmitEditing={onSubmitEditing}
                autoCorrect={false}
                style={[
                    CommonFont.body_2,
                    CommonColor.basic_gray_dark,
                    {
                        width: "100%",
                        height: 50,
                        borderRadius: 10,
                        paddingLeft: 18,
                        borderWidth: 2,
                        borderColor: NicknameFunction().color
                    }
                ]}
            />
            <Text
                style={[
                    CommonFont.detail_2,
                    {
                        marginTop: 4,
                        color: NicknameFunction().color
                    }
                ]}
            >
                {NicknameFunction().text}
            </Text>
        </View>
    )
}

export const ProfileTextField = ({ text }) => {
    const [onSubmit, setOnSubmit] = useState(false)

    const setInput = () => {
        if (onSubmit) {
            if (characterOnlyRegex.test(text.value)) {
                return { color: CommonColor.main_blue, text: "사용 가능한 별명입니다." }
            } else return { color: CommonColor.etc_red, text: "사용 불가능한 별명입니다. (특수문자,공백 제외 5글자)" }
        } else return { color: CommonColor.basic_gray_light }
    }

    return (
        <View>
            <TextInput
                value={text.value}
                onChangeText={text.onChange}
                onSubmitEditing={() => setOnSubmit(true)}
                autoCorrect={false}
                style={[
                    CommonFont.body_2,
                    CommonColor.basic_gray_dark,
                    {
                        width: "100%",
                        height: 50,
                        borderRadius: 10,
                        paddingLeft: 18,
                        borderWidth: 2,
                        borderColor: setInput().color
                    }
                ]}
            />
            {onSubmit && (
                <Text
                    style={[
                        CommonFont.detail_2,
                        {
                            marginTop: 4,
                            color: setInput().color
                        }
                    ]}
                >
                    {setInput().text}
                </Text>
            )}
        </View>
    )
}

export const AddressTextField = ({ address, onPress, addressFocus, onSubmitEditing, listData, onFocus, onBlur, autoFocus }) => {
    const ListDataError = () => {
        return {
            borderWidth: addressFocus ? 2 : 0,
            color: listData[0] === "NOT_FOUND" ? CommonColor.etc_red : CommonColor.main_blue,
            errorMessage: address.value.length > 0 && listData[0] === "NOT_FOUND" ? "올바르지 않은 주소입니다." : null
        }
    }

    return (
        <View>
            <View
                style={{
                    width: "100%",
                    height: 56,
                    backgroundColor: CommonColor.basic_gray_light,
                    borderRadius: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 18,
                    borderWidth: ListDataError().borderWidth,
                    borderColor: ListDataError().color
                }}
            >
                <Search />
                <TextInput
                    value={address.value}
                    onChangeText={address.onChange}
                    placeholderTextColor={CommonColor.basic_gray_medium}
                    placeholder={"예시: 서울특별시 중구"}
                    onSubmitEditing={onSubmitEditing}
                    autoCorrect={false}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    autoFocus={autoFocus}
                    style={[
                        CommonFont.body_2,
                        {
                            flex: 1,
                            marginLeft: 14
                        }
                    ]}
                />
                <TouchableOpacity onPress={onPress} disabled={addressFocus}>
                    {addressFocus ? <CurrentLocationInactive /> : <CurrentLocation />}
                </TouchableOpacity>
            </View>
            <Text
                style={[
                    CommonFont.detail_2,
                    {
                        marginTop: 5,
                        color: ListDataError().color
                    }
                ]}
            >
                {ListDataError().errorMessage}
            </Text>
        </View>
    )
}

export const PreferSlider = ({ prefer, setPrefer, topic }) => {
    return (
        <View>
            <View style={{ width: "100%", height: 10, flexDirection: "row", alignItems: "center", backgroundColor: CommonColor.basic_gray_light, borderRadius: 40 }}>
                <View style={{ flex: 1, height: "100%", backgroundColor: prefer >= 0 ? CommonColor.main_blue : "transparent", borderTopLeftRadius: 40, borderBottomLeftRadius: 40 }}></View>
                <View style={{ flex: 1, height: "100%", backgroundColor: prefer >= 1 ? CommonColor.main_blue : "transparent" }}></View>
                <View style={{ flex: 1, height: "100%", backgroundColor: prefer >= 2 ? CommonColor.main_blue : "transparent" }}></View>
                <View style={{ flex: 1, height: "100%" }}></View>
            </View>
            <TouchableOpacity style={{ position: "absolute", alignItems: "center", height: 42, justifyContent: "space-between", left: 90 - (topic === "clothes" ? 26 : 12) }} onPress={() => setPrefer(0)}>
                {prefer === 0 ? (
                    <View
                        style={{
                            width: 21,
                            height: 21,
                            borderRadius: 10,
                            backgroundColor: CommonColor.main_white,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            top: -5
                        }}
                    />
                ) : (
                    <View style={{ width: 6, height: 6, top: 2.5 }}>
                        <GrayDot />
                    </View>
                )}
                {prefer === 0 ? (
                    <Text
                        style={[
                            CommonFont.detail_1,
                            {
                                color: CommonColor.main_blue
                            }
                        ]}
                    >
                        {topic === "clothes" ? "얇게 입기" : "자연"}
                    </Text>
                ) : (
                    <Text
                        style={[
                            CommonFont.detail_2,
                            {
                                color: CommonColor.basic_gray_dark
                            }
                        ]}
                    >
                        {topic === "clothes" ? "얇게 입기" : "자연"}
                    </Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={{ position: "absolute", alignItems: "center", alignSelf: "center", height: 42, justifyContent: "space-between" }} onPress={() => setPrefer(1)}>
                {prefer === 1 ? (
                    <View
                        style={{
                            width: 21,
                            height: 21,
                            borderRadius: 10,
                            backgroundColor: CommonColor.main_white,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            top: -5
                        }}
                    />
                ) : (
                    <View style={{ width: 6, height: 6, top: 2.5 }}>
                        <GrayDot />
                    </View>
                )}
                {prefer === 1 ? (
                    <Text
                        style={[
                            CommonFont.detail_1,
                            {
                                color: CommonColor.main_blue
                            }
                        ]}
                    >
                        {topic === "clothes" ? "보통" : "랜덤"}
                    </Text>
                ) : (
                    <Text
                        style={[
                            CommonFont.detail_2,
                            {
                                color: CommonColor.basic_gray_dark
                            }
                        ]}
                    >
                        {topic === "clothes" ? "보통" : "랜덤"}
                    </Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={{ position: "absolute", alignItems: "center", height: 42, justifyContent: "space-between", right: 90 - (topic === "clothes" ? 38 : 12) }} onPress={() => setPrefer(2)}>
                {prefer === 2 ? (
                    <View
                        style={{
                            width: 21,
                            height: 21,
                            borderRadius: 10,
                            backgroundColor: CommonColor.main_white,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            top: -5
                        }}
                    />
                ) : (
                    <View style={{ width: 6, height: 6, top: 2.5 }}>
                        <GrayDot />
                    </View>
                )}
                {prefer === 2 ? (
                    <Text
                        style={[
                            CommonFont.detail_1,
                            {
                                color: CommonColor.main_blue
                            }
                        ]}
                    >
                        {topic === "clothes" ? "따뜻하게 입기" : "도시"}
                    </Text>
                ) : (
                    <Text
                        style={[
                            CommonFont.detail_2,
                            {
                                color: CommonColor.basic_gray_dark
                            }
                        ]}
                    >
                        {topic === "clothes" ? "따뜻하게 입기" : "도시"}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export const TopBar = ({ title, text, onPress, cancelOn }) => {
    return (
        <View
            style={{
                width: "100%",
                paddingVertical: 15,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: CommonColor.basic_gray_light
            }}
        >
            <TouchableOpacity onPress={onPress} style={{ position: "absolute", zIndex: 1, left: 20, padding: 4 }}>
                {cancelOn && <Text style={[CommonFont.body_2, { color: CommonColor.main_blue }]}>{text}</Text>}
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={[CommonFont.heading, {}]}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onPress} style={{ position: "absolute", right: 20, padding: 4 }}>
                {!cancelOn && text && <Text style={[CommonFont.body_2, { color: CommonColor.main_blue }]}>{text}</Text>}
            </TouchableOpacity>
        </View>
    )
}

export const TopAppBar = ({ title, onPress, hasLine, backVisible }) => {
    return (
        <View
            style={{
                width: "100%",
                paddingVertical: 14,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: hasLine ? 1 : 0,
                borderColor: CommonColor.basic_gray_light
            }}
        >
            {backVisible && (
                <TouchableOpacity style={{ position: "absolute", zIndex: 1, left: 17 }} onPress={onPress}>
                    <Back />
                </TouchableOpacity>
            )}
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={[CommonFont.heading, {}]}>{title}</Text>
            </View>
        </View>
    )
}

export const DivisionLine = () => {
    return <View style={{ width: screenWidth, height: 8, alignSelf: "center", backgroundColor: CommonColor.basic_gray_light }} />
}

export const HandSelect = ({ selected, setSelected, setClicked }) => {
    return (
        <View style={{ justifyContent: "space-between", alignSelf: "center", flexDirection: "row" }}>
            <TouchableOpacity
                style={{
                    backgroundColor: selected === 1 ? "#F6F7FF" : null,
                    padding: selected === 1 ? 3 : 5,
                    borderWidth: selected === 1 ? 2 : 0,
                    borderColor: CommonColor.main_blue,
                    borderRadius: 10
                }}
                onPress={() => {
                    setSelected(1)
                    setClicked()
                }}
            >
                <Hand1 width={80} height={162} />
                {selected === 1 && (
                    <View style={{ position: "absolute", bottom: -8, right: -8 }}>
                        <BlueCheck width={18} height={18} />
                    </View>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: selected === 2 ? "#F6F7FF" : null,
                    padding: selected === 2 ? 3 : 5,
                    borderWidth: selected === 2 ? 2 : 0,
                    borderColor: CommonColor.main_blue,
                    borderRadius: 10
                }}
                onPress={() => {
                    setSelected(2)
                    setClicked()
                }}
            >
                <Hand2 width={80} height={162} />
                {selected === 2 && (
                    <View style={{ position: "absolute", bottom: -8, right: -8 }}>
                        <BlueCheck width={18} height={18} />
                    </View>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: selected === 3 ? "#F6F7FF" : null,
                    padding: selected === 3 ? 3 : 5,
                    borderWidth: selected === 3 ? 2 : 0,
                    borderColor: CommonColor.main_blue,
                    borderRadius: 10
                }}
                onPress={() => {
                    setSelected(3)
                    setClicked()
                }}
            >
                <Hand3 width={80} height={162} />
                {selected === 3 && (
                    <View style={{ position: "absolute", bottom: -8, right: -8 }}>
                        <BlueCheck width={18} height={18} />
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export const DropDownMenu = () => {
    const [selected, setSelected] = useState()
    const [open, setOpen] = useState(false)

    return (
        <TouchableOpacity
            style={{
                width: "100%",
                height: 50,
                borderColor: open ? CommonColor.main_blue : CommonColor.basic_gray_light,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 17,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}
            onPress={() => setOpen(!open)}
        >
            <Text style={[CommonFont.body_2]}>{selected ? selected : "선택되지 않음"}</Text>
            <TouchableOpacity onPress={() => setOpen(!open)}>{open ? <UpArrow /> : <DownArrow />}</TouchableOpacity>
        </TouchableOpacity>
    )
}

export const DailyWeather = ({ date, day, icon, max, min }) => {
    const Weather = {
        "clear-day": { icon: <Sunny />, text: "맑음" },
        snow: { icon: <Snow />, text: "눈" },
        "partly-cloudy-day": { icon: <PartyCloudy />, text: "구름 조금" },
        cloudy: { icon: <Cloudy />, text: "흐림" },
        rain: { icon: <Rainy />, text: "비" }
    }

    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 22,
                paddingVertical: 12
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[CommonFont.body_2]}>
                    {date} <Text style={[CommonFont.body_1]}> {day}</Text>
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 42 }}>
                    {Weather[icon].icon}
                    <Text style={[CommonFont.body_2, { marginLeft: 8 }]}>{Weather[icon].text}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TempLow width={12} height={12} />
                <Text style={[CommonFont.body_2, { color: CommonColor.basic_gray_dark, marginLeft: 10 }]}>{min}˚</Text>
                <View
                    style={{
                        height: 16,
                        borderWidth: 1,
                        borderColor: CommonColor.basic_gray_light,
                        marginLeft: 10,
                        marginRight: 10
                    }}
                />
                <TempHigh width={12} height={12} />
                <Text style={[CommonFont.body_2, { color: CommonColor.basic_gray_dark, marginLeft: 10 }]}>{max}˚</Text>
            </View>
        </View>
    )
}

export const WeatherCard = ({ month, date, max, min, humidity, location, wind, icon }) => {
    // TODO 날씨에 맞게 background color
    const Weather = {
        "clear-day": { icon: <TdSunny width={133} height={134} />, backgroundColor: "rgb(255, 250, 226)" },
        snow: { icon: <TdSnow width={154} height={125} />, backgroundColor: "rgb(230, 242, 253)" },
        "partly-cloudy-day": { icon: <TdPartyCloudy width={174} height={111} />, backgroundColor: "rgb(241, 243, 255)" },
        "cloudy-day": { icon: <TdCloudy width={150} height={97} />, backgroundColor: "rgb(241, 252, 255)" },
        rain: { icon: <TdRainy width={158} height={132} />, backgroundColor: "rgb(239, 245, 245)" }
    }

    return (
        <View
            style={{
                width: 360,
                alignSelf: "center",
                height: 250,
                borderWidth: 2,
                borderColor: CommonColor.basic_gray_light,
                borderRadius: 20
            }}
        >
            <View
                style={{
                    padding: 20,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: CommonColor.basic_gray_light
                }}
            >
                <Text style={[CommonFont.body_2]}>
                    {month}월 {date}일 <Text style={[CommonFont.body_1]}>오늘</Text>
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Location width={17} height={17} />
                    <Text style={[CommonFont.body_2]}>{location}</Text>
                </View>
            </View>
            <LinearGradient
                colors={[Weather[icon].backgroundColor, "#fff"]}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    padding: 20
                }}
            >
                <View style={{ width: 150, height: 140 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ padding: 5, alignItems: "center" }}>
                            <Text style={[CommonFont.detail_3]}>최저온도</Text>
                            <Text style={[CommonFont.temperature, { color: CommonColor.main_blue, letterSpacing: 0 }]}>{min}˚</Text>
                        </View>
                        <View style={{ padding: 5, marginRight: 9, alignItems: "center" }}>
                            <Text style={[CommonFont.detail_3]}>최고온도</Text>
                            <Text style={[CommonFont.temperature, { color: CommonColor.etc_red, letterSpacing: 0 }]}>{max}˚</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Humidity width={17} height={17} />
                            <Text style={[CommonFont.detail_2, { color: CommonColor.basic_gray_dark, marginLeft: 10 }]}>습도</Text>
                        </View>
                        <Text style={[CommonFont.detail_2]}>{humidity}%</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Wind width={17} height={17} />
                            <Text style={[CommonFont.detail_2, { color: CommonColor.basic_gray_dark, marginLeft: 10 }]}>바람</Text>
                        </View>
                        <Text style={[CommonFont.detail_2]}>{wind}m/s</Text>
                    </View>
                </View>
                <View style={{ position: "absolute", right: 20 }}>{Weather[icon].icon}</View>
            </LinearGradient>
        </View>
    )
}

export const LocationComponent = ({ item, index, edit, onPressDelete, onPressAdd }) => {
    return (
        <TouchableOpacity
            style={{
                width: "100%",
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderRadius: 10,
                marginBottom: 20,
                borderColor: index === 0 ? CommonColor.main_blue : edit ? CommonColor.etc_red : CommonColor.basic_gray_light,
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row"
            }}
            disabled={edit}
            onPress={onPressAdd}
        >
            <View style={{ flexDirection: "row" }}>
                <Location width={22} height={22} />
                <View style={{ marginLeft: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[CommonFont.detail_2, { color: index === 0 ? CommonColor.main_blue : CommonColor.basic_gray_medium }]}>{index === 0 ? "현재" : "이전"} 위치</Text>
                        <Text style={[CommonFont.detail_2, { color: CommonColor.basic_gray_medium }]}> | {item.date}</Text>
                    </View>
                    <Text style={[CommonFont.heading, { color: index === 0 ? CommonColor.main_black : CommonColor.basic_gray_dark, marginTop: 10 }]}>{item.location}</Text>
                </View>
            </View>
            {edit
                ? index !== 0 && (
                      <TouchableOpacity onPress={onPressDelete}>
                          <Delete />
                      </TouchableOpacity>
                  )
                : index === 0 && <BlueCheck />}
        </TouchableOpacity>
    )
}

export const CardComponent = ({ isMain, month, name, content }) => {
    const season = () => {
        if (month === "3" || month === "4" || month === "5") return "봄"
        if (month === "6" || month === "7" || month === "8") return "여름"
        if (month === "9" || month === 10) return "가을"
        if (month === "1" || month === "2" || month === "11" || month === "12") return "겨울"
    }

    const Icon = {
        반팔: <Clothes />,
        반바지: <Pants />
    }

    return (
        <View style={{ width: isMain ? 136 : 130, height: isMain ? 186 : 168, backgroundColor: isMain && "rgba(255, 255, 255, 0.75)", borderRadius: 10, borderColor: CommonColor.basic_gray_light, borderWidth: 1 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>{Icon[name]}</View>
            <View
                style={{
                    width: "100%",
                    height: isMain ? 56 : 44,
                    flexDirection: isMain ? "column" : "row",
                    backgroundColor: isMain && CommonColor.main_white,
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderColor: CommonColor.basic_gray_light,
                    padding: 9,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10
                }}
            >
                <Text style={[isMain ? CommonFont.body_1 : CommonFont.body_2, { color: isMain && CommonColor.main_blue }]}>{name}</Text>
                {isMain ? <Text style={[CommonFont.detail_3, CommonColor.basic_gray_dark]}>{content}</Text> : <Text style={[CommonFont.body_2, { color: CommonColor.basic_gray_medium }]}>{season()}</Text>}
            </View>
        </View>
    )
}
