import React, {useState, useEffect} from "react";
import {Platform, StyleSheet} from "react-native";

export const CommonColor = StyleSheet.create({
    main_blue: {
        color: '#4165FF'
    },
    main_sub_blue: {
        color: '#517EFF',
    },
    basic_black: {
        color: "#010101",
    },
    main_white: {
        color: "#FFFFFF",
    },
    basic_gray_light: {
        color: "#F6F6F9",
    },
    basic_gray_medium: {
        color: "#DADCE0",
    },
    basic_gray_dark: {
        color: "#596168",
    },
    etc_red: {
        color: "#F03B4C",
    },
    label_background_red: {
        color: "#FFF1F1"
    },
    label_text_red:{
        color: "#FF5959"
    },
    label_background_orange: {
        color: "#FFF4EE"
    },
    label_text_orange: {
        color: "#FF824D"
    },
    label_background_blue: {
        color: "#F0F6FF"
    },
    label_text_blue: {
        color: "#4165FF"
    },
    label_background_purple: {
       color: "#F4F4FF"
    },
    label_text_purple: {
        color: "#5959FF"
    }
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
