import React, { useContext, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { CheckButton, DivisionLine, NormalTextField, PreferSlider, TopAppBar } from "../../../component/ItemComponent";
import { AuthContext } from "../../../context/AuthContext";
import { CommonColor, CommonFont } from "../../../text/CommonStyle";
import useInputLength from "../../../hook/useInputLength";
import Down from "../../../asset/icon/down_arrow"
import Up from "../../../asset/icon/up_arrow_blue"
import Girl from "../../../asset/icon/3d_girl_character"
import Girl2 from "../../../asset/icon/3d_girl_character_2"
import Boy from "../../../asset/icon/3d_boy_character"
import BlueCheck from "../../../asset/icon/check_blue_filled.svg"

 /**
* @dates 2022-08-14
* @author jw
* @description 프로필 변경
*/
const ProfileEditScreen = ({ navigation }) => {
    const { gender, nickname, age, SetMyAge, profileBgColor } = useContext(AuthContext)
    const nicknameInput = useInputLength(nickname, 5)
    const [ageClick, setAgeClick] = useState(false)
    const [genderClick, setGenderClick] = useState(gender)
    const [clickedProfileColor, setClickedProfileColor] = useState(profileBgColor)
    const ageArray = ["10대 이하", "20대", "30대", "40대", "50대 이상"]
    const profileBackground = [CommonColor.profile_background_red, CommonColor.profile_background_yellow, CommonColor.profile_background_green, CommonColor.profile_background_blue, CommonColor.profile_background_purple]
    const [clothesPrefer, setClothesPrefer] = useState(1) // 0 : 얇게 입기, 1 : 보통, 2 : 따뜻하게 입기
    const [weatherPrefer, setWeatherPrefer] = useState(1) // 0 : 자연, 1 : 랜덤, 2 : 도시

    return (
        <View style={{flex:1, backgroundColor: "#fff"}}>
            <TopAppBar title={'프로필 변경'} backVisible={true} hasLine={true} onPress={() => navigation.goBack()}/>
            <ScrollView style={{paddingHorizontal: 16}}>
                <View style={styles.profile}>
                    <View style={styles.profileImage}>
                        {
                            gender === "1" ? <Boy width={84} height={80} /> : <Girl width={84} height={80} />
                        }

                    </View>
                    <View>
                        <Text style={[CommonFont.detail_3, {color: CommonColor.main_blue}]}>현재 프로필</Text>
                        <Text style={[CommonFont.modal_text_1, {color: CommonColor.main_black, marginVertical: 8}]}>{nickname}</Text>
                        <Text style={[CommonFont.detail_4, {color: CommonColor.main_black}]}>선호도 <Text style={[CommonFont.detail_3, {color: CommonColor.main_black}]}>보통</Text></Text>
                        <Text style={[CommonFont.detail_4, {color: CommonColor.main_black}]}>배경 <Text style={[CommonFont.detail_3, {color: CommonColor.main_black}]}>랜덤</Text></Text>
                    </View>
                </View>
                <DivisionLine/>
                <View style={{marginTop: 24}}>
                    <Text style={[CommonFont.heading, styles.textInterval]}>별명</Text>
                    <NormalTextField text={nicknameInput} onSubmitEditing={()=>{}}/>
                </View>
                <View style={{marginTop: 32}}>
                    <Text style={[CommonFont.heading, styles.textInterval]}>연령대</Text>
                    <TouchableOpacity style={[styles.ageBox, {borderColor: ageClick ? CommonColor.main_blue : CommonColor.basic_gray_light}]} onPress={() => setAgeClick(!ageClick)}>
                        <Text style={[CommonFont.body_2, {color: CommonColor.basic_gray_dark}]}>{age ?? "선택되지 않음"}</Text>
                        {
                            ageClick ? <Up/> : <Down/>
                        }
                    </TouchableOpacity>
                    {
                        ageClick &&
                            <View style={styles.ageContainerBox}>
                                {
                                    ageArray.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={[styles.ageContainer, {
                                                              borderTopLeftRadius: index === 0 ? 15 : 0,
                                                              borderTopRightRadius: index === 0 ? 15 : 0,
                                                              borderBottomLeftRadius: index === 4 ? 15 : 0,
                                                              borderBottomRightRadius: index === 4 ? 15 : 0
                                                            }]} 
                                                              onPress={() => {
                                                                  setAgeClick(false)
                                                                  SetMyAge(ageArray[index])
                                                              }
                                                              }>
                                                <Text style={[CommonFont.body_2, {color: CommonColor.basic_gray_dark}]}>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                    }
                    <View style={{marginTop: 32}}>
                        <Text style={[CommonFont.heading, styles.textInterval]}>연령대</Text>
                        <View style={styles.character}>
                            <TouchableOpacity style={[styles.characterBorder, {
                                            backgroundColor: genderClick === "2" ? "#F6F7FF" : null, 
                                            borderWidth: genderClick === "2" ? 2 : 0 }]}
                                            onPress={() => setGenderClick("2")}>
                                <Girl2  />
                                {
                                    genderClick === "2" &&
                                    <View style={{ position: "absolute", bottom: -8, right: -8 }}>
                                        <BlueCheck width={18} height={18} />
                                    </View>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.characterBorder, {
                                            backgroundColor: genderClick === "1" ? "#F6F7FF" : null, 
                                            borderWidth: genderClick === "1" ? 2 : 0 }]}
                                            onPress={() => setGenderClick("1")}>
                                <Boy />
                                {
                                    genderClick === "1" &&
                                    <View style={{ position: "absolute", bottom: -8, right: -8 }}>
                                        <BlueCheck width={18} height={18} />
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 32}}>
                            <Text style={[CommonFont.heading, styles.textInterval]}>프로필 배경색</Text>
                            <View style={styles.profileColorArray}>
                                {
                                    profileBackground.map((item, index) => {
                                        return <TouchableOpacity key={index} 
                                                                onPress={() => setClickedProfileColor(item)}
                                                                style={[styles.profileColor, {
                                                                    backgroundColor: item, 
                                                                    borderColor: clickedProfileColor === item ? CommonColor.main_blue : undefined, 
                                                                    borderWidth: clickedProfileColor === item ? 2 : 0}]}/>
                                    })
                                }
                            </View>
                        </View>
                        {/* <View style={{marginTop: 32}}>
                            <Text style={[CommonFont.heading, styles.textInterval]}>추천 의상 선호도</Text>
                            <PreferSlider prefer={clothesPrefer} setPrefer={setClothesPrefer} topic={"clothes"} />
                        </View>
                        <View style={{marginTop: 32}}>
                            <Text style={[CommonFont.heading, styles.textInterval]}>날씨 배경 선호도</Text>
                            <PreferSlider prefer={weatherPrefer} setPrefer={setWeatherPrefer} topic={"weather"} />
                        </View> */}
                    </View>
                    <View style={{marginTop: 50}}>
                        <CheckButton onPress={{}} text={"확인"}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileColorArray: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileColor: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 30
    },
    characterBorder: {
        width: 174,
        height: 174,
        borderColor: CommonColor.main_blue,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    character: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ageContainer: {
        width: '100%',
        height: 66,
        backgroundColor: CommonColor.basic_gray_light,
        paddingVertical: 22,
        paddingHorizontal: 18,
        marginBottom: 2
    },
    ageContainerBox: {
        marginTop: 8
    },
    ageBox: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: CommonColor.basic_gray_light,
        paddingVertical: 13,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInterval: {
        marginBottom: 18
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: CommonColor.profile_background_blue,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profile: {
        width: '100%',
        height: 120,
        marginVertical: 18,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export default ProfileEditScreen;
