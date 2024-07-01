import { View, Text, StyleSheet } from "react-native";
import { ALARM_COLOR, WHITE_COLOR, verticalScale } from "../tools/consts";
import { useEffect } from "react";

const ErrorMassage = ({ error, setError }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('')
        }, 10000); // затримка перед очищенням error
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.textName}
                ellipsizeMode="tail"
            >{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        //        backgroundColor: WHITE_COLOR,
        margin: 20,
        padding: 20,
    },
    textName: {
        color: ALARM_COLOR,
        textAlign: 'center',
        fontSize: verticalScale(62),
        fontWeight: "800",
        padding: 5,
    },
});

export default ErrorMassage