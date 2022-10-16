import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  NativeModules,
  Keyboard,
  KeyboardAvoidingView, TouchableWithoutFeedback, FlatList,
} from "react-native";
import { AddressTextField, LocationComponent, TopBar } from "../../component/ItemComponent";
import useInput from "../../hook/useInput";
import { SearchAddressFunction } from "../../function/search/SearchAddressFunction";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @dates 2022-08-14
 * @author jw
 * @description 위치 변경
 */
const LocationChangeScreen = () => {
  const { StatusBarManager } = NativeModules;
  const {myLocation, myLocations, date} = useContext(AuthContext);

  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [addressFocus, setAddressFocus] = useState(false);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);

  const address = useInput("");

  useEffect(() => {
    Platform.OS === "ios" ? StatusBarManager.getHeight((statusBarFrameData) => {
      setStatusBarHeight(statusBarFrameData.height);
    }) : null;
    LocationDateMap()
  }, []);

  const LocationDateMap = async () => {
    let map = new Map();

    const myLocations = await AsyncStorage.getItem("myLocations")
    const myLocationsList = JSON.parse(myLocations)

    const myDate = await AsyncStorage.getItem("date")
    const myDateList = JSON.parse(myDate)

    if (myLocations !== null && myDate !== null) {
      myLocationsList.map((item, index) => {
        map.set(item, myDateList[index]);
      })
      console.log("map: ", map);
      setLocationList(map);
    }
  }

  const RenderItem = ({item, index}) => {
    const getByValue = (locationList, searchValue) => {
      for (let [key, value] of locationList.entries()) {
        if (value === searchValue)
          return key;
      }
    }

    return (
      item.map(item, index)
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{
        flex: 1,
        backgroundColor: "#fff",
        // justifyContent: addressFocus ? "space-between" : undefined,
      }} behavior={"padding"} keyboardVerticalOffset={statusBarHeight}>
        <TopBar title={"위치 설정"} line={true} text={"편집"} />
        <View style={{paddingHorizontal: 15}}>
          <AddressTextField address={address} onFocus={() => setAddressFocus(true)} listData={listData}
                            onSubmitEditing={() => {
                              setListData([]);
                              SearchAddressFunction(setListData, setLoading, address.value);
                            }}
                            onBlur={() => setAddressFocus(false)} />
          <LocationComponent location={myLocation} currentLocation={true}/>
          {/*{*/}
          {/*  locationList.map((item, index) => {*/}
          {/*    return <RenderItem item={item} index={index}/>*/}
          {/*  })*/}
          {/*}*/}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default LocationChangeScreen;
