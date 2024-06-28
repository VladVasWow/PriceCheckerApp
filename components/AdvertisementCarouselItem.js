import { Dimensions, StyleSheet, Text, View } from "react-native";
import ProductImage from "./ProductImage";
import { ALARM_COLOR, MAIN_COLOR, WHITE_COLOR, verticalScale } from "../tools/consts";
import ProductImageFast from "./ProductImageFast";

const { width: screenWidth } = Dimensions.get('window');

const AdvertisementCarouselItem = ({ item, connectParams }) => {
  const [intPartPrice, fracPartPrice] = item.price.toFixed(2).split('.');

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <ProductImageFast connectParams={connectParams} imageID={item.imageID} ></ProductImageFast>
        </View>
        <View style={styles.priceUnitContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.intPartPrice} >{intPartPrice}</Text>
            <Text style={styles.fracPartPrice} >{fracPartPrice}</Text>
          </View>
          <Text style={styles.unit}>{item.currency}/{item.unitName}</Text>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.caption}>{item.code}, {item.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: '95%',
    padding: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,

    shadowColor: 'rgba(0, 4, 44, 0.6)',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 20,
  },
  imageContainer: {
    width: '100%',
    height: '85%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'contain',
    position: 'absolute',
  },
  textContainer: {
    height: '15%',
    backgroundColor: MAIN_COLOR,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
  },
  caption: {
    width: '100%',
    fontSize: verticalScale(24),
    color: WHITE_COLOR,
    textAlign: 'center',
  },
  priceUnitContainer: {
    margin: 30,
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    backgroundColor: ALARM_COLOR,
    borderRadius: screenWidth * 0.075,
    justifyContent: 'center',
  },
  priceContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: 'center',
    alignContent: "center",
  //  backgroundColor: "green"
  },
  intPartPrice: {
    color: MAIN_COLOR,
    fontSize: verticalScale(50),
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -3, // Зміна відстані між символами
  },
  fracPartPrice: {
    color: MAIN_COLOR,
    fontSize: verticalScale(16),
    fontWeight: '800',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
  
  },
  unit: {
    color: MAIN_COLOR,
    fontSize: verticalScale(20),
    fontWeight: '500',
    textAlign: 'center',
    //backgroundColor: "yellow",
  }
});

export default AdvertisementCarouselItem;