import React, { useContext } from "react"
import WeatherPresenter from "./WeatherPresenter"
import { AuthContext } from "../../context/AuthContext"

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherContainer = ({ navigation }) => {
    const { skinColor, gender, nickname, myLocationArray } = useContext(AuthContext)

    return <WeatherPresenter navigation={navigation} skinColor={skinColor} gender={gender} nickname={nickname} myLocationArray={myLocationArray} />
}
export default WeatherContainer
