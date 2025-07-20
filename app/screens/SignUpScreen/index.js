import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../../theme/Colors';
import { moderateScale } from 'react-native-size-matters';
import { CustomTextInput } from '../../components/customInput';
import { CustomButton } from '../../components/customButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUserData, signupUser } from '../../redux/actions/AuthAction';

export const SignUpScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const spinValue = useRef(new Animated.Value(0)).current;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [errors, setErrors] = useState({});

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

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const onSubmit = async () => {
        try {
            const newErrors = {};

            if (!name.trim()) newErrors.name = 'Name is required';
            if (!email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                newErrors.email = 'Email is not valid';
            }

            if (!phone.trim()) {
                newErrors.phone = 'Phone number is required';
            } else if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
                newErrors.phone = 'Enter valid 10-digit phone number';
            }

            if (!address.trim()) newErrors.address = 'Address is required';

            if (!password) {
                newErrors.password = 'Password is required';
            } else if (password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters';
            }

            if (!confirmPassword) {
                newErrors.confirmPassword = 'Confirm your password';
            } else if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            setErrors(newErrors);

            if (Object.keys(newErrors).length === 0) {
                const data = {
                    name, email, phone, address, password
                }
                await dispatch(signupUser(data));
                setAddress('')
                setName('')
                setEmail('')
                setPhone('')
                setPassword('')
                setConfirmPassword('')
                Alert.alert('Success', 'User Created successfully', [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('loginScreen'),
                    },
                ]);
            }
        } catch (error) {

        }

    };

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
                        paddingBottom: moderateScale(50),
                        marginTop: moderateScale(30),
                    }}
                >
                    <Animated.Image
                        source={require('../../assets/logo.png')}
                        style={{
                            width: moderateScale(100),
                            height: moderateScale(100),
                            alignSelf: 'center',
                            marginBottom: moderateScale(15),
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
                        Create Account
                    </Text>

                    <View
                        style={{
                            marginTop: moderateScale(30),
                            marginHorizontal: moderateScale(12),
                        }}
                    >
                        <CustomTextInput
                            placeholder="Enter Name"
                            value={name}
                            onChangeText={(text) => {
                                setName(text)
                                setErrors((prev) => ({ ...prev, name: '' }))
                            }}

                        />
                        {errors.name &&
                            <Text style={{
                                color: 'red',
                                fontSize: moderateScale(12),
                                fontWeight: '400',
                            }}>{errors.name}</Text>}

                        <CustomTextInput
                            placeholder="Enter Email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text)
                                setErrors((prev) => ({ ...prev, email: '' }))
                            }}
                            inputStyle={{
                                marginTop: moderateScale(12),
                            }}
                        />
                        {errors.email && <Text
                            style={{
                                color: 'red',
                                fontSize: moderateScale(12),
                                fontWeight: '400',
                            }}>{errors.email}</Text>}

                        <CustomTextInput
                            placeholder="Enter Phone Number"
                            value={phone}
                            keyboardType={'phone-pad'}
                            onChangeText={(text) => {
                                setPhone(text)
                                setErrors((prev) => ({ ...prev, phone: '' }))
                            }}
                            maxLength={10}
                            inputStyle={{
                                marginTop: moderateScale(12),
                            }}
                        />
                        {errors.phone && <Text style={{
                            color: 'red',
                            fontSize: moderateScale(12),
                            fontWeight: '400',
                        }}>{errors.phone}</Text>}

                        <CustomTextInput
                            placeholder="Enter Address"
                            multiline
                            value={address}
                            onChangeText={(text) => {
                                setAddress(text)
                                setErrors((prev) => ({ ...prev, address: '' }))
                            }}
                            inputStyle={{
                                marginTop: moderateScale(12),
                                height: moderateScale(80),
                                textAlignVertical: 'top',
                            }}
                        />
                        {errors.address && <Text style={{
                            color: 'red',
                            fontSize: moderateScale(12),
                            fontWeight: '400',
                        }}>{errors.address}</Text>}

                        <CustomTextInput
                            placeholder="Enter Password"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                                setErrors((prev) => ({ ...prev, password: '' }))
                            }}
                            inputStyle={{
                                marginTop: moderateScale(12),
                            }}
                            secureTextEntry
                        />
                        {errors.password && <Text style={{
                            color: 'red',
                            fontSize: moderateScale(12),
                            fontWeight: '400',
                        }}>{errors.password}</Text>}

                        <CustomTextInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text)
                                setErrors((prev) => ({ ...prev, confirmPassword: '' }))
                            }}
                            secureTextEntry
                            inputStyle={{
                                marginTop: moderateScale(12),
                            }}
                        />
                        {errors.confirmPassword && (
                            <Text style={{
                                color: 'red',
                                fontSize: moderateScale(12),
                                fontWeight: '400',
                            }}>{errors.confirmPassword}</Text>
                        )}
                        <CustomButton
                            title={'Sign up'}
                            buttonStyle={{
                                marginTop: moderateScale(30),
                            }}
                            onPress={() => onSubmit()}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('loginScreen');
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
                                Already have an account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
