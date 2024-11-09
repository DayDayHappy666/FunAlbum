import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const guideLineBaseWidth = 375;

export const scaleSize = (size) => (width / guideLineBaseWidth) * size;
export const ICON_SIZE = width * 0.06;
export const IMAGE_FOOTER_ICON = width * 0.07;