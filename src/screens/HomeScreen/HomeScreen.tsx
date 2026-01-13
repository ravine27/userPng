import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Text, Dimensions, Animated, Easing, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { useProfile } from '../../context/ProfileContext';
import ProfileHeader from '../../components/home/ProfileHeader';
import BookRideCard from '../../components/home/BookRideCard';
import RideRequestModal from '../../components/home/RideRequestModal';
import ActiveRideCard, { ActiveRideData } from '../../components/home/ActiveRideCard';
import RideTrackingScreen from '../RideTracking/RideTrackingScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import NotificationsModal from '../../components/home/NotificationsModal';


const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const { profile } = useProfile();
    const [showProfileScreen, setShowProfileScreen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showTrackingScreen, setShowTrackingScreen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeRide, setActiveRide] = useState<ActiveRideData | null>(null);

    const handleGoPress = () => {
        setModalVisible(true);
    };
    const handleProfilePress = () => {
        console.log('Profile Header Pressed!');
        // Alert.alert("Debug", "Profile Pressed"); // Uncomment if console logs not visible
        setShowProfileScreen(true);
    };

    // ... logic ...

    // DEBUG: Conditional Render without animation first to verify it works
    if (showProfileScreen) {
        return <ProfileScreen onBack={() => setShowProfileScreen(false)} />;
    }



    const handleRideSubmit = (data: any) => {
        // ... (existing logic)
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
            status: 'Pending'
        });
    };

    // If tracking screen is showing, display it instead (Tracking still replaces screen)
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
                    <ProfileHeader
                        onProfilePress={handleProfilePress}
                        onNotificationPress={() => setShowNotifications(true)}
                    />
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
                        <Text style={styles.userNameText}>{profile?.firstName || 'User'}.</Text>
                    </View>

                    {/* Book a Ride Card */}
                    <BookRideCard onGoPress={handleGoPress} />

                    {/* Active Ride Card (Permanent Dummy) */}
                    <ActiveRideCard
                        data={{
                            pickup: 'Swargate, Pune',
                            dropoff: 'Baner, Pune',
                            date: '12-01-2026',
                            time: '11:27 PM',
                            seats: '5 Seats',
                            vehicle: 'Sedan',
                            purpose: 'Office Drop',
                            otp: '854768',
                            status: 'Pending'
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
            </SafeAreaView>

            {/* Modals */}
            <RideRequestModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleRideSubmit}
            />

            <NotificationsModal
                visible={showNotifications}
                onClose={() => setShowNotifications(false)}
            />

            {/* Animated Profile Overlay temporarily removed for debugging */}
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

    greetingContainer: {
        paddingHorizontal: 28,
        marginTop: 8,
        marginBottom: 10,
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
    profileOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: width,
        backgroundColor: '#f9f4ea',
        zIndex: 1000,
        elevation: 20, // For Android
    },
});

export default HomeScreen;
