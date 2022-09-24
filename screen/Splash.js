import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { View, Animated, Easing, StyleSheet } from "react-native";

const Splash = () => {
  const [completed, setCompleted] = useState(false)

  if (completed) {
    return <></>
  }

  return (
    <View style={{width: '100%', height: '100%'}}>
      <LottieView
        source={require('../asset/lottie/progressbar_hanger.json')}
        onAnimationFinish={() => setCompleted(true)}
        autoPlay loop={false}
      />
    </View>
  )
}

export default Splash;
