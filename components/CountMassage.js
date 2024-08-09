import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ALARM_COLOR, MAIN_COLOR, WHITE_COLOR, verticalScale } from "../tools/consts";
import { useEffect } from "react";
import { dateToString } from "../tools/format";

const CountMassage = ({ scanCountData, setScanCountData, setShowScanCount }) => {

    console.log(scanCountData);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowScanCount(false)
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const handleReset = () => {
        setScanCountData({ dataFrom: new Date(), scanCount: 0 });
    }

    const handlerClose = () => {
        setShowScanCount(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textName}
                ellipsizeMode="tail"
            >З {dateToString(scanCountData.dataFrom)} проскановано штрихкоди {scanCountData.scanCount} разів</Text>
            <View style={styles.containerControls}>
                <TouchableOpacity onPress={handleReset} style={styles.resetButtom}>
                    <Text style={styles.textButtom}>
                        Скинути лічильник
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlerClose} style={styles.closeButtom}>
                    <Text style={styles.textButtom}>
                        Закрити
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-around',
        //        backgroundColor: WHITE_COLOR,
        margin: 20,
        padding: 20,
    },
    containerControls: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        margin: 20,
        padding: 20,
    },
    textName: {
        color: MAIN_COLOR,
        textAlign: 'center',
        fontSize: verticalScale(62),
        fontWeight: "800",
        padding: 5,
    },
    resetButtom: {
        backgroundColor: ALARM_COLOR,
        marginTop: 10,
        padding: 20,
        borderRadius: 5,
    },
    closeButtom: {
        backgroundColor: MAIN_COLOR,
        marginTop: 10,
        padding: 20,
        borderRadius: 5,
    },
    textButtom: {
        color: WHITE_COLOR,
        fontSize: verticalScale(42)
    }

});

export default CountMassage