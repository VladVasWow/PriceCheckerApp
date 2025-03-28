import * as ExpoZebraScanner from 'expo-zebra-scanner';

export const createBasicDatawedgeProfile = () => {
    ExpoZebraScanner.createIntentDatawedgeProfile(CONFIGURE_PROFILE);
};

const CONFIGURE_PROFILE = {
    PROFILE_NAME: 'PriceCheckerDatawedge',
    PACKAGE_NAME: 'com.vladwow.PriceCheckerApp',
};

const createProfile = () => {
    ExpoZebraScanner.sendActionCommand('com.symbol.datawedge.api.CREATE_PROFILE', PROFILE_NAME);
    ExpoZebraScanner.sendActionCommand('com.symbol.datawedge.api.SET_CONFIG', CONFIGURE_BARCODES);
    ExpoZebraScanner.sendActionCommand('com.symbol.datawedge.api.SET_CONFIG', CONFIGURE_INTENT);
    ExpoZebraScanner.sendActionCommand('com.symbol.datawedge.api.SET_CONFIG', CONFIGURE_KEYSTROKE);
};

const PROFILE_NAME = "ExpoDatawedgeExample"; // Name of the profile to create

// Configure datawedge to read ean11, interleaved2of5 and link our app to the profile
const CONFIGURE_BARCODES = {
    PROFILE_NAME,
    PROFILE_ENABLED: 'true',
    CONFIG_MODE: 'UPDATE',
    PLUGIN_CONFIG: {
        PLUGIN_NAME: 'BARCODE',
        RESET_CONFIG: 'true',
        PARAM_LIST: {
            scanner_selection: 'auto',
            decoder_code11: 'true',
            decoder_i2of5: 'true',
        },
    },
    APP_LIST: [
        {
            PACKAGE_NAME: 'expo.modules.zebrascanner.example', // Your app package
            ACTIVITY_LIST: ['*'],
        },
    ],
};

// Setup the intent action. The action is static and need to be as declared on ExpoZebraScannerModule.kt
// Maybe a future enhancement of the package will allow you to change the action
const CONFIGURE_INTENT = {
    PROFILE_NAME,
    PROFILE_ENABLED: 'true',
    CONFIG_MODE: 'UPDATE',
    PLUGIN_CONFIG: {
        PLUGIN_NAME: 'INTENT',
        RESET_CONFIG: 'true',
        PARAM_LIST: {
            intent_output_enabled: 'true',
            intent_action: "com.symbol.datawedge.ACTION_BARCODE_SCANNED", // The action specified in ExpoZebraScannerModule.kt
            intent_delivery: '2', // Broadcast
        },
    },
};

// Tell datawedge we don't want keystroke
const CONFIGURE_KEYSTROKE = {
    PROFILE_NAME,
    PROFILE_ENABLED: 'true',
    CONFIG_MODE: 'UPDATE',
    PLUGIN_CONFIG: {
        PLUGIN_NAME: 'KEYSTROKE',
        RESET_CONFIG: 'true',
        PARAM_LIST: {
            keystroke_output_enabled: 'false', // Disable keystroke
        },
    },
};