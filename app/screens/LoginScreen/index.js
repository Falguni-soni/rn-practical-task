import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    Platform
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../../theme/Colors';
import { moderateScale } from 'react-native-size-matters';
import { CustomTextInput } from '../../components/customInput';
import { CustomButton } from '../../components/customButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/AuthAction';
import { StyleSheet } from 'react-native';

export const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user?.userData);
    console.log("userData", userData)
    const spinValue = useRef(new Animated.Value(0)).current;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleLogin = async () => {
        try {
            if (!email.trim() || !password.trim()) {
                Alert.alert('Error', 'Email or password is required', [
                    {
                        text: 'OK',
                        onPress: () => { },
                    },
                ]);
            } else if (userData?.email === email && userData.password === password) {
                // navigation.navigate('profileStack');
                await dispatch(loginUser());
            } else {
                Alert.alert('Error', 'Invalid email or password', [
                    {
                        text: 'OK',
                        onPress: () => { },
                    },
                ]);
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoiding}
                enabled={keyboardOpen}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    <Animated.Image
                        source={require('../../assets/logo.png')}
                        style={[styles.logo, { transform: [{ rotate: spin }] }]}
                    />
                    <Text style={styles.title}>Login here</Text>
                    <Text style={styles.subtitle}>Welcome back you’ve been missed!</Text>

                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <CustomTextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            inputStyle={styles.passwordInput}
                        />

                        <Text style={styles.forgotText}>
                            Forgot your password?
                        </Text>

                        <CustomButton
                            title={'Login'}
                            buttonStyle={styles.loginButton}
                            onPress={handleLogin}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('signUpScreen');
                            }}
                        >
                            <Text style={styles.createAccountText}>
                                Create new account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    keyboardAvoiding: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    logo: {
        width: moderateScale(100),
        height: moderateScale(100),
        alignSelf: 'center',
        marginBottom: moderateScale(25),
        borderRadius: moderateScale(50),
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1F41BB',
    },
    subtitle: {
        fontSize: moderateScale(16),
        textAlign: 'center',
        color: COLORS.black,
        marginTop: moderateScale(8),
        fontWeight: '700',
    },
    inputContainer: {
        marginTop: moderateScale(30),
        marginHorizontal: moderateScale(15),
    },
    passwordInput: {
        marginTop: moderateScale(15),
    },
    forgotText: {
        fontSize: moderateScale(14),
        color: '#1F41BB',
        textAlign: 'right',
        marginRight: moderateScale(5),
        marginTop: moderateScale(8),
    },
    loginButton: {
        marginTop: moderateScale(30),
    },
    createAccountText: {
        fontSize: moderateScale(14),
        color: '#1F41BB',
        textAlign: 'center',
        marginTop: moderateScale(20),
    },
});
