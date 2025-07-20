import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../theme/Colors'; // Adjust if needed

export const CustomTextInput = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    inputStyle,
    containerStyle,
    keyboardType,
    multiline = false,
    ...rest
}) => {

    return (
        <View style={[
            styles.container,
            containerStyle,
        ]}>
            <TextInput
                multiline={multiline}
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={COLORS.grayText}
                keyboardType={keyboardType || 'default'}
                {...rest}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    input: {
        fontSize: moderateScale(14),
        color: COLORS.black,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: moderateScale(6),
        height: moderateScale(44),
        backgroundColor: '#F4F7FF',
    },
    defaultBackground: {
        backgroundColor: '#F4F7FF',
    },
});
