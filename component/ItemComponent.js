import React, { useState } from "react"
import { View, Text, TouchableOpacity, Platform, TextInput } from "react-native"
import "dayjs/locale/ko"
import dayjs from "dayjs"
import { CommonColor, CommonFont } from "../text/CommonStyle"
import Toast from "react-native-toast-message"
import { characterOnlyRegex } from "./regex/RegexComponent"
import Search from "../asset/icon/search_small.svg"
import GrayDot from "../asset/icon/gray_dot.svg"
import Back from "../asset/icon/back_arrow.svg"
import Hand1 from "../asset/icon/3d_hand_1.svg"
import Hand2 from "../asset/icon/3d_hand_2.svg"
import Hand3 from "../asset/icon/3d_hand_3.svg"
import BlueCheck from "../asset/icon/check_blue_filled.svg"
import DownArrow from "../asset/icon/down_arrow.svg"
import UpArrow from "../asset/icon/up_arrow.svg"
import Sunny from "../asset/icon/sunny.svg"
import Snow from "../asset/icon/snowy.svg"
import Shower from "../asset/icon/shower.svg"
import Cloudy from "../asset/icon/cloudy.svg"
import Overcast from "../asset/icon/overcast.svg"
import Fog from "../asset/icon/fog.svg"
import Rainy from "../asset/icon/rainny.svg"
import HeavySnowy from "../asset/icon/heavy_snowy.svg"
import PartyCloudy from "../asset/icon/party_cloudy.svg"
import Lightning from "../asset/icon/lightning.svg"
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

let utc = require("dayjs/plugin/utc")
let timezone = require("dayjs/plugin/timezone")
dayjs.extend(utc)
dayjs.extend(timezone)

