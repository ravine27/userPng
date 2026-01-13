// theme/fonts.ts

/**
 * Font Configuration for React Native
 * 
 * This defines all font families and weights used throughout the app.
 * Make sure to link these fonts properly using react-native-asset or
 * placing them in android/app/src/main/assets/fonts and ios project.
 */

export const Fonts = {
  cormorant: {
    bold: "CormorantGaramond-Bold",
    regular: "CormorantGaramond-Regular",
    light: "CormorantGaramond-Light",
  },
  garamond: {
    bold: "EBGaramond-Bold",
    extrabold: "EBGaramond-ExtraBold",
    regular: "EBGaramond-Regular",
  },
  georgia: {
    regular: "georgia",
    bold: "georgiab",
  },
  playfair: {
    heading: "PlayfairDisplay-Bold",
  },
  Inter: {
    heading: "Inter_18pt-Black",
    boldHeading: "Inter_18pt-Bold",
    regular: "Inter_24pt-Regular",
    medium: "Inter_24pt-Regular",
  },
  open_sans: {
    heading: "OpenSans_Condensed-Bold",
    boldHeading: "OpenSans-Bold",
    ExtraBold: "OpenSans-ExtraBold",
    regular: "OpenSans-Regular",
    SemiBold: "OpenSans-SemiBold",
  },

  Inter2: {
    // Thin - 100
    thin: 'Inter-Thin',

    // Extra Light - 200
    extraLight: 'Inter-ExtraLight',

    // Light - 300
    light: 'Inter-Light',

    // Regular - 400 (Normal text)
    regular: 'Inter-Regular',

    // Medium - 500 (Slightly bold, good for labels)
    medium: 'Inter-Medium',

    // Semi Bold - 600 (Headings, emphasis)
    semiBold: 'Inter-SemiBold',

    // Bold - 700 (Main headings)
    bold: 'Inter-Bold',
    boldHeading: 'Inter-Bold', // Alias for consistency

    // Extra Bold - 800
    extraBold: 'Inter-ExtraBold',

    // Black - 900 (Heaviest weight)
    black: 'Inter-Black',
  },

  // Alternative font families (if needed)
  Roboto: {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },

  Poppins: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
} as const;

/**
 * Font Sizes - Moderate Scale Responsive
 * Use with moderateScale() for consistency
 */
export const FontSizes = {
  xs: 10,      // Extra small - captions, labels
  sm: 12,      // Small - secondary text
  base: 14,    // Base - body text
  md: 16,      // Medium - primary text
  lg: 18,      // Large - sub headings
  xl: 20,      // Extra large - headings
  '2xl': 24,   // Headings
  '3xl': 28,   // Major headings
  '4xl': 32,   // Hero text
  '5xl': 36,   // Display text
};

/**
 * Font Weights (for platforms that support numeric weights)
 */
export const FontWeights = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

/**
 * Letter Spacing for better typography
 */
export const LetterSpacing = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
  widest: 1,
};

/**
 * Line Heights for readability
 */
export const LineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// Type definitions for TypeScript
export type FontFamily = keyof typeof Fonts;
export type InterFontWeight = keyof typeof Fonts.Inter;
export type Inter2FontWeight = keyof typeof Fonts.Inter2;
export type OpenSansFontWeight = keyof typeof Fonts.open_sans;
export type FontSize = keyof typeof FontSizes;

// Default export
export default Fonts;