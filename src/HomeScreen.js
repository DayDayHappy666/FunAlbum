import React, { useState } from 'react';
import { View, Button, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { launchImageLibrary } from 'react-native-image-picker';
import { scaleSize } from "./utils/scaleSize";

const HomeScreen = ({ navigation }) => {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState({}); 

  // setMedias([
  //   {
  //     "url": "https://unsplash.it/400/400?image=1",
  //     "type": "image"
  //   },
  //   {
  //     "url": "https://unsplash.it/400/400?image=2",
  //     "type": "image"
  //   },
  // ])


  const selectMedias = () => {
    launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: 0,
      includeBase64: false,
    }, (response) => {
      if (response.assets) {
        const selectedMedias = response.assets.map((asset) => ({
          uri: asset.uri,
          type: asset.type,
        }));
        setMedias(selectedMedias);
      }
    });
  };

  const handleLoadStart = (uri) => {
    console.log('>>> handleLoadStart， uri is', uri);
    setLoading((prev) => ({ ...prev, [uri]: true }));
  };

  const handleLoadEnd = (uri) => {
    console.log('<<< handleLoadEnd uri is', uri);
    setLoading((prev) => ({ ...prev, [uri]: false }));
  };

  const renderMedia = ({ item, index }) => {

    const isLoading = loading[item.uri];

    console.log('==================');
    // console.log('Rendering media:', item);
    // console.log('Media type:', item.type);
    // console.log('Media URI:', item.uri);


    const isImage = item.type.includes('image');
    const isVideo = item.type.includes('video');
    console.log('video bool is ', isVideo)
    console.log('image bool is ', isImage)
  
    return (
      <TouchableOpacity onPress={() => navigation.navigate('PreviewScreen', { medias, initialIndex: index })}>
        {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
        {isImage && <FastImage
          style={styles.image}
          source={{
            uri: item.uri,
          }}
          resizeMode={FastImage.resizeMode.cover}
          onLoadStart={() => handleLoadStart(item.uri)}
          onLoadEnd={() => handleLoadEnd(item.uri)}
        />
        }
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Select Meidas" onPress={selectMedias} />
      <FlatList
        data={medias}
        renderItem={renderMedia}
        keyExtractor={(item) => item.uri}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container: { 
      flex: 1, 
      justifyContent: 'center',
       alignItems: 'center', 
      backgroundColor: 'white' 
    },
    image: {
      width: scaleSize(122), 
      height: scaleSize(122), 
      margin: scaleSize(2),
    }

  }
)

export default HomeScreen;

