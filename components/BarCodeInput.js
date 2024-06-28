import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native';
import { MAIN_COLOR, WHITE_COLOR } from '../tools/consts';

const BarcodeInput = ({ setBarCode }) => {
    const [inputDate, setInputDate] = useState('');
    const InputRef = useRef(null);

    const handleInputChange = (text) => {
        setInputDate(text);
    };

    const handleScanBarcode = () => {
        setBarCode(inputDate);
        setInputDate('');
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                keyboardType="numeric"
                placeholder="Введіть код або штрих-код"
                onChangeText={handleInputChange}
                value={inputDate}
                onSubmitEditing={handleScanBarcode}
            />
            <TouchableOpacity style={styles.button} onPress={handleScanBarcode}>
                <Text style={styles.buttonText}>🔍 Пошук</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginRight: 10,
        borderColor: MAIN_COLOR,
    },
    input: {
        marginRight: 5,
        borderWidth: 1,
        borderColor: MAIN_COLOR,
        backgroundColor: WHITE_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,

    },
    button: {
        backgroundColor: MAIN_COLOR, // Задає колір кнопки
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
      },
      buttonText: {
        color: WHITE_COLOR, // Колір тексту кнопки
        fontSize: 16,
      },
});

export default BarcodeInput
