import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postQuery1C } from '../tools/workWith1C';
import { MAIN_COLOR, SECONDARY_COLOR, WHITE_COLOR } from '../tools/consts';
import * as Device from 'expo-device';
import { expo } from '../app.json'
import { getDeviceTypeString } from '../tools/format';

const ConnectParamsScreen = ({ setConnectParams }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [connectionString, setConnectionString] = useState('');
    const [isUseScaner, setIsUseScaner] = useState(true);
    const [error, setError] = useState(null);
    const [isСonnecting, setIsСonnecting] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState("");

    const handleLogin = async () => {
        // Зберігаємо логін і строку підключення в локальному сховищі
        const connectParams = {
            'login': login,
            'password': password,
            'connectionString': connectionString,
            'isUseScaner': isUseScaner,
        };
        setIsСonnecting(true);

        result = await postQuery1C.testConnect(connectParams);
        if (result.success) {
            AsyncStorage.setItem('connectParams', JSON.stringify(connectParams));
            setConnectParams(connectParams)
        }
        else {
            setError(result.error);
            setConnectParams(null);
        }
        setIsСonnecting(false);
    };

    // Під час завантаження компонента, отримуємо збережені дані з локального сховища
    useEffect(() => {

        const fetchDeviceType = async () => {
            const type = await Device.getDeviceTypeAsync();
            setDeviceInfo(getDeviceTypeString(type)+' '+ Device.manufacturer + ' ' + Device.modelName);
        }

        AsyncStorage.getItem('connectParams')
            .then(storageString => storageString ? JSON.parse(storageString) : "")
            .then(connectParams => {
                console.log(connectParams);
                if (connectParams) {
                    setLogin(connectParams.login);
                    setPassword(connectParams.password);
                    setConnectionString(connectParams.connectionString);
                    setIsUseScaner(connectParams.isUseScaner);
                }
            })
        fetchDeviceType();
    }, []);

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={{ color: MAIN_COLOR, textAlign: 'right' }}>{deviceInfo}. App v.{expo.version}</Text>
                <Text style={styles.label}>Логін:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setLogin(text)}
                    value={login}
                    placeholder="ім'я користувача"
                />
                <Text style={styles.label}>Пароль:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="пароль користувача"
                />
                <Text style={styles.label}>Строка підключення:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setConnectionString(text)}
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
                        value={isUseScaner}
                    />
                </View>
                <TouchableOpacity onPress={handleLogin} style={styles.enterButtom}>
                    <Text style={{ color: WHITE_COLOR, textAlign: 'center' }}>
                        {isСonnecting ? "Підключення..." : "Увійти"}
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