import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileScreen } from '../screens/ProfileScreen'
import { EditProfileScreen } from '../screens/EditProfileScreen'

const ProfileStack = createNativeStackNavigator()

export const ProfileStackNavigation = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="profileScreen" component={ProfileScreen}
                options={{ headerShown: false }} />
            <ProfileStack.Screen name="editProfileScreen" component={EditProfileScreen}
                options={{
                    headerTitle: 'Edit Profile',
                    headerTitleAlign: 'center'
                }} />
        </ProfileStack.Navigator>
    )
}