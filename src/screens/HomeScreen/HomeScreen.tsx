import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import ProfileHeader from '../../components/home/ProfileHeader';
import BookRideCard from '../../components/home/BookRideCard';
import RideRequestModal from '../../components/home/RideRequestModal';
import ActiveRideCard, { ActiveRideData } from '../../components/home/ActiveRideCard';
import RideTrackingScreen from '../RideTracking/RideTrackingScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeRide, setActiveRide] = useState<ActiveRideData | null>(null);
    const [showTrackingScreen, setShowTrackingScreen] = useState(false);
    const [showProfileScreen, setShowProfileScreen] = useState(false);

    const handleGoPress = () => {
        setModalVisible(true);
    };

    const handleRideSubmit = (data: any) => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        setActiveRide({
            pickup: data.pickup,
            dropoff: data.dropoff,
            date: data.date,
            time: data.time,
            seats: data.seats,
            vehicle: data.vehicle,
            purpose: data.purpose,
            otp: otp,
            status: 'Approved'
        });
    };

    // If profile screen is showing, display it
    if (showProfileScreen) {
        return <ProfileScreen onBack={() => setShowProfileScreen(false)} />;
    }

    // If tracking screen is showing, display it instead
    if (showTrackingScreen) {
        return <RideTrackingScreen onBack={() => setShowTrackingScreen(false)} />;
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Aesthetic Warm Ambient Background Circles */}
            <View style={styles.ambientCircleTop} />
            <View style={styles.ambientCircleBottom} />
            <View style={styles.ambientCircleMiddle} />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <ProfileHeader onProfilePress={() => setShowProfileScreen(true)} />
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Hero Greeting Section */}
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingSub}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </Text>
                        <Text style={styles.greetingText}>
                            {new Date().getHours() < 12 ? 'Good Morning' :
                                new Date().getHours() < 18 ? 'Good Afternoon' : 'Good Evening'}
                        </Text>
                        <Text style={styles.userNameText}>John.</Text>
                    </View>

                    {/* Book a Ride Card */}
                    <BookRideCard onGoPress={handleGoPress} />

                    <View style={styles.spacer} />

                    {/* Permanent Dummy Active Ride Card */}
                    <ActiveRideCard
                        data={{
                            pickup: 'Swargate, Pune',
                            dropoff: 'Baner, Pune',
                            date: '12-01-2026',
                            time: '11:27 PM',
                            seats: '3 Seats',
                            vehicle: 'Luxury',
                            purpose: 'Office Drop',
                            otp: '854768',
                            status: 'Approved'
                        }}
                        onViewDetails={() => console.log('View Details')}
                        onTrackRide={() => setShowTrackingScreen(true)}
                    />

                    {/* Active Ride Card - from actual bookings */}
                    {activeRide && (
                        <ActiveRideCard
                            data={activeRide}
                            onViewDetails={() => console.log('View Details')}
                            onTrackRide={() => setShowTrackingScreen(true)}
                        />
                    )}
                </ScrollView>

                <RideRequestModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleRideSubmit}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f4ea', // Accent cream
    },
    // Aesthetic Warm Ambient Circles
    ambientCircleTop: {
        position: 'absolute',
        top: -120,
        right: -100,
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: 'rgba(219, 201, 166, 0.3)', // Tan/gradientEnd
        transform: [{ scale: 1.5 }],
    },
    ambientCircleBottom: {
        position: 'absolute',
        bottom: -80,
        left: -60,
        width: 380,
        height: 380,
        borderRadius: 190,
        backgroundColor: 'rgba(232, 201, 179, 0.35)', // Peach/lighter
    },
    ambientCircleMiddle: {
        position: 'absolute',
        top: '40%',
        left: -100,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(198, 40, 41, 0.08)', // Soft red tint
    },
    safeArea: {
        flex: 1,
    },
    header: {
        zIndex: 10,
    },
    content: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    spacer: {
        height: 20,
    },
    greetingContainer: {
        paddingHorizontal: 28,
        marginTop: 20,
        marginBottom: 24,
    },
    greetingSub: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 13,
        color: '#9B8B7E',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    greetingText: {
        fontFamily: Fonts.Inter.regular,
        fontSize: 32,
        color: '#4A3F35',
    },
    userNameText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 32,
        color: '#C62829', // Brand primary red
        marginTop: -5,
    },
});

export default HomeScreen;
