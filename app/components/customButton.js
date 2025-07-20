import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../theme/Colors';

export const CustomButton = ({
    title,
    onPress,
    buttonStyle,
    textStyle,
    disabled = false,
    outline = false,
    ...rest
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                outline && styles.outlineButton,
                disabled && styles.disabledButton,
                buttonStyle,
            ]}
            {...rest}
        >
            <Text
                style={[
                    styles.text,
                    outline && styles.outlineText,
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(8),
        height: moderateScale(38),
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    },
    disabledButton: {
        backgroundColor: COLORS.gray,
        borderColor: COLORS.gray,
    },
    text: {
        color: COLORS.white,
        fontSize: moderateScale(16),
        fontWeight: 'bold',
    },
    outlineText: {
        color: COLORS.primary,
    },
});
