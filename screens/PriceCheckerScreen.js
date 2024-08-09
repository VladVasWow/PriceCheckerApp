import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarcodeInput from "../components/BarCodeInput";
import BarCodeInputHidden from "../components/BarCodeInputHidden";
import { postQuery1C } from "../tools/workWith1C";
import { EMPTY_LINK_ID, SECONDARY_COLOR } from "../tools/consts";
import AdvertisementCarousel from "../components/AdvertisementCarousel";
import ProductItem from "../components/ProductItem";
import ErrorMassage from "../components/ErrorMassage";
import CountMassage from "../components/CountMassage";
import { dateReviver } from "../tools/format";

const PriceCheckerScreen = ({ connectParams }) => {
  const [product, setProduct] = useState(undefined);
  const [barCode, setBarCode] = useState('');
  const [error, setError] = useState('');
  const [showScanCount, setShowScanCount] = useState(false);
  const [scanCountData, setScanCountData] = useState({ dataFrom: "", scanCount: 0 });

  // Під час завантаження компонента, отримуємо збережені дані з локального сховища про кількість сканувань
  useEffect(() => {
    AsyncStorage.getItem('scanCountData')
      .then(storageString => storageString ? JSON.parse(storageString, dateReviver) : { dataFrom: new Date(), scanCount: 0 })
      .then(storageData => {
        setScanCountData(storageData);
      })
  }, []);

  // збільшемо лічильник сканувань на 1 
  useEffect(() => {
    if (product) {
      setScanCountData((prev) => {
        const newCount = { dataFrom: prev.dataFrom, scanCount: prev.scanCount + 1 };
        return newCount;
      });
    }
  }, [product]);

  // збережемо показники лічильника
  useEffect(() => {
    if (scanCountData) {
      AsyncStorage.setItem("scanCountData", JSON.stringify(scanCountData))
      console.log(scanCountData);
    }
  }, [scanCountData]);

  // 
  useEffect(() => {
    async function getProduct() {
      result = await postQuery1C.getProductByBarCode(connectParams, barCode);
      setProduct(result.product);
      setError(result.error);
      setBarCode("");
      setShowScanCount(false);
    }
    // якщо проскановано QR з текстом EMPTY_LINK_ID то покажему кількість сканувань
    if (barCode === EMPTY_LINK_ID) {
      setProduct(undefined);
      setBarCode("");
      setError("");
      setShowScanCount(true);
    }
    else if (barCode) {
      getProduct()
    }
  }, [barCode])

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
          product={product}
          setProduct={setProduct}>
        </ProductItem>
        : error ?
          <ErrorMassage error={error} setError={setError}>
          </ErrorMassage>
          : showScanCount ?
            <CountMassage scanCountData={scanCountData} setScanCountData={setScanCountData} setShowScanCount={setShowScanCount}>
            </CountMassage>
            :
            <AdvertisementCarousel connectParams={connectParams} setError={setError}>
            </AdvertisementCarousel>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SECONDARY_COLOR,
    height: "100%",
    width: "100%",
    borderStyle: 'solid',
    borderColor: 'blue',
    borderWidth: 1,
  }
});

export default PriceCheckerScreen
