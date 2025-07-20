import {
    View,
    Text,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../theme/Colors';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../../components/customButton';
import { logoutUser } from '../../redux/actions/AuthAction';

export const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user?.userData);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.innerContainer}>
                <Text style={styles.profileTitle}>Profile</Text>

                {/* Profile Info Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileRow}>
                        <Image
                            source={require('../../assets/avatar.png')}
                            style={styles.avatar}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.userText}>{userData.name}</Text>
                            <Text style={styles.userText}>{userData.email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('editProfileScreen', { userData })}
                    >
                        <AntDesign
                            name="edit"
                            size={moderateScale(24)}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                </View>

                {/* Personal Info Section */}
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.sectionTitle}>Personal Information</Text>

                    <View style={styles.infoBox}>
                        <Text>Email: {userData.email}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text>Address: {userData.address}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text>Phone: {userData.phone}</Text>
                    </View>
                </ScrollView>

                {/* Logout Button */}
                <View style={styles.logoutContainer}>
                    <CustomButton
                        title={'Logout'}
                        onPress={async () => {
                            await dispatch(logoutUser());
                        }}
                        outline
                        buttonStyle={styles.logoutButton}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    innerContainer: {
        marginHorizontal: moderateScale(10),
        marginTop: moderateScale(50),
    },
    profileTitle: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    profileCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: moderateScale(8),
        marginTop: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: moderateScale(10),
    },
    profileRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: moderateScale(65),
        height: moderateScale(65),
        borderRadius: moderateScale(35),
    },
    userInfo: {
        marginLeft: moderateScale(10),
    },
    userText: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: COLORS.white,
    },
    scrollContent: {
        flexGrow: 1,
        marginTop: moderateScale(20),
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: moderateScale(10),
    },
    infoBox: {
        backgroundColor: '#d3d7e3ff',
        elevation: 5,
        borderRadius: moderateScale(8),
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(15),
        marginBottom: moderateScale(12),
    },
    logoutContainer: {
        alignSelf: 'center',
    },
    logoutButton: {
        marginTop: moderateScale(20),
        marginHorizontal: moderateScale(15),
        width: moderateScale(100),
    },
});
