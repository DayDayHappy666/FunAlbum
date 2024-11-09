import { useLayoutEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, Modal, Button, Animated, Easing, TouchableWithoutFeedback } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { scaleSize, IMAGE_FOOTER_ICON } from "../utils/scaleSize";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from "../utils/style"

const { width, height } = Dimensions.get('window');
console.log('width ====', width)

const PreviewFooter = (props) => {
    // console.log("PreviewFooter widht is ", width);
    const { handleShareIconPress, handleLikeIconPress, handleCancelDeletePress, handleDeletePress, handleDeleteIconPress, handleConfirmDelete, deletePhotoModalVisible, footerIconOpacity, likePhoto } = props;
    const [isPressDeleteBtn, setIsPressDeleteBtn] = useState(false);
    const [isPressCancleBtn, setIsPressCancleBtn] = useState(false);

    const pressInDelBtn = () => {
        console.log("come in..")
        setIsPressDeleteBtn(true);
    }

    const pressOutDelBtn = () => {
        setIsPressDeleteBtn(false);
    }

    const longPressDelBtn = () => {
        setIsPressDeleteBtn(true);
    }

    const pressInCancleBtn = () => {
        setIsPressCancleBtn(true);
    }

    const pressOutCancleBtn = () => {
        setIsPressCancleBtn(false);
    }

    const longPressCancleBtn = () => {

    }

    return <View style={[styles.footer, commonStyles.glassBackground]}>
        <View style={[styles.iconsArea, {opacity: footerIconOpacity}]}>
            <TouchableOpacity style={styles.footerIcon} onPress={handleShareIconPress}>
                <MaterialIcon name="ios-share" size={IMAGE_FOOTER_ICON} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerIcon} onPress={handleLikeIconPress}>
                { 
                    likePhoto ? ( <MaterialCommunityIcon name="heart" size={IMAGE_FOOTER_ICON} color="#007AFF" /> )
                    : ( <MaterialCommunityIcon name="heart-outline" size={IMAGE_FOOTER_ICON} color="#007AFF" /> )
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerIcon} onPress={handleDeleteIconPress}>
                <MaterialCommunityIcon name="trash-can-outline" size={IMAGE_FOOTER_ICON} color="#007AFF" />
            </TouchableOpacity>
        </View>

        {/* 删除确认对话框 */}
        {/* <View> */}
        {/* 删除按钮 */}
        <Modal
            transparent={true}
            animationType="slide"
            visible={deletePhotoModalVisible}
            onRequestClose={handleCancelDeletePress}>
            <Animated.View style={[styles.modalContainer]}>
                <View style={styles.confirmDeleteView}>
                    <Text style={styles.tipText}>此照片将从软件上删除,它将在“最近删除”中保留30天</Text>
                    <View style={styles.separator} />

                    <TouchableWithoutFeedback
                        style={styles.touchableButton}
                        onPress={handleDeletePress}
                        onPressIn={pressInDelBtn}
                        onPressOut={pressOutDelBtn}
                    // onLongPress={longPressDelBtn}
                    >
                        <View style={isPressDeleteBtn && styles.pressButtonActive}>
                            <Text style={styles.deletePhotoText}>删除照片</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

                <TouchableWithoutFeedback
                    style={styles.touchableButton}
                    onPress={handleCancelDeletePress}
                    onPressIn={pressInCancleBtn}
                    onPressOut={pressOutCancleBtn}>
                    <View style={[styles.cancleDeletePhotoView, isPressCancleBtn && styles.pressButtonActive]}>
                        <Text style={styles.cancleDeletePhotoText}>取消</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </Modal>
        
        {/*  */}

    </View>
}

const styles = StyleSheet.create({
    footer: {
        width: width,
    },

    iconsArea: {
        flex: 1,
        height: scaleSize(90),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        opacity: 0,
    },

    footerIcon: {
        zIndex: 10,
        alignItems: 'center',
    },

    modalContainer: {
        width: '100%',
        height: scaleSize(140),
        position: 'absolute',  // 确保容器是绝对定位的
        bottom: scaleSize(25),             // 将模态框放到底部
        paddingHorizontal: scaleSize(15),

        backgroundColor: 'rgba(254, 254, 254, 0)',
        // backgroundColor: 'blue',

        shadowColor: 'black',
        shadowOffset: { width: 0, height: scaleSize(-2) },
        shadowOpacity: scaleSize(0.1),
        shadowRadius: scaleSize(10),
        elevation: scaleSize(2),
    },

    confirmDeleteView: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // 背景透明度
        // backgroundColor: 'grey', 
        height: scaleSize(80),
        borderTopLeftRadius: scaleSize(10),
        borderTopRightRadius: scaleSize(10),
        borderBottomLeftRadius: scaleSize(10), // 添加这个
        borderBottomRightRadius: scaleSize(10), // 添加这个
    },

    tipText: {
        textAlign: 'center',
        marginVertical: scaleSize(10),
        fontSize: scaleSize(10),
        color: 'grey',
    },

    touchableButton: {
        // backgroundColor: 'black', // 按钮的背景色
        // flex: 1,
        // height: scaleSize(50),
        // justifyContent: 'center', // 确保文本在按钮中上下居中
        // alignItems: 'center',     // 确保文本在按钮中左右居中
    },

    pressButtonActive: {
        // backgroundColor: 'grey',
        backgroundColor: 'rgba(200, 200, 200, 1)',
        // height: scaleSize(40),
        flex: 1,

    },

    deletePhotoText: {
        textAlign: 'center',
        fontSize: scaleSize(18),
        color: '#FF3B30',
        marginVertical: scaleSize(12),
    },

    cancleDeletePhotoView: {
        marginTop: scaleSize(10),
        backgroundColor: 'white',
        height: scaleSize(45),
        borderTopLeftRadius: scaleSize(10),
        borderTopRightRadius: scaleSize(10),
        borderBottomLeftRadius: scaleSize(10), // 添加这个
        borderBottomRightRadius: scaleSize(10), // 添加这个
    },

    cancleDeletePhotoText: {
        textAlign: 'center',
        fontSize: scaleSize(18),
        marginVertical: scaleSize(12),
        color: '#007AFF',
    },

    buttonContainer: {
        justifyContent: 'space-around',

    },
    button: {
        // flex: 1,
        padding: scaleSize(10),
        alignItems: 'center',
        borderRadius: scaleSize(5),
        backgroundColor: '#007AFF',
        marginHorizontal: scaleSize(50), // 额外的左右间距
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    separator: {
        width: '100%',            // 或根据需要调整宽度
        height: scaleSize(0.09),               // 分隔线的厚度
        backgroundColor: 'black', // 分隔线的颜色，可调整为适合的灰色
        alignSelf: 'center',
        // marginVertical: 10,      // 上下留白
    },

})

export default PreviewFooter;