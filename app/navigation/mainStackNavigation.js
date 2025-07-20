import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { AuthStackNavigation } from './authStackNavigation';
import { ProfileStackNavigation } from './profileStackNavigation';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
    const isUserLogin = useSelector((state) => state.user.isUserLoggedIn);
    const [showSplashScreen, setShowSplashScreen] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowSplashScreen(false);
        }, 4000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {showSplashScreen ? (
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                ) : isUserLogin ? (
                    <Stack.Screen name="profileStack" component={ProfileStackNavigation} />
                ) : (
                    <Stack.Screen name="authStack" component={AuthStackNavigation} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
