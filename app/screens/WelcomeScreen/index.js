import { View, Text, Image, Dimensions, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../theme/Colors'
import { moderateScale } from 'react-native-size-matters'
import { CustomButton } from '../../components/customButton'
import { useNavigation } from '@react-navigation/native'

export const WelcomeScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />

            <View style={styles.topSection}>
                <Text style={styles.welcomeText}>Welcome to UpTodo</Text>
                <Text style={styles.descriptionText}>
                    Please login to your account or create new account to continue
                </Text>
            </View>

            <View style={styles.bottomSection}>
                <CustomButton
                    title="Login"
                    onPress={() => navigation.navigate('loginScreen')}
                />
                <CustomButton
                    title="Sign Up"
                    onPress={() => navigation.navigate('signUpScreen')}
                    outline
                    buttonStyle={styles.signUpButton}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topSection: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(10),
    },
    welcomeText: {
        color: COLORS.black,
        fontSize: moderateScale(26),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    descriptionText: {
        color: COLORS.gray,
        fontSize: moderateScale(14),
        marginTop: moderateScale(15),
        textAlign: 'center',
        paddingHorizontal: moderateScale(20),
    },
    bottomSection: {
        flex: 0.5,
        justifyContent: 'center',
        marginTop: moderateScale(20),
        marginHorizontal: moderateScale(20),
    },
    signUpButton: {
        marginTop: moderateScale(20),
    },
})
