import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scaleSize, ICON_SIZE, IMAGE_FOOTER_ICON } from "../utils/scaleSize";
import commonStyles from "../utils/style"
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const PreviewNavigationHeader = ({ onClose }) => {
    return (
            <SafeAreaView style={[styles.header, commonStyles.glassBackground]}>
                <TouchableOpacity onPress={onClose} style={styles.headerButton}>
                        <Icon name="arrow-back-ios" size={ICON_SIZE} color="#007AFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>星期二</Text>
                    <MaterialCommunityIcon name="dots-horizontal-circle-outline" size={IMAGE_FOOTER_ICON} color="#007AFF" />
                    <View style={styles.headerButton} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: scaleSize(94),
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: scaleSize(15),
        zIndex: 10,
    },

    headerButton: {
        width: scaleSize(44), // 固定宽度，用于保持左右对称
        padding: scaleSize(10),
        justifyContent: 'center', // 垂直方向居中
    },
    headerTitle: {
        color: 'black',
        fontSize: scaleSize(15),
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1, // 让标题占据剩余空间
    },

    middlePart : {
        color: 'black',
        flex: 1,
    }
});


export default PreviewNavigationHeader;