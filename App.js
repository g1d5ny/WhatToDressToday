/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TextInput,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import useInput from "./hook/useInput";
import { CommonFont } from "./text/CommonStyle";

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [value, setValue] = useState('value');

  const backgroundStyle = {
    flex:1,
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: "#fff",
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{flex:1, backgroundColor: "#fff"}}>
        <TextInput
          style={[CommonFont.regular_12, {
            width: 200, fontSize: 15, marginLeft:50, marginTop:100,borderBottomWidth: 1, borderColor: "black"}]}
          placeholder={'jion의 개발일지'}
          onSubmitEditing={() => console.log('return')}
          multiline={false}
          autoCorrect={true}
          />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
