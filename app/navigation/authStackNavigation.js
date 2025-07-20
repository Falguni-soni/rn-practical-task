import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen } from '../screens/WelcomeScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { OnBoardingScreen } from '../screens/OnBoardingScreen'
import { LoginScreen } from '../screens/LoginScreen'

const AuthStack = createNativeStackNavigator()

export const AuthStackNavigation = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="boardingScreen" component={OnBoardingScreen}
                options={{ headerShown: false }} />
            <AuthStack.Screen name="welcomeScreen" component={WelcomeScreen}
                options={{ headerShown: false }} />
            <AuthStack.Screen name="signUpScreen" component={SignUpScreen}
                options={{ headerShown: false }} />
            <AuthStack.Screen name="loginScreen" component={LoginScreen}
                options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
}