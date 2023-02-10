import React, { useState } from "react";
import {View} from 'react-native';
import LottieView from "lottie-react-native";

const Loader = () => {
  const [completed, setCompleted] = useState(false)

  if (completed) {
    return <></>
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "transparent" }}>
      <LottieView
        style={{width: '100%', height: 700 }}
        source={require('../../asset/lottie/loading.json')}
        onAnimationFinish={() => setCompleted(true)}
        autoPlay
        loop={true}
      />
    </View>
  )
}

export default Loader;
