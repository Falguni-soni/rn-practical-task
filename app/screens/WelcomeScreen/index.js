import { View, Text, Image, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { COLORS } from '../../theme/Colors'
import { moderateScale } from 'react-native-size-matters'
import { CustomButton } from '../../components/customButton'
import { useNavigation } from '@react-navigation/native'

export const WelcomeScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar barStyle={'dark-content'} />
            <View style={{
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: moderateScale(10)
            }}>
                <Text style={{
                    color: COLORS.black,
                    fontSize: moderateScale(26),
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}>Welcome to UpTodo</Text>
                <Text
                    style={{
                        color: COLORS.gray,
                        fontSize: moderateScale(14),
                        marginTop: moderateScale(15),
                        textAlign: 'center',
                        paddingHorizontal: moderateScale(20)
                    }}>
                    Please login to your account or create new account to continue</Text>
            </View>
            <View style={{
                flex: 0.5,
                justifyContent: 'center',
                marginTop: moderateScale(20),
                marginHorizontal: moderateScale(20),
            }}
            >
                <CustomButton
                    title="Login"
                    onPress={() => navigation.navigate('loginScreen')}
                />
                <CustomButton
                    title="Sign Up"
                    onPress={() => navigation.navigate('signUpScreen')}
                    outline
                    buttonStyle={{
                        marginTop: moderateScale(20),
                    }}
                />
            </View>
        </View>
    )
}
