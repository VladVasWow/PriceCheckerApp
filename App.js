import { useEffect, useState } from 'react';
import PriceCheckerScreen from './screens/PriceCheckerScreen';
import ConnectParamsScreen from './screens/ConnectParamsScreen';
import { setStatusBarHidden } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { AppState, Platform, View } from 'react-native';
import { SECONDARY_COLOR } from './tools/consts';

export default function App() {
  const [connectParams, setConnectParams] = useState(null)

  const [screenDimensions, setScreenDimensions] = useState({ height: "100%", width: "100%" });
  const { height: screenHeight, width: screenWidth } = screenDimensions;

  useEffect(() => {
    async function hideStatusBarAndNavigationBar() {
      console.log("change");
      setStatusBarHidden(true, "none")

      if (Platform.OS === "android") {
        // Make it overlay the screen await 
        await NavigationBar.setBehaviorAsync("overlay-swipe");
        // Hide it
        await NavigationBar.setVisibilityAsync("hidden")
      }
    }

    hideStatusBarAndNavigationBar();

    //const appStateEventListener = AppState.addEventListener("change", () => { hideStatusBarAndNavigationBar() });

    //return () => { AppState.removeEventListener("change", appStateEventListener); }

  }, [])

  return (
    <View style={{ height: screenHeight, width: screenWidth, overflow: "hidden", backgroundColor: SECONDARY_COLOR }}>
      {(connectParams ? <PriceCheckerScreen connectParams={connectParams}></PriceCheckerScreen> :
        <ConnectParamsScreen setConnectParams={setConnectParams}></ConnectParamsScreen>)}
    </View>
  );
}

