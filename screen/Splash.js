import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { View, Animated, Easing, StyleSheet } from "react-native";
import { CommonColor } from "../text/CommonStyle";

const Splash = () => {
  const [completed, setCompleted] = useState(false)

  if (completed) {
    return <></>
  }

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: CommonColor.main_blue}}>
      <LottieView
        style={{width: '75%'}}
        source={require('../asset/lottie/splash.json')}
        onAnimationFinish={() => setCompleted(true)}
        autoPlay
        loop={false}
      />
    </View>
  )
}

export default Splash;
