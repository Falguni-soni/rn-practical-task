import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
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
    // Assuming userData is stored in Redux state
    const userData = useSelector((state) => state.user?.
        userData
    );

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar barStyle="dark-content" />
            <View style={{
                marginHorizontal: moderateScale(10),
                marginTop: moderateScale(50),
            }}>
                <Text style={{
                    fontSize: moderateScale(20),
                    fontWeight: 'bold',
                    color: COLORS.primary,
                }}>
                    Profile
                </Text>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: COLORS.primary,
                    borderRadius: moderateScale(8),
                    marginTop: moderateScale(10),
                    paddingHorizontal: moderateScale(10),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: moderateScale(10),
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            source={require('../../assets/avatar.png')}
                            style={{
                                width: moderateScale(65),
                                height: moderateScale(65),
                                borderRadius: moderateScale(35),
                            }}
                        />
                        <View style={{
                            marginLeft: moderateScale(10),
                        }}>
                            <Text style={{
                                fontSize: moderateScale(16),
                                fontWeight: 'bold',
                                color: COLORS.white,
                            }}>{userData.name}</Text>

                            <Text style={{
                                fontSize: moderateScale(16),
                                fontWeight: 'bold',
                                color: COLORS.white,
                            }}>{userData.
                                email
                                }</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('editProfileScreen', {
                            userData
                        })}
                    >
                        <AntDesign name="edit" size={moderateScale(24)} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        marginTop: moderateScale(20),
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text
                        style={{
                            fontSize: moderateScale(18),
                            fontWeight: 'bold',
                            color: COLORS.primary,
                            marginBottom: moderateScale(10),
                        }}
                    >Personal Information</Text>

                    <View style={{
                        backgroundColor: '#d3d7e3ff',
                        elevation: 5,
                        borderRadius: moderateScale(8),
                        paddingVertical: moderateScale(10),
                        paddingHorizontal: moderateScale(15),
                        marginBottom: moderateScale(12),
                    }}>
                        <Text>Email: {userData.email}</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#d3d7e3ff',
                        elevation: 5,
                        borderRadius: moderateScale(8),
                        paddingVertical: moderateScale(10),
                        paddingHorizontal: moderateScale(15),
                        marginBottom: moderateScale(12),
                    }}>
                        <Text>Address: {userData.address}</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#d3d7e3ff',
                        elevation: 5,
                        borderRadius: moderateScale(8),
                        paddingVertical: moderateScale(10),
                        paddingHorizontal: moderateScale(15),
                        marginBottom: moderateScale(12),
                    }}>
                        <Text>Phone: {userData.phone}</Text>
                    </View>
                </ScrollView>

                <View style={{
                    alignSelf: 'center',
                }}>
                    <CustomButton
                        title={'Logout'}
                        onPress={async () => {
                            await dispatch(logoutUser());
                        }}
                        outline
                        buttonStyle={{
                            marginTop: moderateScale(20),
                            marginHorizontal: moderateScale(15),
                            width: moderateScale(100),
                        }}
                    />
                </View>
            </View>

        </View >
    )
}
