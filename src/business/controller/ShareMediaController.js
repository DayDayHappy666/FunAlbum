import React, { useState } from 'react';
import Share from 'react-native-share';


const shareMedia = (uri) => {
    if (!uri) {
        console.log("uri is invalid")
        return;
    }
    const shareOptions = {
        title: '分享标题', // iOS 专用
        message: '分享的消息内容', // 至少提供一个 url 或 message
        url: uri, // 要分享的网址或文件路径
    };

    Share.open(shareOptions)
        .then((res) => { console.log(res); })
        .catch((err) => { console.log(err); });

}



export default shareMedia;