export const Chips = ({ season }) => {
    const SeasonFunc = () => {
        switch (season) {
            case "봄":
                return { width: 35, backgroundColor: CommonColor.label_background_red, TextColor: CommonColor.label_text_red }
            case "여름":
                return {
                    width: 41,
                    backgroundColor: CommonColor.label_background_blue,
                    TextColor: CommonColor.label_text_blue
                }
            case "가을":
                return {
                    width: 41,
                    backgroundColor: CommonColor.label_background_orange,
                    TextColor: CommonColor.label_text_orange
                }
            case "겨울":
                return {
                    width: 41,
                    backgroundColor: CommonColor.label_background_purple,
                    TextColor: CommonColor.label_text_purple
                }
        }
    }

    return (
        <View
            style={{
                width: SeasonFunc().width,
                height: 20,
                backgroundColor: SeasonFunc().backgroundColor,
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Text style={[CommonFont.regular_12, { color: SeasonFunc().TextColor }]}>{season}</Text>
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
                <Text style={[CommonFont.semi_bold_16, { color: clicked === "A" ? CommonColor.basic_black : CommonColor.basic_gray_medium }]}>{A}</Text>
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
                <Text style={[CommonFont.semi_bold_16, { color: clicked === "B" ? CommonColor.basic_black : CommonColor.basic_gray_medium }]}>{B}</Text>
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
            <Text style={[CommonFont.semi_bold_18, { color: CommonColor.main_white }]}>{text}</Text>
        </TouchableOpacity>
    )
}

export const CheckButtonRectangle = ({ activate, text, onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={{
                width: "100%",
                height: 55,
                backgroundColor: activate ? CommonColor.main_blue : CommonColor.basic_gray_medium,
                alignItems: "center",
                justifyContent: "center"
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[CommonFont.semi_bold_18, { color: CommonColor.main_white }]}>{text}</Text>
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
                    CommonFont.regular_16,
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
                placeholderTextColor={CommonFont.regular_16}
            />
            <Text
                style={[
                    CommonFont.regular_14,
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
                return { borderWidth: 2, color: CommonColor.main_blue, text: "사용 가능한 별명입니다." }
            } else return { borderWidth: 2, color: CommonColor.etc_red, text: "사용 불가능한 별명입니다. (특수문자,공백 제외 5글자)" }
        } else return { borderWidth: 2, color: CommonColor.basic_gray_light }
    }

    return (
        <View>
            <TextInput
                value={text.value}
                onChangeText={text.onChange}
                onSubmitEditing={onSubmitEditing}
                autoCorrect={false}
                style={[
                    CommonFont.regular_16,
                    {
                        width: "100%",
                        height: 50,
                        borderRadius: 10,
                        paddingLeft: 20,
                        borderWidth: NicknameFunction().borderWidth,
                        borderColor: NicknameFunction().color
                    }
                ]}
            />
            <Text
                style={[
                    CommonFont.regular_14,
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

export const AddressTextField = ({ address, onSubmitEditing, listData, onFocus, onBlur }) => {
    const ListDataError = () => {
        return {
            borderWidth: address.value.length > 0 ? 2 : 0,
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
                    padding: 17,
                    borderWidth: ListDataError().borderWidth,
                    borderColor: ListDataError().color
                }}
            >
                <Search />
                <TextInput
                    value={address.value}
                    onChangeText={address.onChange}
                    placeholderTextColor={CommonColor.basic_gray_medium}
                    placeholder={"도로명을 제외한 행정구역까지만 입력해주세요."}
                    onSubmitEditing={onSubmitEditing}
                    autoCorrect={false}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    style={[
                        CommonFont.regular_16,
                        {
                            flex: 1,
                            marginLeft: 14
                        }
                    ]}
                />
            </View>
            <Text
                style={[
                    CommonFont.regular_14,
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

export const PreferSlider = () => {
    const [prefer, setPrefer] = useState(1)

    return (
        <View style={{ width: "100%", height: 10, flexDirection: "row", alignItems: "center" }}>
            <View
                style={{
                    flex: 0.5,
                    height: "100%",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    backgroundColor: CommonColor.main_blue
                }}
            />
            <View
                style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    backgroundColor: prefer >= 2 ? CommonColor.main_blue : CommonColor.basic_gray_light
                }}
            />
            <View
                style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    backgroundColor: prefer >= 3 ? CommonColor.main_blue : CommonColor.basic_gray_light
                }}
            />
            <View
                style={{
                    flex: 0.5,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: CommonColor.basic_gray_light
                }}
            />
            {prefer === 1 ? (
                <>
                    <TouchableOpacity
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
                            position: "absolute",
                            left: "14%"
                        }}
                        onPress={() => setPrefer(1)}
                    />
                    <Text
                        style={[
                            CommonFont.semi_bold_14,
                            {
                                color: CommonColor.main_blue,
                                position: "absolute",
                                top: 20,
                                left: 53
                            }
                        ]}
                    >
                        얇게
                    </Text>
                </>
            ) : (
                <>
                    <TouchableOpacity style={{ padding: 8, position: "absolute", left: "14%" }} onPress={() => setPrefer(1)}>
                        <GrayDot />
                    </TouchableOpacity>
                    <Text
                        style={[
                            CommonFont.regular_14,
                            {
                                color: CommonColor.basic_gray_dark,
                                position: "absolute",
                                top: 20,
                                left: 53
                            }
                        ]}
                    >
                        얇게
                    </Text>
                </>
            )}
            {prefer === 2 ? (
                <>
                    <TouchableOpacity
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
                            position: "absolute",
                            left: "46%"
                        }}
                        onPress={() => setPrefer(2)}
                    />
                    <Text
                        style={[
                            CommonFont.semi_bold_14,
                            {
                                color: CommonColor.main_blue,
                                position: "absolute",
                                top: 20,
                                left: 178
                            }
                        ]}
                    >
                        보통
                    </Text>
                </>
            ) : (
                <>
                    <TouchableOpacity style={{ padding: 8, position: "absolute", left: "46%" }} onPress={() => setPrefer(2)}>
                        <GrayDot />
                    </TouchableOpacity>
                    <Text
                        style={[
                            CommonFont.regular_14,
                            {
                                color: CommonColor.basic_gray_dark,
                                position: "absolute",
                                top: 20,
                                left: 178
                            }
                        ]}
                    >
                        보통
                    </Text>
                </>
            )}
            {prefer === 3 ? (
                <>
                    <TouchableOpacity
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
                            position: "absolute",
                            right: "14%"
                        }}
                        onPress={() => setPrefer(3)}
                    />
                    <Text
                        style={[
                            CommonFont.semi_bold_14,
                            {
                                color: CommonColor.main_blue,
                                position: "absolute",
                                top: 20,
                                right: 42
                            }
                        ]}
                    >
                        따뜻하게
                    </Text>
                </>
            ) : (
                <>
                    <TouchableOpacity style={{ padding: 8, position: "absolute", right: "14%" }} onPress={() => setPrefer(3)}>
                        <GrayDot />
                    </TouchableOpacity>
                    <Text
                        style={[
                            CommonFont.regular_14,
                            {
                                color: CommonColor.basic_gray_dark,
                                position: "absolute",
                                top: 20,
                                right: 42
                            }
                        ]}
                    >
                        따뜻하게
                    </Text>
                </>
            )}
        </View>
    )
}

