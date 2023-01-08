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
export const dp = (px) => {
    return px / PixelRatio.get()
}


export const CommonFont = StyleSheet.create({
    bold_on_boarding: {
        fontSize: 24,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.48),
        lineHeight: 32
    },
    body_2: {
        fontSize: 16,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.32),
        lineHeight: 22
    },
    heading: {
        fontSize: 18,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.36),
        lineHeight: 24
    },
    main_text: {
        fontSize: 26,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.52),
        lineHeight: 36
    },
    temperature: {
        fontSize: 35,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.1),
        lineHeight: 42
    },
    temperature2: {
        fontSize: 66,
        color: CommonColor.main_white,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.1),
        lineHeight: 79,
    },
    body_1: {
        fontSize: 16,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.32),
        lineHeight: 22
    },
    detail_1: {
        fontSize: 14,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.14),
        lineHeight: 20
    },
    detail_2: {
        fontSize: 14,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.14),
        lineHeight: 20
    },
    detail_3: {
        fontSize: 12,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.12),
        lineHeight: 14
    },
    modal_text_1: {
        fontSize: 20,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.4),
        lineHeight: 28
    },
    button_1: {
        fontSize: 18,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.36),
        lineHeight:22
    },
    detail_4: {
        fontSize: 12,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.12),
        lineHeight: 14
    },
    button_2: {
        fontSize: 18,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.14),
        lineHeight: 20
    },
    modal_text_2: {
        fontSize: 10,
        color: CommonColor.basic_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.12),
        lineHeight: 16
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
