import { Image, StyleSheet, View } from "react-native"
import { EMPTY_LINK_ID, WHITE_COLOR, IMAGE_STORAGE } from "../tools/consts";
import {Image as CacheImage}  from 'expo-image';//'react-native-expo-image-cache';

const ProductImageFast = ({ imageID, imageFormat }) => {
    //console.log(`${IMAGE_STORAGE}${imageID}.${imageFormat}`);
    return (
        <View style={styles.container}>
            {imageID === EMPTY_LINK_ID ?
                (<CacheImage 
                    source = {require(`./../assets/no-image-icon.png`)}
                    style={styles.productImage}
                />)
                :
                (<CacheImage 
                    source={{ uri: `${IMAGE_STORAGE}${imageID}.${imageFormat}`}}
                    style={styles.productImage}
                />)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        marginBottom: 15,
        marginTop: 10,
        borderRadius: 30,
    },
    productImage: {
        contentFit: 'contain',
        transition: { duration: 300 },
        width: '100%',
        height: '100%',
    },
});

export default ProductImageFast