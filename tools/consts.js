import { Dimensions } from 'react-native';

export const EMPTY_LINK_ID = "00000000-0000-0000-0000-000000000000";

export const MARKET_PLACES = [
  {label: 'Дискаунт ВЕНА', value: '0cb53088-5204-11e5-9a04-002590efab51'},
  {label: 'Дискаунт Ремзавод', value: '6645a683-21ed-11e8-aba6-0050568ffc5f'}
];

//export const IMAGE_STORAGE = 'http://img.vena.com.ua/web-storage/pict/';
export const IMAGE_STORAGE = 'https://1csync.mailcn.com.ua:9443/web-storage/pict/';

export const MAIN_COLOR = '#002e62';
export const SECONDARY_COLOR = '#e8eff7';
export const WHITE_COLOR = '#fff';
export const ALARM_COLOR = '#f55050';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const GuidelineBaseHeight = 540; // Ваша базова висота
const GuidelineBaseWidth = 670; // Ваша базова ширина

export const verticalScale = (size, floor = true, setMax = false) => {
  size = parseFloat(size);
  console.log(screenHeight, GuidelineBaseHeight);
  let result = screenHeight / GuidelineBaseHeight * size;
  let newSize = floor ? Math.floor(result) : result;
  return setMax && newSize > size ? size : newSize;
};