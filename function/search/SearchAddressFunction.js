import { Alert } from "react-native"
import { TextAlarm } from "../../text/AlarmText"

export const SearchAddressFunction = async (setListData, setLoading, query) => {
    const key = "8a95a11fdcfc3ef9b55dcffcbff12914"
    setLoading(true)
    try {
        const xobj = new XMLHttpRequest()
        xobj.open("GET", "https://dapi.kakao.com/v2/local/search/address.json?query=" + encodeURIComponent(query), true)
        xobj.setRequestHeader("Authorization", "KakaoAK " + key)
        xobj.onreadystatechange = async function () {
            if (xobj.readyState !== 4) {
                return
            }
            const jsonResponse = JSON.parse(xobj.response)
            if (jsonResponse.errorType !== undefined || jsonResponse.meta.total_count === 0) {
                setListData(["NOT_FOUND"])
                return
            }
            setListData(jsonResponse.documents)
        }
        xobj.send()
        setLoading(false)
    } catch (e) {
        Alert.alert(TextAlarm.error_0, e.message)
        console.error(e)
    }
}

export const AddressToCoordinate = async address => {
    try {
        return new Promise(function (resolve, reject) {
            const xobj = new XMLHttpRequest()
            xobj.open("GET", "https://dapi.kakao.com/v2/local/search/address.json?query=" + address, true)
            xobj.setRequestHeader("Authorization", "KakaoAK b59ff3937ee712fcc589f4f1adeeaa21")
            xobj.onreadystatechange = function () {
                if (xobj.readyState !== 4) {
                    return
                }
                if (xobj.status === 200) {
                    const jsonResponse = JSON.parse(xobj.response)
                    resolve(jsonResponse)
                } else {
                    Alert.alert(TextAlarm.error_0, xobj.status)
                    console.warn("server error", xobj.status)
                }
            }
            xobj.send()
        })
    } catch (e) {
        Alert.alert(TextAlarm.error_0, e.message)
        console.error(e)
    }
}

export const CoordinateToAddress = async (lng, lat) => {
    try {
        return new Promise(function (resolve, reject) {
            const xobj = new XMLHttpRequest()
            xobj.open("GET", "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + lng + "&y=" + lat + "&input_coord=WGS84", true)
            xobj.setRequestHeader("Content-type", "application/json")
            xobj.setRequestHeader("Authorization", "KakaoAK b59ff3937ee712fcc589f4f1adeeaa21")
            xobj.onreadystatechange = function () {
                if (xobj.readyState !== 4) {
                    return
                }
                if (xobj.status === 200) {
                    //console.log('success', xobj.response);
                    const jsonResponse = JSON.parse(xobj.response)
                    resolve(jsonResponse)
                } else {
                    Alert.alert(TextAlarm.error_0, xobj.status)
                    console.warn("server error", xobj.status)
                }
            }
            xobj.send()
        })
    } catch (e) {
        Alert.alert(TextAlarm.error_0, e.message)
        console.error(e)
    }
}

export const JibunToRoadAddress = async (jibunAddress, setRoadAddress, setLoading) => {
    try {
        const xobj = new XMLHttpRequest()
        xobj.open("POST", "https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=" + "U01TX0FVVEgyMDIxMTEwOTE2NTcwOTExMTg2MTc=" + "&currentPage=" + 1 + "&countPerPage=30&keyquery=" + jibunAddress + "&resultType=json", true)
        xobj.setRequestHeader("Content-type", "application/juso_support_center/json")
        xobj.onreadystatechange = async function () {
            if (xobj.readyState !== 4) {
                return
            }
            if (xobj.status === 200) {
                const jsonResponse = JSON.parse(xobj.response)
                if (jsonResponse.results.common.errorCode === "0") {
                    if (jsonResponse.results.juso[0] !== undefined) {
                        setRoadAddress(jsonResponse.results.juso[0].roadAddr)
                    } else {
                        setRoadAddress(undefined)
                    }
                    setLoading(false)
                } else if (jsonResponse.results.common.errorCode === "E0008" || jsonResponse.results.common.errorCode === "E0006") {
                    Alert.alert(jsonResponse.results.common.errorMessage)
                    setLoading(false)
                } else {
                    Alert.alert(jsonResponse.results.common.errorMessage)
                    setLoading(false)
                }
            } else {
                Alert.alert(TextAlarm.error_0, xobj.status)
                console.warn("server error", xobj.status)
            }
        }
        xobj.send()
    } catch (e) {
        Alert.alert(TextAlarm.error_0, e.message)
        console.error(e)
    }
}
