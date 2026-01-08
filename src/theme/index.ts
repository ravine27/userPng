import Fonts, { FontSizes } from "./fonts";

export * from "./colors";
export * from "./spacing";
export * from "./radius";
export * from "./fonts";
export * from "./shadows";
export type FontFamily = keyof typeof Fonts;
export type InterFontWeight = keyof typeof Fonts.Inter;
export type Inter2FontWeight = keyof typeof Fonts.Inter2;
export type OpenSansFontWeight = keyof typeof Fonts.open_sans;
export type FontSize = keyof typeof FontSizes;
