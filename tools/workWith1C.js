import { decode as atob, encode as btoa } from 'base-64'
import { queryAdvertisement, queryProductByCode1c, queryProductByScanCode1c, queryUser1c } from './query1C';
import { blobToBase64, getCurrentFormattedDate } from './format';

export const postQuery1C = {
    getCredentials: getCredentials,
    testConnect: testConnect,
    getProductByBarCode: getProductByBarCode,
    getImageByID: getImageByID,
    getAdvertisements: getAdvertisements,
}

async function getAdvertisements(connectParams) {
    try {
        const response = await fetchAdvertisements(connectParams);
        if (!response.ok) {
            return { success: false, error: `Помилка при отриманні даних getAdvertisements` }
        }
        const data = await response.json();
        if (data.Result) {
            return { success: true, product: data.Result }
        }
        else {
            return { success: false, error: `Помилка при отриманні даних` }

        }
    } catch (error) {
        return { success: false, error: `Помилка підключення(${error.message})` }
    }
}


async function getImageByID(connectParams, imageID) {
    try {
        const response = await fetchImadeByID(connectParams, imageID);
        if (!response.ok) {
            return { success: false, error: `Помилка при отриманні даних (${response.status}) getImageByID {imageID}` }
        }
        const blob = await response.blob();
        const base64data = await blobToBase64(blob)
        if (base64data) {
            return { success: true, data: base64data }
        }
        else {
            return { success: false, error: `Відсутні данні зображення ${imageID}` }
        }

    } catch (error) {
        return { success: false, error: `Помилка підключення(${error.message})` }
    }
}

async function getProductByBarCode(connectParams, barCode) {
    try {
        const response = await fetchProductByScanCode(connectParams, barCode);
        if (!response.ok) {
            return { success: false, error: `Помилка при отриманні даних (${response.status}) getProductByBarCode` }
        }
        const data = await response.json();
        if (data.Result[0]) {
            return { success: true, product: data.Result[0] }
        }
        else {
            return { success: false, error: `Товар не знайдено або не встановлена ціна на код/штрихкод ${barCode}` }

        }
    } catch (error) {
        return { success: false, error: `Помилка підключення(${error.message})` }
    }
}

async function testConnect(connectParams) {
    try {
        const response = await fetchUser(connectParams);
        if (!response.ok) {
            return { success: false, error: `Невірні дані(логін/пароль) (${response.status})` }
        }
        const data = await response.json();
        return { success: true, user: data.Result[0] }
    } catch (error) {
        return { success: false, error: `Помилка підключення(${error.message})` }
    }
}

function getCredentials(login, password) {
    return btoa(unescape(encodeURIComponent(login + ":" + password)));
}

const getHeaders = (login, password) => {

    const credentials = getCredentials(login, password);
    return {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
    }
}

const conectionStringOdata = (connectionString) => {
    return `${connectionString}/odata/standard.odata/`;
    //return `${dataBase.protocol}://${dataBase.server}:${dataBase.port}/${dataBase.dataBase}/odata/standard.odata/`;
}

const conectionStringPostQuery = (connectionString) => {
    return `${connectionString}/hs/Tools/PostQuery`;
}

const conectionStrinWebSite = (connectionString, method) => {
    console.log(`${connectionString}/hs/WebSite/${method}`)
    return `${connectionString}/hs/WebSite/${method}`;
}

const fetchImadeByID = ({ connectionString, login, password }, imageID) => {
    //console.log("fetchImadeByID");
    const params = {
        headers: getHeaders(login, password),
        method: 'GET',
    }

    return fetch(conectionStrinWebSite(connectionString, 'GetPictureByID') + '/' + imageID, params);
}

const fetchUser = ({ connectionString, login, password }) => {
    //console.log("fetchUser");
    const params = {
        headers: getHeaders(login, password),
        method: 'POST',
        body: JSON.stringify({
            "QueryString": queryUser1c,
            "Perameters": [
                {
                    "Type": "String",
                    "Name": "userName",
                    "Value": login
                }
            ]
        })
    }

    return fetch(conectionStringPostQuery(connectionString), params);
}


export const fetchProductByScanCode = ({ connectionString, login, password }, barCode) => {
    const params = {
        headers: getHeaders(login, password),
        method: 'POST',
        body: JSON.stringify({
            "QueryString": (barCode.length === 6 ? queryProductByCode1c : queryProductByScanCode1c),
            "Perameters": [
                {
                    "Type": "String",
                    "Name": "scanCode",
                    "Value": barCode
                },
                {
                    "Type": "Date",
                    "Name": "currentDate",
                    "Value": getCurrentFormattedDate(),
                }
            ]
        })
    }
    return fetch(conectionStringPostQuery(connectionString), params);
}

export const fetchAdvertisements = ({ connectionString, login, password }) => {
    const params = {
        headers: getHeaders(login, password),
        method: 'POST',
        body: JSON.stringify({
            "QueryString": queryAdvertisement,
            "Perameters": [
                {
                    "Type": "Date",
                    "Name": "currentDate",
                    "Value": getCurrentFormattedDate(),
                }
            ]
        })
    }
    return fetch(conectionStringPostQuery(connectionString), params);
} 