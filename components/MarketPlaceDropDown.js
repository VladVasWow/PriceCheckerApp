import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';
import { MARKET_PLACES } from '../tools/consts';


const MarketPlaceDropDown = ({ value, setValue }) => {
    const [items, setItems] = useState(MARKET_PLACES);
    const [open, setOpen] = useState(false);

    return (
        <DropDownPicker
            style={styles.dropbox}
            placeholder="виберіть магазин"
            value={value}
            items={items}
            setValue={setValue}
            setItems={setItems}
            open={open}
            setOpen={setOpen}
        />
    );
};

const styles = StyleSheet.create({
    dropbox: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
});

export default MarketPlaceDropDown