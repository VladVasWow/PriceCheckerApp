import { View, Text, StyleSheet } from "react-native";
import ProductImageFast from "./ProductImageFast";
import ProductDetails from "./ProductDetails";
import { MAIN_COLOR, WHITE_COLOR, verticalScale } from "../tools/consts";
import { useEffect } from "react";

const ProductItem = ({ connectParams, product, setProduct }) => {

    useEffect(() => {
            const timer = setTimeout(() => {
                setProduct(undefined)
            }, 10000); // затримка перед очищенням product
            return () => clearTimeout(timer);
    }, [product]);

    return (
        <View style={styles.containerProduct}>
            <View style={styles.containerName}>
                <Text style={styles.textName}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >{product.name}</Text>
            </View>
            <View style={styles.containerInfo}>
                <ProductImageFast connectParams={connectParams} imageID={product.imageID} imageFormat={product.imageFormat}></ProductImageFast>
                <ProductDetails product={product}></ProductDetails>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerProduct: {
        flex: 1,
    },
    containerInfo: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
    },
    containerName: {
        alignContent: 'center',
        backgroundColor: MAIN_COLOR,

    },
    textName: {
        color: WHITE_COLOR,
        textAlign: 'center',
        fontSize: verticalScale(52),
        fontWeight: "600",
        padding: 5,
    },
});

export default ProductItem