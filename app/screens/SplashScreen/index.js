import React, { useEffect, useRef } from 'react';
import {
    View,
    Image,
    Animated,
    Easing,
    Text,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/Colors';
import { useNavigation } from '@react-navigation/native';

export const SplashScreen = () => {
    const navigation = useNavigation();

    // Animated values for image and text
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const textTranslateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1200,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 1200,
                delay: 200,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(textTranslateY, {
                toValue: 0,
                duration: 1200,
                delay: 200,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Animated.Image
                source={require('../../assets/logo.png')}
                style={[
                    styles.logo,
                    {
                        transform: [
                            { scale: scaleAnim },
                            { translateY: slideAnim },
                        ],
                    },
                ]}
                resizeMode="contain"
            />
            <Animated.Text
                style={[
                    styles.title,
                    {
                        opacity: textOpacity,
                        transform: [{ translateY: textTranslateY }],
                    },
                ]}
            >
                UpTasker
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    logo: {
        width: moderateScale(200),
        height: moderateScale(200),
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: moderateScale(20),
    },
});
