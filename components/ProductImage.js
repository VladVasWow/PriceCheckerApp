import { Image, StyleSheet, View } from "react-native"
import { EMPTY_LINK_ID, IMAGE_STORAGE, WHITE_COLOR } from "../tools/consts";

const ProductImage = ({ imageID, imageFormat }) => {

    return (
        <View style={styles.container}>
            {imageID === EMPTY_LINK_ID ?
                (<Image
                    source={{ uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/No_photo_%282067963%29_-_The_Noun_Project.svg/1024px-No_photo_%282067963%29_-_The_Noun_Project.svg.png` }}
                    style={styles.productImage}
                />)
                :
                (<Image
                    source={{ uri: `${IMAGE_STORAGE}${imageID}.${imageFormat}` }}
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
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});

export default ProductImage