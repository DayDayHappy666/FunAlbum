import { useLayoutEffect, useState } from "react";
import React, { ActivityIndicator, Modal, TouchableWithoutFeedback, StyleSheet, View, Animated, Easing } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { runOnJS } from "react-native-reanimated";
import PreviewNavigationHeader from "./componet/PreviewNavigationHeader";
import PreviewFooter from "./componet/PreviewFooter";
import FastImage from "react-native-fast-image";
import shareMedia from "./business/controller/ShareMediaController";

const PreviewNewScreen = ({ route, navigation }) => {

    const [headerShown, setHeaderShown] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [loadingStates, setLoadingStates] = useState({});

    // footer相关
    // footer展示删除弹窗的modal使用
    const [footerIconOpacity, seFooterIconOpacity] = useState(1);
    const [deleteModalAnimation] = useState(new Animated.Value(0));
    const [deletingPhoto, setDeletingPhoto] = useState(false);
    const [deletePhotoModalVisible, setDeletePhotoModalVisible] = useState(false);
    const [likePhoto, setLikePhoto] = useState(false);

    const { medias, initialIndex } = route.params;

    const testMedias = [{
        "uri": "https://unsplash.it/400/400?image=1",
        "type": "image/jpg"
    },
    {
        "uri": "https://unsplash.it/400/400?image=10",
        "type": "image/jpg"
    },]

    FastImage.preload(testMedias)
    const mediaUrls = medias.map(media => ({
        url: media.uri,  // 假设每个 `image` 对象有一个 `url` 属性
        type: media.type,
        // 这里可以添加更多的属性，如宽度、高度等
        props: {
            // 如果需要，可以在这里添加自定义的 Image 属性
        }
    }));

    console.log('PreviewNewScreen mediaUrls is', mediaUrls, ' initialIndex is ', initialIndex)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: headerShown,
        });
    }, [headerShown, navigation]);

    const handleLoadStart = (uri) => {
        console.log('handleLoadStart...')
        setLoadingStates(prev => ({ ...prev, [uri]: true }));
    };

    const handleLoadEnd = (uri) => {
        console.log('handleLoadEnd...')
        setLoadingStates(prev => ({ ...prev, [uri]: false }));
    };

    const handleImageClick = () => {
        runOnJS(() => {
            setHeaderVisible(!headerVisible)
            console.log('headerVisible is ', headerVisible, 'backgroundColor is ', backgroundColor)
        })();
    };

    const getCurrentImageUrl = () => {
        return mediaUrls[initialIndex] ? mediaUrls[initialIndex].url : null;
      };

    // 点击分享图标时触发
    const handleShareIconPress = () => {
        shareMedia(getCurrentImageUrl());
    }


    // 点击收藏图标时触发
    const handleLikeIconPress = () => {
        setLikePhoto(!likePhoto);
    }

    // 点击删除照片的图标时触发
    const handleDeleteIconPress = () => {
        
        setDeletePhotoModalVisible(true);
        seFooterIconOpacity(1);
        Animated.timing(deleteModalAnimation, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }

    // 关闭模态框时的动画
    const handleCancelDeletePress = () => {
        Animated.timing(deleteModalAnimation, {
            toValue: 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            setDeletePhotoModalVisible(false);
            seFooterIconOpacity(1);
        });
    };

    const handleConfirmDelete = () => {
        seFooterIconOpacity(1);
        // 在这里处理删除逻辑
        setDeletePhotoModalVisible(false);
        reset();
    };

    const reset = () => {
        setDeletePhotoModalVisible(true);

    };

    const renderMedia = (props) => {
        const { source, index } = props;
        console.log('source is ', source)
        const media = mediaUrls.find(media => media.url === source.uri);
        console.log('media is', source, ' index is ', index, ' media.url is ', media.url, ' media.type is ', media.type)

        console.log('here,loadingStates is', loadingStates[source.uri])
        return (
            <FastImage
                style={styles.image}
                source={{
                    uri: media.url,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                onLoadStart={() => handleLoadStart(source.uri)}
                onLoadEnd={() => handleLoadEnd(source.uri)}
            />
        )
    }

    const renderHeader = () => {
        if (headerVisible) {
            return (
                <PreviewNavigationHeader
                    onClose={onClose}
                />
            );
        }
        return null;
    };

    const renderFooter = () => {
        if (headerVisible) {
            return (
                <PreviewFooter
                    handleShareIconPress={handleShareIconPress}
                    handleLikeIconPress={handleLikeIconPress}
                    handleDeleteIconPress={handleDeleteIconPress}
                    handleCancelDeletePress={handleCancelDeletePress}
                    handleConfirmDelete={handleConfirmDelete}
                    reset={reset}
                    deletePhotoModalVisible={deletePhotoModalVisible}
                    deletingPhoto={deletingPhoto}
                    footerIconOpacity={footerIconOpacity}
                    likePhoto={likePhoto}
                />
            );
        }
        return null;
    }

    const onClose = () => {
        navigation.goBack()
    }

    return (
        <View style={[styles.container, { backgroundColor }]}>

            <ImageViewer
                style={styles.medias}
                imageUrls={mediaUrls}
                onClick={handleImageClick}
                index={initialIndex}
                enableSwipeDown={true}
                onCancel={onClose}
                backgroundColor={backgroundColor}
                renderIndicator={() => { }}
                renderImage={renderMedia}
                renderHeader={renderHeader}
                renderFooter={renderFooter}

            />
            {/* 暗背景 */}
            { deletePhotoModalVisible && <View style={styles.modalBackground} /> }
            
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    modalBackground: {
        // flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(150, 150, 150, 0.3)', // 背景透明度
    },

    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medias: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
    },
    video: {
        flex: 1,
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
    },
})

export default PreviewNewScreen;