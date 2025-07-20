import {
    View,
    Text,
    ScrollView,
    Alert,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../theme/Colors';
import { CustomTextInput } from '../../components/customInput';
import { moderateScale } from 'react-native-size-matters';
import { CustomButton } from '../../components/customButton';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/actions/AuthAction';

export const EditProfileScreen = ({ route, navigation }) => {
    const { userData } = route.params;

    const [name, setName] = React.useState(userData.name || '');
    const [email, setEmail] = React.useState(userData.email || '');
    const [phone, setPhone] = React.useState(userData.phone || '');
    const [address, setAddress] = React.useState(userData.address || '');

    const dispatch = useDispatch();

    const handleUpdateProfile = async () => {
        if (!name || !email || !phone || !address) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        const updatedUser = {
            ...userData,
            name,
            email,
            phone,
            address,
        };
        await dispatch(signupUser(updatedUser));
        Alert.alert('Success', 'Profile updated successfully', [
            {
                text: 'OK',
                onPress: () => navigation.goBack(),
            },
        ]);
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}
            style={styles.scrollView}
        >
            <Text style={styles.label}>Name:</Text>
            <CustomTextInput
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
                inputStyle={styles.input}
            />

            <Text style={styles.label}>Email:</Text>
            <CustomTextInput
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
                inputStyle={styles.input}
            />

            <Text style={styles.label}>Phone:</Text>
            <CustomTextInput
                placeholder="Enter phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                inputStyle={styles.input}
            />

            <Text style={styles.label}>Address:</Text>
            <CustomTextInput
                placeholder="Enter Address"
                multiline
                value={address}
                onChangeText={setAddress}
                inputStyle={[styles.input, styles.addressInput]}
            />

            <CustomButton
                title="Update Profile"
                onPress={handleUpdateProfile}
                buttonStyle={styles.button}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: moderateScale(15),
        paddingVertical: moderateScale(10),
    },
    label: {
        fontSize: moderateScale(15),
        fontWeight: '500',
        color: COLORS.black,
        marginTop: moderateScale(10),
    },
    input: {
        marginTop: moderateScale(6),
    },
    addressInput: {
        height: moderateScale(80),
        textAlignVertical: 'top',
    },
    button: {
        marginTop: moderateScale(20),
    },
});
