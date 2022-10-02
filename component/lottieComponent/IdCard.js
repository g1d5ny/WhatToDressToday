import React, { useState } from "react";
import {View} from 'react-native';
import LottieView from "lottie-react-native";

const IdCard = () => {
  const [completed, setCompleted] = useState(false)

  if (completed) {
    return <></>
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        style={{width: '100%', height: 800}}
        source={require('../../asset/lottie/3didcard.json')}
        onAnimationFinish={() => setCompleted(true)}
        autoPlay
        loop={true}
      />
    </View>
  )
}

export default IdCard;
