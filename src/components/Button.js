import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Easing } from 'react-native';
import Colors from '../constants/Colors';


export default ButtonComponent = ({ buttonText, callBack, width, height, backgroundColor, color, fontWeight, borderColor, isDisable = false }) => {
    return (
        <TouchableOpacity
            style={
                [
                    styles.buttonContainer,
                    { width: width ? width : '80%' },
                    { height: height ? height : 50 },
                    { backgroundColor: backgroundColor ? backgroundColor : Colors.secondaryColor },
                    { borderColor: borderColor ? borderColor : Colors.primaryColor }
                ]
            }
            onPress={() => { callBack() }}>
            <Text
                style={[styles.buttonText, { color: color ? color : Colors.primaryColor}]}
            >
                {buttonText}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800'
    },
});


// eg.

{/* <Button
        callBack={() => {
            console.log("pressed")
        }}
        backgroundColor={Colors.primary}
        color={Colors.secondary}
        buttonText={"Test Btn"}
        /> */}