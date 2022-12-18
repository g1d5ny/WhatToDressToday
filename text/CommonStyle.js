import React, { useState, useEffect, useCallback } from "react"
import { PixelRatio, Platform, StyleSheet } from "react-native"

export const CommonColor = StyleSheet.create({
    main_blue: "#4165FF",
    main_sub_blue: "#517EFF",
    basic_black: "#202020",
    main_white: "#FFFFFF",
    basic_gray_light: "#F6F6F9",
    basic_gray_medium: "#DADCE0",
    basic_gray_dark: "#596168",
    etc_red: "#F03B4C",
    moon_yellow: "#FAF0B6",
    sun_yellow: "#FFC554",
    label_background_red: "#FFF1F1",
    label_text_red: "#FF5959",
    label_background_orange: "#FFF4EE",
    label_text_orange: "#FF824D",
    label_background_blue: "#F0F6FF",
    label_text_blue: "#4165FF",
    label_background_purple: "#F4F4FF",
    label_text_purple: "#5959FF"
})

// const SizeFormatter = size => {
//     const ratio = PixelRatio.get()
//     console.log("ratio: ", ratio)
//     return size / ratio
// }

// dp(123) converts 123px (px as in your mockup design) to dp.
export const dp = (px: number) => {
    return px / PixelRatio.get()
}

export const CommonFont = StyleSheet.create({
    semi_bold_35: {
        fontSize: 35,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1
    },
    semi_bold_26: {
        fontSize: 26,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1
    },
    bold_on_boarding: {
        fontSize: 24 / PixelRatio.getFontScale(),
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        lineHeight: 26 / PixelRatio.getFontScale(),
        letterSpacing: dp(-2)
    },
    semi_bold_20: {
        fontSize: 20,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1
    },
    semi_bold_18: {
        fontSize: 18,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1
    },
    semi_bold_16: {
        fontSize: 16,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1
    },
    semi_bold_14: {
        fontSize: 14,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1
    },
    semi_bold_12: {
        fontSize: 12,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: -1
    },
    bold_16: {
        fontSize: 16,
        color: CommonColor.label_background_blue,
        fontFamily: "Pretendard-Bold",
        letterSpacing: -1
    },
    regular_18: {
        fontSize: 18,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: -0.5
    },
    regular_16: {
        fontSize: 16,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: -0.5
    },
    regular_14: {
        fontSize: 14,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: -0.5
    },
    regular_12: {
        fontSize: 12,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: -0.5
    },
    regular_10: {
        fontSize: 10,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: -0.5
    }
})

export const ShadowStyle = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.68,
    elevation: 11
}

export const TextShadowStyle = {
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowRadius: 8
}
