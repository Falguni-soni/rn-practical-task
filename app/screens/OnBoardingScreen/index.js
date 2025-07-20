import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/Colors';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../../components/customButton';

const { width } = Dimensions.get('screen');

const slides = [
    {
        id: '1',
        title: 'Manage your tasks',
        description: 'You can easily manage all of your daily tasks in DoMe for free',
        image: require('../../assets/boarding_1.png'),
    },
    {
        id: '2',
        title: 'Create daily routine',
        description: 'In Uptodo you can create your personalized routine to stay productive',
        image: require('../../assets/boarding_2.png'),
    },
    {
        id: '3',
        title: 'Organize your tasks',
        description: 'You can organize your daily tasks by adding your tasks into categories',
        image: require('../../assets/boarding_3.png'),
    },
];

export const OnBoardingScreen = () => {
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % slides.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
        scrollX.current = event.nativeEvent.contentOffset.x;
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.navigate('welcomeScreen');
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.topSection}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('welcomeScreen')}
                    style={styles.skipButton}
                >
                    <Feather name="user" size={moderateScale(25)} color={COLORS.black} />
                </TouchableOpacity>
                <FlatList
                    data={slides}
                    ref={flatListRef}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    renderItem={renderItem}
                />
                <View style={styles.pagination}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    disabled={currentIndex === 0}
                    title="Back"
                    outline
                    onPress={handleBack}
                    buttonStyle={styles.backButton}
                />
                <CustomButton
                    disabled={currentIndex === slides.length - 1}
                    title="Next"
                    onPress={handleNext}
                    buttonStyle={styles.nextButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    topSection: {
        flex: 0.8,
    },
    skipButton: {
        alignSelf: 'flex-end',
        marginRight: moderateScale(20),
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(30),
    },
    image: {
        width: width * 0.9,
        height: moderateScale(290),
    },
    title: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        marginTop: moderateScale(40),
        color: COLORS.primary,
        textAlign: 'center',
    },
    description: {
        fontSize: moderateScale(12),
        textAlign: 'center',
        marginTop: moderateScale(20),
        color: COLORS.black,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 5,
        backgroundColor: COLORS.gray,
    },
    activeDot: {
        backgroundColor: COLORS.primary,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(40),
        marginHorizontal: moderateScale(20),
    },
    backButton: {
        width: moderateScale(100),
    },
    nextButton: {
        width: moderateScale(120),
    },
});
