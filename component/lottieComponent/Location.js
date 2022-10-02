import React, { useState } from "react";
import {View} from 'react-native';
import LottieView from "lottie-react-native";

const Location = () => {
  const [completed, setCompleted] = useState(false)

  if (completed) {
    return <></>
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        style={{width: '100%', height: 280}}
        source={require('../../asset/lottie/3dlocation.json')}
        onAnimationFinish={() => setCompleted(true)}
        autoPlay
        loop={true}
      />
    </View>
  )
}

export default Location;
