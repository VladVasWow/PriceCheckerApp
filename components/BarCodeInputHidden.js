import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard, AppState } from 'react-native';
import * as NavigationBar from "expo-navigation-bar";

const BarCodeInputHidden = ({ setBarCode }) => {
    const [inputDate, setInputDate] = useState('');
    const hiddenInputRef = useRef(null);

    const handleInputChange = (text) => {
        setBarCode(text);
        setInputDate('')
    };

    const handleScanBarcode = () => {
        setBarCode(inputDate);
        setInputDate('');
    };

    const hideStatusBar = () => {
        NavigationBar.setVisibilityAsync('hidden');
    }

    useEffect(() => {
        // Автоматичне фокусування на hiddenInput
        if (hiddenInputRef.current) {
            hiddenInputRef.current.focus();
        }

        // Блокуємо показ віртуальної клавіатури
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            Keyboard.dismiss();
        });

        const appStateEventListener = AppState.addEventListener("change", () => {
            if (hiddenInputRef.current) {
                hiddenInputRef.current.focus();
            }
        });

        return () => {
            showSubscription.remove();
            AppState.removeEventListener("change", appStateEventListener);
        };

    }, []);
    
    return (
        <View style={styles.container}>
            <TextInput
                ref={hiddenInputRef}
                autoFocus={true}
                onChangeText={handleInputChange}
                value={inputDate}
                onSubmitEditing={handleScanBarcode}
                showSoftInputOnFocus={false}
                onFocus={hideStatusBar}
                onBlur={hideStatusBar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        opacity: 0,
        height: 0,
        width: 0,
    },
});

export default BarCodeInputHidden
