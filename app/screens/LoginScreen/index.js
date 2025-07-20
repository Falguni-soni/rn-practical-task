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
    Keyboard
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../../theme/Colors';
import { moderateScale } from 'react-native-size-matters';
import { CustomTextInput } from '../../components/customInput';
import { CustomButton } from '../../components/customButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/AuthAction';

export const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user?.userData);
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
            await dispatch(loginUser())
            if (!email.trim() || !password.trim()) {
                Alert.alert('Error', 'Email or password is required', [
                    {
                        text: 'OK',
                        onPress: () => { },
                    },
                ]);
            }
            else if (userData?.email === email && userData.password === password) {
                navigation.navigate('profileStack');
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
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar barStyle={'dark-content'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                enabled={keyboardOpen}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Animated.Image
                        source={require('../../assets/logo.png')}
                        style={{
                            width: moderateScale(100),
                            height: moderateScale(100),
                            alignSelf: 'center',
                            marginBottom: moderateScale(25),
                            transform: [{ rotate: spin }],
                            borderRadius: moderateScale(50),
                        }}
                    />
                    <Text
                        style={{
                            fontSize: moderateScale(24),
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#1F41BB',
                        }}
                    >
                        Login here
                    </Text>
                    <Text
                        style={{
                            fontSize: moderateScale(16),
                            textAlign: 'center',
                            color: COLORS.black,
                            marginTop: moderateScale(8),
                            fontWeight: '700',
                        }}
                    >
                        Welcome back you’ve been missed!
                    </Text>

                    <View
                        style={{
                            marginTop: moderateScale(30),
                            marginHorizontal: moderateScale(15),
                        }}
                    >
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
                            inputStyle={{
                                marginTop: moderateScale(15),
                            }}
                        />

                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                color: '#1F41BB',
                                textAlign: 'right',
                                marginRight: moderateScale(5),
                                marginTop: moderateScale(8),
                            }}
                        >
                            Forgot your password?
                        </Text>

                        <CustomButton
                            title={'Login'}
                            buttonStyle={{
                                marginTop: moderateScale(30),
                            }}
                            onPress={handleLogin}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('signUpScreen');
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: moderateScale(14),
                                    color: '#1F41BB',
                                    textAlign: 'center',
                                    marginTop: moderateScale(20),
                                }}
                            >
                                Create new account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
