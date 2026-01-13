import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    ScrollView,
    Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

interface RideTrackingScreenProps {
    onBack: () => void;
}

const RideTrackingScreen: React.FC<RideTrackingScreenProps> = ({ onBack }) => {
    // Animation for the car moving along the route
    const carProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate the car from 0 to 1 (start to end of route)
        Animated.loop(
            Animated.sequence([
                Animated.timing(carProgress, {
                    toValue: 1,
                    duration: 8000, // 8 seconds to complete the route
                    useNativeDriver: false, // Changed to false for layout animations
                }),
                Animated.delay(500), // Short pause at destination
                Animated.timing(carProgress, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                })
            ])
        ).start();
    }, []);

    // Coordinate Constants for Perfect Alignment
    const PICKUP_X = width * 0.25;
    const PICKUP_Y = height * 0.15;
    const DROPOFF_X = width * 0.75;
    const DROPOFF_Y = height * 0.35;

    // Calculate Route Geometry
    const deltaX = DROPOFF_X - PICKUP_X;
    const deltaY = DROPOFF_Y - PICKUP_Y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Linearly interpolate between start and end points
    const carLeft = carProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [PICKUP_X, DROPOFF_X],
    });

    const carTop = carProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [PICKUP_Y, DROPOFF_Y],
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Map Image Background with Blur */}
            <View style={styles.mapContainer}>
                <Image
                    source={require('../../assets/images/map.png')}
                    style={styles.mapImage}
                    resizeMode="cover"
                    blurRadius={3}
                />

                {/* Modern Straight Gradient Route Track from Pickup to Dropoff */}
                <View style={styles.routeContainer}>
                    {/* Main Straight Line Route */}
                    <View style={{
                        position: 'absolute',
                        left: (PICKUP_X + DROPOFF_X) / 2 - distance / 2,
                        top: (PICKUP_Y + DROPOFF_Y) / 2,
                        width: distance,
                        height: 6,
                        backgroundColor: '#C62829',
                        transform: [{ rotate: `${angle}deg` }],
                        borderRadius: 3,
                        shadowColor: '#C62829',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                        elevation: 4
                    }} />
                </View>

                {/* Animated Car */}
                <Animated.View
                    style={[
                        styles.animatedCar,
                        {
                            left: 0, // Reset absolute positioning
                            top: 0,
                            transform: [
                                { translateX: carLeft },
                                { translateY: carTop },
                                { translateX: -20 }, // Center car (width/2)
                                { translateY: -15 }, // Center car (height/2)
                                { rotate: `${angle}deg` } // Align with route
                            ],
                        },
                    ]}
                >
                    <Image
                        source={require('../../assets/images/car.png')}
                        style={{
                            width: 50,
                            height: 30,
                        }}
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* Time/Distance Bubble - like Uber */}
                <Animated.View
                    style={[
                        styles.timeBubble,
                        {
                            left: 0,
                            top: 0,
                            transform: [
                                { translateX: carLeft },
                                { translateY: carTop },
                                { translateX: -35 },
                                { translateY: -55 },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.timeBubbleText}>8 min</Text>
                    <View style={styles.uberbadge}>
                        <Icon name="car-sport" size={10} color="#FFFFFF" />
                    </View>
                </Animated.View>

                {/* Back Button */}
                <SafeAreaView style={styles.topBar}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Icon name="arrow-back" size={24} color="#4A3F35" />
                    </TouchableOpacity>
                </SafeAreaView>

                {/* Location Markers */}
                <View style={[styles.pickupMarker, { left: PICKUP_X - 8, top: PICKUP_Y - 8 }]}>
                    <View style={styles.markerContainer}>
                        <View style={[styles.markerDot, { backgroundColor: '#4CAF50' }]} />
                        <Text style={styles.markerLabel}>Pick-up</Text>
                    </View>
                </View>

                <View style={[styles.dropoffMarker, { left: DROPOFF_X - 8, top: DROPOFF_Y - 8 }]}>
                    <View style={styles.markerContainer}>
                        <View style={[styles.markerDot, { backgroundColor: '#C62829' }]} />
                        <Text style={styles.markerLabel}>Drop-off</Text>
                    </View>
                </View>
            </View>

            {/* Bottom Card */}
            <View style={styles.bottomCard}>
                <View style={styles.cardHandle} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Driver Info */}
                    <View style={styles.driverSection}>
                        <View style={styles.driverInfo}>
                            <View style={styles.driverAvatar}>
                                <Icon name="person" size={28} color="#C62829" />
                            </View>
                            <View style={styles.driverDetails}>
                                <Text style={styles.driverName}>Amartya Caridia</Text>
                                <View style={styles.ratingRow}>
                                    <Icon name="star" size={14} color="#FFA726" />
                                    <Text style={styles.ratingText}>4.9</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.callButton}>
                            <Icon name="call" size={22} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Vehicle Info */}
                    <View style={styles.vehicleSection}>
                        <View style={styles.vehicleIconBox}>
                            <Icon name="car-sport" size={20} color="#C62829" />
                        </View>
                        <View>
                            <Text style={styles.vehicleLabel}>Vehicle</Text>
                            <Text style={styles.vehicleText}>Toyota Innova - MH12AB1234</Text>
                        </View>
                    </View>

                    {/* Trip Stats */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Icon name="navigate" size={20} color="#C62829" />
                            <Text style={styles.statLabel}>Distance</Text>
                            <Text style={styles.statValue}>12.5 km</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Icon name="time" size={20} color="#C62829" />
                            <Text style={styles.statLabel}>Duration</Text>
                            <Text style={styles.statValue}>00:18:32</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Icon name="speedometer" size={20} color="#C62829" />
                            <Text style={styles.statLabel}>ETA</Text>
                            <Text style={styles.statValue}>45 min</Text>
                        </View>
                    </View>

                    {/* Payment Method */}
                    <View style={styles.paymentSection}>
                        <Icon name="card" size={20} color="#6B5F52" />
                        <Text style={styles.paymentLabel}>Payment Method</Text>
                        <View style={styles.paymentMethods}>
                            <View style={styles.paymentChip}>
                                <Text style={styles.paymentText}>Cash</Text>
                            </View>
                            <View style={styles.paymentChip}>
                                <Text style={styles.paymentText}>UPI</Text>
                            </View>
                        </View>
                    </View>

                    {/* OTP Display */}
                    <View style={styles.otpSection}>
                        <View style={styles.otpHeader}>
                            <Icon name="key" size={18} color="#C62829" />
                            <Text style={styles.otpLabel}>Ride OTP</Text>
                        </View>
                        <View style={styles.otpBoxes}>
                            {'854768'.split('').map((digit, index) => (
                                <View key={index} style={styles.otpBox}>
                                    <Text style={styles.otpDigit}>{digit}</Text>
                                </View>
                            ))}
                        </View>
                    </View>



                    <View style={{ height: 20 }} />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f4ea',
    },
    mapContainer: {
        height: height * 0.5,
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    routeContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    routeSegment: {
        position: 'absolute',
        height: 6,
        backgroundColor: '#FFA726',
        borderRadius: 3,
        shadowColor: '#FFEB3B',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 2,
    },
    animatedCar: {
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor: 'transparent',
        transform: [{ translateX: -20 }, { translateY: -20 }],
    },
    carGif: {
        width: 40,
        height: 40,
    },
    timeBubble: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        transform: [{ translateX: -35 }, { translateY: -55 }],
    },
    timeBubbleText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 13,
        color: '#2C2C2C',
        marginRight: 6,
    },
    uberbadge: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },

    pickupMarker: {
        position: 'absolute',
        alignItems: 'center',
    },
    dropoffMarker: {
        position: 'absolute',
        alignItems: 'center',
    },
    markerContainer: {
        alignItems: 'center',
    },
    markerDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    markerLabel: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 11,
        color: '#4A3F35',
        marginTop: 4,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    bottomCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -32,
        paddingHorizontal: 24,
        paddingTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    cardHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#E8C9B3',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    driverSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    driverAvatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#FFF8ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    driverDetails: {
        flex: 1,
    },
    driverName: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 16,
        color: '#4A3F35',
        marginBottom: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 13,
        color: '#6B5F52',
    },
    callButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#C62829',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    vehicleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8ED',
        padding: 14,
        borderRadius: 16,
        marginBottom: 16,
        gap: 12,
    },
    vehicleIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vehicleLabel: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 11,
        color: '#9B8B7E',
        marginBottom: 2,
    },
    vehicleText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 14,
        color: '#4A3F35',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#f9f4ea',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E8C9B3',
        marginHorizontal: 8,
    },
    statLabel: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 11,
        color: '#9B8B7E',
        marginTop: 6,
        marginBottom: 4,
    },
    statValue: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 15,
        color: '#4A3F35',
    },
    paymentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8ED',
        padding: 14,
        borderRadius: 16,
        marginBottom: 16,
        gap: 10,
    },
    paymentLabel: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 13,
        color: '#6B5F52',
        flex: 1,
    },
    paymentMethods: {
        flexDirection: 'row',
        gap: 8,
    },
    paymentChip: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E8C9B3',
    },
    paymentText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 12,
        color: '#4A3F35',
    },
    otpSection: {
        backgroundColor: '#f9f4ea',
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
    },
    otpHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    otpLabel: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 13,
        color: '#6B5F52',
    },
    otpBoxes: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    otpBox: {
        width: 42,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#C62829',
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpDigit: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 20,
        color: '#C62829',
    },

});

export default RideTrackingScreen;
