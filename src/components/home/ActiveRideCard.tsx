import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/fonts';
import { Spacing } from '../../theme/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import RideDetailsModal from './RideDetailsModal';

export interface ActiveRideData {
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    seats: string;
    vehicle: string;
    purpose: string;
    otp: string;
    status?: 'Approved' | 'Pending';
}

interface ActiveRideCardProps {
    data: ActiveRideData;
    onViewDetails?: () => void;
    onTrackRide?: () => void;
}

const ActiveRideCard: React.FC<ActiveRideCardProps> = ({ data, onViewDetails, onTrackRide }) => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleViewDetails = () => {
        setShowDetailsModal(true);
        if (onViewDetails) {
            onViewDetails();
        }
    };

    return (
        <>
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.carIconCircle}>
                            <Icon name="car-sport" size={22} color="#9B8B7E" />
                        </View>
                        <View>
                            <Text style={styles.dateTimeText}>{data.date}</Text>
                            <Text style={styles.dateTimeText}>{data.time}</Text>
                        </View>
                    </View>
                    <View style={[styles.badge, (data.status === 'Pending' || !data.status) && { backgroundColor: '#FFF3E0' }]}>
                        <Icon
                            name={data.status === 'Approved' ? "checkmark-circle" : "time"}
                            size={14}
                            color={data.status === 'Approved' ? "#4CAF50" : "#FF9800"}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={[styles.badgeText, (data.status === 'Pending' || !data.status) && { color: '#FF9800' }]}>
                            {data.status || 'Pending'}
                        </Text>
                    </View>
                </View>

                {/* Route Info */}
                <View style={styles.routeContainer}>
                    {/* From */}
                    <View style={styles.locationRow}>
                        <View style={[styles.locationIconBox, { backgroundColor: '#ffeee6' }]}>
                            <Icon name="location" size={16} color="#C62829" />
                        </View>
                        <View>
                            <Text style={styles.locationLabel}>From</Text>
                            <Text style={styles.locationText}>{data.pickup || 'Pickup Location'}</Text>
                        </View>
                    </View>

                    {/* Connector Line */}
                    <View style={styles.connectorLine} />

                    {/* To */}
                    <View style={styles.locationRow}>
                        <View style={[styles.locationIconBox, { backgroundColor: '#fff8ed' }]}>
                            <Icon name="navigate" size={16} color="#DBC9A6" />
                        </View>
                        <View>
                            <Text style={styles.locationLabel}>To</Text>
                            <Text style={styles.locationText}>{data.dropoff || 'Dropoff Location'}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 20 }} />

                {/* Ride Details */}
                <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                        <Icon name="people" size={16} color="#9B8B7E" />
                        <Text style={styles.detailText}>{data.seats}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Icon name="car" size={16} color="#9B8B7E" />
                        <Text style={styles.detailText}>{data.vehicle}</Text>
                    </View>
                </View>

                <View style={{ height: 24 }} />

                {/* OTP Section - Warm Glassmorphism */}
                <View style={styles.otpContainer}>
                    <View style={styles.otpHeader}>
                        <Icon name="key" size={16} color="#C62829" style={{ marginRight: 8 }} />
                        <Text style={styles.otpTitle}>START PIN</Text>
                    </View>

                    <View style={styles.otpBoxesContainer}>
                        {data.otp.split('').map((digit, index) => (
                            <View key={index} style={styles.otpBox}>
                                <Text style={styles.otpDigit}>{digit}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.otpFooterText}>Share with driver to start ride</Text>
                </View>

                {/* Footer */}
                <TouchableOpacity onPress={handleViewDetails} style={styles.footer}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                    <Icon name="chevron-forward" size={16} color="#9B8B7E" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
            </View>

            {/* Ride Details Modal */}
            <RideDetailsModal
                visible={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                rideData={data}
                onTrackRide={() => {
                    setShowDetailsModal(false);
                    if (onTrackRide) {
                        onTrackRide();
                    }
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 20,
        marginVertical: Spacing.md,
        marginHorizontal: Spacing.md,
        shadowColor: "#DBC9A6",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(219, 201, 166, 0.2)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    carIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 18,
        backgroundColor: '#FFF8ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    dateTimeText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 13,
        color: '#4A3F35',
        lineHeight: 18,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 11,
        color: '#4CAF50',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    routeContainer: {
        position: 'relative',
        marginLeft: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationIconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        zIndex: 1,
    },
    connectorLine: {
        position: 'absolute',
        left: 15,
        top: 32,
        height: 24,
        width: 2,
        backgroundColor: '#E8C9B3',
        zIndex: 0,
        borderRadius: 1,
    },
    locationLabel: {
        fontSize: 10,
        color: '#9B8B7E',
        marginBottom: 2,
        fontFamily: Fonts.Inter.medium,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    locationText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 15,
        color: '#4A3F35',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        backgroundColor: '#FFF8ED',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 14,
        gap: 8,
    },
    detailText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 13,
        color: '#4A3F35',
    },
    otpContainer: {
        backgroundColor: 'rgba(249, 244, 234, 0.7)',
        borderRadius: 22,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(219, 201, 166, 0.3)',
    },
    otpHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    otpTitle: {
        fontFamily: Fonts.Inter.boldHeading,
        color: '#9B8B7E',
        fontSize: 10,
        letterSpacing: 2,
    },
    otpBoxesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 8,
    },
    otpBox: {
        backgroundColor: '#FFFFFF',
        width: 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 4,
        shadowColor: "#C62829",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(198, 40, 41, 0.1)',
    },
    otpDigit: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 22,
        color: '#C62829',
    },
    otpFooterText: {
        fontSize: 11,
        color: '#9B8B7E',
        fontFamily: Fonts.Inter.regular,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    viewDetailsText: {
        color: '#9B8B7E',
        fontFamily: Fonts.Inter.medium,
        fontSize: 13,
    },
});

export default ActiveRideCard;