export const TopBar = ({ title, text, onPress }) => {
    return (
        <View
            style={{
                width: "100%",
                height: 52,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: CommonColor.basic_gray_light
            }}
        >
            <Text style={[CommonFont.semi_bold_18, { flex: 1, textAlign: "center" }]}>{title}</Text>

            {text && (
                <TouchableOpacity onPress={onPress}>
                    <Text style={[CommonFont.regular_16, { right: 20, color: CommonColor.main_blue }]}>{text}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export const DivisionLine = () => {
    return <View style={{ width: "100%", height: 8, backgroundColor: CommonColor.basic_gray_light }} />
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
            <Text style={[CommonFont.regular_16]}>{selected ? selected : "선택되지 않음"}</Text>
            <TouchableOpacity onPress={() => setOpen(!open)}>{open ? <UpArrow /> : <DownArrow />}</TouchableOpacity>
        </TouchableOpacity>
    )
}

export const DailyWeather = ({ date, day, weather, high, low }) => {
    const Weather = () => {
        switch (weather) {
            case "Sunny":
                return { icon: <Sunny />, text: "맑음" }
            case "Snow":
                return { icon: <Snow />, text: "눈" }
            case "HeavySnowy":
                return { icon: <HeavySnowy />, text: "폭섩" }
            case "Shower":
                return { icon: <Shower />, text: "소나기" }
            case "PartyCloudy":
                return { icon: <PartyCloudy />, text: "구름 조금" }
            case "Cloudy":
                return { icon: <Cloudy />, text: "흐림" }
            case "Lightning":
                return { icon: <Lightning />, text: "천둥 번개" }
            case "Overcast":
                return { icon: <Overcast />, text: "흐림" }
            case "Hail":
                return { icon: <Hail />, text: "약한 비" }
            case "Fog":
                return { icon: <Fog />, text: "안개" }
            case "Sleet":
                return { icon: <Sleet />, text: "진눈깨비" }
            case "Rainy":
                return { icon: <Rainy />, text: "비" }
        }
    }

    return (
        <View
            style={{
                width: "100%",
                height: 59,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderColor: CommonColor.basic_gray_light,
                paddingHorizontal: 22,
                paddingVertical: 20
            }}
        >
            <Text style={[CommonFont.regular_16]}>
                {date} <Text style={[CommonFont.semi_bold_16]}>{day}</Text>
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {Weather().icon}
                <Text style={[CommonFont.regular_16, { marginLeft: 8 }]}>{Weather().text}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TempHigh width={12} height={12} />
                <Text style={[CommonFont.regular_16, { color: CommonColor.basic_gray_dark, marginLeft: 10 }]}>{high}˚</Text>
                <View
                    style={{
                        height: 16,
                        borderWidth: 1,
                        borderColor: CommonColor.basic_gray_light,
                        marginLeft: 10,
                        marginRight: 10
                    }}
                />
                <TempLow width={12} height={12} />
                <Text style={[CommonFont.regular_16, { color: CommonColor.basic_gray_dark, marginLeft: 10 }]}>{low}˚</Text>
            </View>
        </View>
    )
}

export const WeatherCard = ({ month, date, high, low, humidity, location, wind, weather }) => {
    // TODO 날씨에 맞게 background color
    const Weather = () => {
        switch (weather) {
            case "Sunny":
                return { icon: <TdSunny width={133} height={134} />, backgroundColor: "rgb(255, 250, 226)" }
            case "Snow":
                return { icon: <TdSnow width={154} height={125} />, backgroundColor: "rgb(230, 242, 253)" }
            // case 'HeavySnowy': return { icon: <HeavySnowy />, text: "폭섩" }
            // case 'Shower': return { icon: <Shower />, text: "소나기" }
            case "PartyCloudy":
                return { icon: <TdPartyCloudy width={174} height={111} />, backgroundColor: "rgb(241, 243, 255)" }
            case "Cloudy":
                return { icon: <TdCloudy width={150} height={97} />, backgroundColor: "rgb(241, 252, 255)" }
            case "Thunder":
                return { icon: <TdThunder width={150} height={134} />, backgroundColor: "rgb(228, 230, 242)" }
            // case 'Overcast': return { icon: <Overcast />, text: "흐림" }
            // case 'Hail': return { icon: <Hail />, text: "약한 비" }
            // case 'Fog': return { icon: <Fog />, text: "안개" }
            // case 'Sleet': return { icon: <Sleet />, text: "진눈깨비" }
            case "Rainy":
                return { icon: <TdRainy width={158} height={132} />, backgroundColor: "rgb(239, 245, 245)" }
        }
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
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: CommonColor.basic_gray_light
                }}
            >
                <Text style={[CommonFont.regular_16]}>
                    {month}월 {date}일 <Text style={[CommonFont.semi_bold_16]}>오늘</Text>
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Location width={17} height={17} />
                    <Text style={[CommonFont.regular_16]}>{location}</Text>
                </View>
            </View>
            <LinearGradient
                colors={[Weather().backgroundColor, "#fff"]}
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
                        <View style={{ padding: 5, marginRight: 9, alignItems: "center" }}>
                            <Text style={[CommonFont.regular_12]}>최고온도</Text>
                            <Text style={[CommonFont.semi_bold_35, { color: CommonColor.etc_red, letterSpacing: 0 }]}>{high}˚</Text>
                        </View>
                        <View style={{ padding: 5, alignItems: "center" }}>
                            <Text style={[CommonFont.regular_12]}>최저온도</Text>
                            <Text style={[CommonFont.semi_bold_35, { color: CommonColor.main_blue, letterSpacing: 0 }]}>{low}˚</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Humidity width={17} height={17} />
                            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark, marginLeft: 10 }]}>습도</Text>
                        </View>
                        <Text style={[CommonFont.regular_14]}>{humidity}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Wind width={17} height={17} />
                            <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_dark, marginLeft: 10 }]}>바람</Text>
                        </View>
                        <Text style={[CommonFont.regular_14]}>{wind}m/s</Text>
                    </View>
                </View>
                <View style={{ position: "absolute", right: 20 }}>{Weather().icon}</View>
            </LinearGradient>
        </View>
    )
}

export const LocationComponent = ({ item, index, edit, onPress }) => {
    return (
        <View
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
        >
            <View style={{ flexDirection: "row" }}>
                <Location width={22} height={22} />
                <View style={{ marginLeft: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[CommonFont.regular_14, { color: index === 0 ? CommonColor.main_blue : CommonColor.basic_gray_medium }]}>{index === 0 ? "현재" : "이전"} 위치</Text>
                        <Text style={[CommonFont.regular_14, { color: CommonColor.basic_gray_medium }]}> | {item.date}</Text>
                    </View>
                    <Text style={[CommonFont.semi_bold_18, { color: index === 0 ? CommonColor.basic_black : CommonColor.basic_gray_dark, marginTop: 10 }]}>{item.location}</Text>
                </View>
            </View>
            {edit
                ? index !== 0 && (
                      <TouchableOpacity onPress={onPress}>
                          <Delete />
                      </TouchableOpacity>
                  )
                : index === 0 && <BlueCheck />}
        </View>
    )
}
