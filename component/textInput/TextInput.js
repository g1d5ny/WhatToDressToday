import React from "react";
import {TextInput} from "react-native";

export const TextInputComponent = ({inputText, ref, multiline, keyboardType, maxLength, placeholder, placeholderTextColor, onSubmitEditing, style, onFocus, onBlur}) => {
  return (
    <TextInput
      onChangeText={inputText.onChange}
      value={inputText.value}
      {...inputText}
      ref={ref}
      multiline={multiline}
      keyboardType={keyboardType ? 'number-pad' : undefined}
      maxLength={maxLength}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      autoCorrect={false}
      autoCapitalize={'none'}
      onSubmitEditing={onSubmitEditing}
      textAlignVertical={"top"}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}
