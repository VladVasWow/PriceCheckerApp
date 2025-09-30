import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postQuery1C } from '../tools/workWith1C';
import { MAIN_COLOR, MARKET_PLACES, SECONDARY_COLOR, WHITE_COLOR } from '../tools/consts';
import * as Device from 'expo-device';
import { expo } from '../app.json'
import { getDeviceTypeString } from '../tools/format';
import { createBasicDatawedgeProfile } from '../tools/zebra';
import MarketPlaceDropDown from '../components/MarketPlaceDropDown';

const ConnectParamsScreen = ({ setConnectParams }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [connectionString, setConnectionString] = useState('');
    const [isUseScaner, setIsUseScaner] = useState(true);
    const [error, setError] = useState(null);
    const [isСonnecting, setIsСonnecting] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState("");
    const [marketPlace, setMarketPlace] = useState(null);

    // для автологіну
    const [countdown, setCountdown] = useState(null); // null = нема відліку
    const countdownRef = useRef(null);
    const savedParamsRef = useRef(null);

    const stopCountdown = () => {
        if (countdownRef.current) clearInterval(countdownRef.current);
        setCountdown(null);
    };

    const handleLogin = async (overrideParams = null) => {
        stopCountdown(); // як тільки логін запускається – відлік скидаємо

        const connectParams = overrideParams || {
            login,
            password,
            connectionString,
            isUseScaner,
            marketPlace,
        };

        if (!connectParams.login || !connectParams.password || !connectParams.connectionString || !connectParams.marketPlace) {
            setError("Будь ласка, заповніть усі параметри підключення");
            return;
        }

        setIsСonnecting(true);

        try {
            const result = await postQuery1C.testConnect(connectParams);
            if (result.success) {
                await AsyncStorage.setItem('connectParams', JSON.stringify(connectParams));
                setConnectParams(connectParams);
                if (connectParams.isUseScaner) {
                    createBasicDatawedgeProfile();
                    console.log("add profile Datawedge")
                }
                setError(null);
            } else {
                setError(result.error);
                setConnectParams(null);
            }
        } catch (e) {
            setError("Помилка підключення: " + e.message);
            setConnectParams(null);
        }

        setIsСonnecting(false);
    };

    // при першому завантаженні
    useEffect(() => {
        const fetchDeviceType = async () => {
            const type = await Device.getDeviceTypeAsync();
            setDeviceInfo(getDeviceTypeString(type) + ' ' + Device.manufacturer + ' ' + Device.modelName);
        };

        AsyncStorage.getItem('connectParams')
            .then(storageString => storageString ? JSON.parse(storageString) : null)
            .then(connectParams => {
                if (connectParams) {
                    setLogin(connectParams.login);
                    setPassword(connectParams.password);
                    setConnectionString(connectParams.connectionString);
                    setIsUseScaner(connectParams.isUseScaner);
                    setMarketPlace(connectParams.marketPlace || MARKET_PLACES[0].value);

                    // якщо всі параметри є → стартує відлік
                    if (
                        connectParams.login &&
                        connectParams.password &&
                        connectParams.connectionString &&
                        connectParams.marketPlace
                    ) {
                        savedParamsRef.current = connectParams;
                        setCountdown(5);
                        countdownRef.current = setInterval(() => {
                            setCountdown(prev => {
                                if (prev === 1) {
                                    clearInterval(countdownRef.current);
                                    handleLogin(connectParams);
                                    return null;
                                }
                                return prev - 1;
                            });
                        }, 1000);
                    }
                }
            });

        fetchDeviceType();

        return stopCountdown; // очистка при анмаунті
    }, []);

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={{ color: MAIN_COLOR, textAlign: 'right' }}>
                    {deviceInfo}. App v.{expo.version}
                </Text>

                <Text style={styles.label}>Магазин:</Text>
                <MarketPlaceDropDown 
                    value={marketPlace} 
                    setValue={setMarketPlace} 
                    onPress={stopCountdown}
                />

                <Text style={styles.label}>Логін:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setLogin}
                    onFocus={stopCountdown}
                    value={login}
                    placeholder="ім'я користувача"
                />

                <Text style={styles.label}>Пароль:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={setPassword}
                    onFocus={stopCountdown}
                    value={password}
                    secureTextEntry={true}
                    placeholder="пароль користувача"
                />

                <Text style={styles.label}>Строка підключення:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setConnectionString}
                    onFocus={stopCountdown}
                    value={connectionString}
                    placeholder="наприклад http://ServerName:80/DataBaseName"
                />

                {error && <Text style={styles.error}>{error}</Text>}

                <View style={styles.switchContainer}>
                    <Text>Використовувати сканер штрихкодів </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: SECONDARY_COLOR }}
                        thumbColor={isUseScaner ? MAIN_COLOR : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setIsUseScaner}
                        onTouchStart={stopCountdown}
                        value={isUseScaner}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => handleLogin()}
                    style={[styles.enterButtom, isСonnecting && { opacity: 0.5 }]}
                    disabled={isСonnecting}
                >
                    <Text style={{ color: WHITE_COLOR, textAlign: 'center' }}>
                        {isСonnecting
                            ? "Підключення..."
                            : countdown !== null
                                ? `Увійти (${countdown})`
                                : "Увійти"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    label: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    enterButtom: {
        backgroundColor: MAIN_COLOR,
        marginTop: 10,
        padding: 20,
        borderRadius: 5,
    }
})

export default ConnectParamsScreen