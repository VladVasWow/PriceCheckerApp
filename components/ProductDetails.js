import { StyleSheet, Text, View } from "react-native"
import { ALARM_COLOR, MAIN_COLOR, WHITE_COLOR, verticalScale } from "../tools/consts";

const ProductDetails = ({ product }) => {
    const [intPartPrice, fracPartPrice] = product.price.toFixed(2).split('.');
    return (
        <View style={styles.container}>
            <Text style={styles.textCode}>
                Код товару: {product.code}
            </Text>
            <View style={{ width: '100%' }}>
                <Text style={styles.textPriceLabel}>
                    Ціна за {product.unitName}:
                </Text>
                {product.discount ?
                    <View style={styles.containerOldPrice}>
                        <Text style={styles.textOldPrice}>
                            {product.oldPrice.toFixed(2)}
                        </Text>
                        <Text style={styles.textDiscount}>
                            -{product.discount.toFixed(1)} %
                        </Text>
                    </View>
                    :
                    <></>
                }
                <View style={styles.containerPrice}>
                    <Text style={styles.textPrice}>
                        {intPartPrice}
                    </Text>
                    <Text style={styles.textCoins}>
                        {fracPartPrice}
                    </Text>
                    <Text style={styles.textCurrency}>
                        {product.currency}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center', // Вирівнювання по вертикалі

    },
    containerCode: {
        alignContent: 'center',

    },
    containerPrice: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',

    },
    containerOldPrice:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
    },

    textCode: {
        textAlign: 'center',
        fontSize: verticalScale(32),
        fontWeight: "600",
        color: MAIN_COLOR,

    },
    textCurrency: {
        fontSize: verticalScale(72),
        fontWeight: "800",
        color: MAIN_COLOR,
        textAlignVertical: "bottom",
        paddingBottom: 20,

    },
    textPriceLabel: {
        textAlign: 'center',
        fontSize: verticalScale(32),
        fontWeight: "600",
        color: MAIN_COLOR,
        marginBottom: 10,
    },
    textPrice: {
        fontSize: verticalScale(120),
        fontWeight: "800",
        color: MAIN_COLOR,

    },
    textCoins: {
        fontSize: verticalScale(32),
        fontWeight: "800",
        color: MAIN_COLOR,
        textDecorationLine: 'underline',
        textDecorationStyle: 'double',
        paddingTop: 20,
    },
    textUnit: {
        fontSize: verticalScale(32),
        marginRight: 20,
        fontWeight: "800",
        color: MAIN_COLOR,
        textAlignVertical: 'center',
    },

    textOldPrice: {
        opacity: 0.3,
        fontSize: verticalScale(42),
        textDecorationLine: 'line-through',
    },
    textDiscount: {
        backgroundColor: ALARM_COLOR,
        fontSize: verticalScale(42),
        color: WHITE_COLOR,
        fontWeight: "600",
        paddingHorizontal: 20,
        borderRadius: 20,
    }

});

export default ProductDetails