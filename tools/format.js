import * as Device from 'expo-device';

export const getCurrentFormattedDate = () => {
    const date = new Date();
    return dateToString(date, true);
}

export const dateToString = (date, withoutSeparators = false) => {

    if (!(date instanceof Date)) {
        return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    if (withoutSeparators) {
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    else {
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
}

export const dateReviver = (key, value) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (typeof value === "string" && dateFormat.test(value)) {
        return new Date(value);
    }
    return value;
}

export const blobToBase64 = async (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            const base64data = reader.result?.toString().split(',')[1];
            resolve(base64data);
        };
        reader.onerror = () => {
            reader.abort();
            reject(new Error('Error reading the file'));
        };
    });
};

export const shuffleArray = (array) => {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

export const getDeviceTypeString = (type) => {
    switch (type) {
        case Device.DeviceType.PHONE:
            return 'Phone';
        case Device.DeviceType.TABLET:
            return 'Tablet';
        case Device.DeviceType.DESKTOP:
            return 'Desktop';
        case Device.DeviceType.TV:
            return 'TV';
        case Device.DeviceType.UNKNOWN:
        default:
            return 'Unknown';
    }
}