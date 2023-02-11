/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react"
import type { Node } from "react"
import AppNavigator from "./navigation/AppNavigator"
import Splash from "./component/lottieComponent/Splash"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App: () => Node = () => {
    return (
        <>
            <Splash />
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </>
    )
}

export default App
