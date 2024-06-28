import { StyleSheet, View } from "react-native";
import BarcodeInput from "../components/BarCodeInput";
import BarCodeInputHidden from "../components/BarCodeInputHidden";
import { useEffect, useState } from "react";
import { postQuery1C } from "../tools/workWith1C";
import { SECONDARY_COLOR } from "../tools/consts";
import AdvertisementCarousel from "../components/AdvertisementCarousel";
import ProductItem from "../components/ProductItem";
import ErrorMassage from "../components/ErrorMassage";

const PriceCheckerScreen = ({ connectParams }) => {
  const [product, setProduct] = useState(undefined);
  const [barCode, setBarCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {

    async function getProduct() {
      result = await postQuery1C.getProductByBarCode(connectParams, barCode);
      //console.log(result)
      setProduct(result.product);
      setError(result.error)
      setBarCode("");
    }
    if (barCode) {
      getProduct()
    }
  }, [barCode])

  useEffect(() => {
    const timer = setTimeout(() => {
      setProduct(undefined)
    }, 10000); // 1 хвилина
    return () => clearTimeout(timer);
  }, [product]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('')
    }, 10000); // 1 хвилина
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <View style={styles.container}>
      {connectParams.isUseScaner ?
      <BarCodeInputHidden setBarCode={setBarCode}></BarCodeInputHidden>
      :
      <BarcodeInput setBarCode={setBarCode}></BarcodeInput>
      }
      {product ?
        <ProductItem
          connectParams={connectParams}
          product={product}>
        </ProductItem>
        : error ?
          <ErrorMassage
            error={error}
          ></ErrorMassage>
          :
          <AdvertisementCarousel connectParams={connectParams}>
          </AdvertisementCarousel>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SECONDARY_COLOR,
    height: "100%",
    borderStyle: 'solid',
    borderColor: 'blue',
    borderWidth: 1,
  }
});

export default PriceCheckerScreen
