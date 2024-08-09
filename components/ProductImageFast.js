import { useState } from "react";
import { Image, StyleSheet, View } from "react-native"
import { postQuery1C } from "../tools/workWith1C";
import { EMPTY_LINK_ID, WHITE_COLOR, IMAGE_STORAGE } from "../tools/consts";
import {Image as CacheImage}  from 'react-native-expo-image-cache';

const ProductImageFast = ({ connectParams, imageID, imageFormat }) => {

    return (
        <View style={styles.container}>
            {imageID === EMPTY_LINK_ID ?
                (<Image 
                    source = {require(`./../assets/no-image-icon.png`)}
                    style={styles.productImage}
                />)
                :
                (<CacheImage 
                    uri= {`${IMAGE_STORAGE}${imageID}.${imageFormat}`}
                    //options= {{headers}}
                    style={styles.productImage}
                    resizeMode = {"contain"}
                    
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
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});

export default ProductImageFast