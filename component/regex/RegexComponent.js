import validator from 'validator';
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isEmail from "validator/lib/isEmail";

export const numOnlyRegex = /^[0-9]*$/;
export const priceOnlyRegex = /^[0-9,]*$/;
export const characterOnlyRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/;
export const koreanOnlyRegex = /^[ㄱ-ㅎ가-힣]*$/;
export const passwordOnlyRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+|<>?:{}])[0-9a-zA-Z~!@#$%^&*()_+|<>?:{}]{8,20}$/;
export const phoneNumOnlyRegex = (text) => isMobilePhone(text, 'ko-KR');
export const emailOnlyRegex = (text) => isEmail(text);
