import React, {useState, useEffect} from "react";
import {Platform, StyleSheet} from "react-native";

export const CommonColor = StyleSheet.create({
    main_blue: '#4165FF',
    main_sub_blue: '#517EFF',
    basic_black: "#010101",
    main_white: "#FFFFFF",
    basic_gray_light: "#F6F6F9",
    basic_gray_medium: "#DADCE0",
    basic_gray_dark: "#596168",
    etc_red: "#F03B4C",
    label_background_red: "#FFF1F1",
    label_text_red: "#FF5959",
    label_background_orange: "#FFF4EE",
    label_text_orange: "#FF824D",
    label_background_blue: "#F0F6FF",
    label_text_blue: "#4165FF",
    label_background_purple: "#F4F4FF",
    label_text_purple: "#5959FF"
})

export const CommonFont = StyleSheet.create({
    semi_bold_24: {
        fontSize: 24,
        color: "#010101",
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1,
    },
    semi_bold_18: {
        fontSize: 18,
        color: "#010101",
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1,
    },
    semi_bold_16: {
        fontSize: 16,
        color: "#010101",
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1,
    },
    semi_bold_14: {
        fontSize: 14,
        color: "#010101",
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1,
    },
    regular_16: {
        fontSize: 16,
        color: "#010101",
        fontFamily: "Pretendard-Regular",
        letterSpacing: -0.5,
    },
    regular_14: {
        fontSize: 14,
        color: "#010101",
        fontFamily: "Pretendard-Regular",
        letterSpacing: -0.5,
    },
    regular_12: {
        fontSize: 12,
        color: "#010101",
        fontFamily: "Pretendard-Regular",
        letterSpacing: -0.5,
    },
})
