import { StyleSheet } from 'react-native';
import { scaleSize } from './scaleSize'; // 确保正确导入你的 scaleSize 函数

const commonStyles = StyleSheet.create({
    glassBackground: {
        backgroundColor: 'rgba(254, 254, 254, 0.97)', // 半透明背景
        // iOS 阴影效果
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: scaleSize(0.2),
        shadowRadius: scaleSize(4),
        // Android 阴影效果
        elevation: scaleSize(4),
        elevation: 5, // Android 阴影效果
    },
});

export default commonStyles;
