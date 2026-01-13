import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Fonts } from '../../theme/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActiveRideData } from './ActiveRideCard';

interface RideDetailsModalProps {
    visible: boolean;
    onClose: () => void;
    rideData: ActiveRideData;
    onTrackRide?: () => void;
}

const RideDetailsModal: React.FC<RideDetailsModalProps> = ({ visible, onClose, rideData, onTrackRide }) => {
    // Mock driver and vehicle data - in real app, this would come from props
    const driverName = "John Smith";
    const vehicleName = "Toyota Innova";
    const vehicleModel = "Modelname";

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <View style={styles.headerIconBox}>
                                <Icon name="car-sport" size={24} color="#C62829" />
                            </View>
                            <View>
                                <Text style={styles.headerTitle}>Ride Request Details</Text>
                                <Text style={styles.headerSubtitle}>
                                    Created on {new Date().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Icon name="close" size={24} color="#6B5F52" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
                        {/* Current Status */}
                        <View style={styles.statusSection}>
                            <Text style={styles.statusLabel}>Current Status</Text>
                            <View style={styles.statusBadge}>
                                <Icon name="checkmark-circle" size={18} color="#4CAF50" />
                                <Text style={styles.statusText}>Approved</Text>
                            </View>
                        </View>

                        {/* Route Information */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>ROUTE INFORMATION</Text>

                            <View style={styles.routeCard}>
                                <View style={styles.locationContainer}>
                                    <View style={[styles.locationIcon, { backgroundColor: '#D4EDDA' }]}>
                                        <Icon name="location" size={20} color="#28A745" />
                                    </View>
                                    <View style={styles.locationInfo}>
                                        <Text style={styles.locationLabel}>PICKUP LOCATION</Text>
                                        <Text style={styles.locationText}>{rideData.pickup}</Text>
                                    </View>
                                </View>

                                <View style={styles.routeConnector} />

                                <View style={styles.locationContainer}>
                                    <View style={[styles.locationIcon, { backgroundColor: '#F8D7DA' }]}>
                                        <Icon name="navigate" size={20} color="#DC3545" />
                                    </View>
                                    <View style={styles.locationInfo}>
                                        <Text style={styles.locationLabel}>DROP-OFF LOCATION</Text>
                                        <Text style={styles.locationText}>{rideData.dropoff}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Details Grid */}
                        <View style={styles.gridContainer}>
                            <View style={styles.gridRow}>
                                <View style={[styles.gridCard, { backgroundColor: '#F0E6FF' }]}>
                                    <Icon name="calendar" size={28} color="#7C4DFF" />
                                    <Text style={styles.gridLabel}>Date</Text>
                                    <Text style={styles.gridValue}>{rideData.date}</Text>
                                </View>
                                <View style={[styles.gridCard, { backgroundColor: '#E3F2FD' }]}>
                                    <Icon name="time" size={28} color="#2196F3" />
                                    <Text style={styles.gridLabel}>Time</Text>
                                    <Text style={styles.gridValue}>{rideData.time}</Text>
                                </View>
                            </View>

                            <View style={styles.gridRow}>
                                <View style={[styles.gridCard, { backgroundColor: '#FCE4EC' }]}>
                                    <Icon name="people" size={28} color="#E91E63" />
                                    <Text style={styles.gridLabel}>Seats</Text>
                                    <Text style={styles.gridValue}>{rideData.seats}</Text>
                                </View>
                                <View style={[styles.gridCard, { backgroundColor: '#FFF8E1' }]}>
                                    <Icon name="car-sport" size={28} color="#FFA726" />
                                    <Text style={styles.gridLabel}>Vehicle</Text>
                                    <Text style={styles.gridValue}>{rideData.vehicle}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Purpose */}
                        <View style={styles.section}>
                            <View style={styles.purposeCard}>
                                <Icon name="document-text" size={20} color="#C62829" />
                                <View style={styles.purposeInfo}>
                                    <Text style={styles.purposeLabel}>Purpose</Text>
                                    <Text style={styles.purposeText}>{rideData.purpose || 'Not specified'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Ride Assignment */}
                        <View style={styles.section}>
                            <View style={styles.assignmentHeader}>
                                <Icon name="information-circle" size={20} color="#C62829" />
                                <Text style={styles.sectionTitle}>YOUR RIDE ASSIGNMENT</Text>
                            </View>

                            <View style={styles.assignmentCard}>
                                <View style={styles.assignmentItem}>
                                    <View style={styles.assignmentIconBox}>
                                        <Icon name="person" size={22} color="#2196F3" />
                                    </View>
                                    <View>
                                        <Text style={styles.assignmentLabel}>YOUR DRIVER</Text>
                                        <Text style={styles.assignmentValue}>{driverName}</Text>
                                    </View>
                                </View>

                                <View style={styles.assignmentDivider} />

                                <View style={styles.assignmentItem}>
                                    <View style={styles.assignmentIconBox}>
                                        <Icon name="car" size={22} color="#4CAF50" />
                                    </View>
                                    <View>
                                        <Text style={styles.assignmentLabel}>YOUR VEHICLE</Text>
                                        <Text style={styles.assignmentValue}>{vehicleName}</Text>
                                        <Text style={styles.assignmentSubtext}>{vehicleModel}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* OTP Section */}
                        <View style={styles.section}>
                            <View style={styles.otpHeader}>
                                <Icon name="key" size={20} color="#C62829" />
                                <Text style={styles.sectionTitle}>RIDE START OTP</Text>
                            </View>
                            <Text style={styles.otpInstruction}>
                                Share this code with your driver
                            </Text>

                            <View style={styles.otpContainer}>
                                {rideData.otp.split('').map((digit, index) => (
                                    <View key={index} style={styles.otpBox}>
                                        <Text style={styles.otpDigit}>{digit}</Text>
                                    </View>
                                ))}
                            </View>

                            <Text style={styles.otpNote}>
                                The driver needs this OTP to start your ride. Do not share it until you're ready to begin your journey.
                            </Text>
                        </View>

                        <View style={{ height: 20 }} />
                    </ScrollView>

                    {/* Footer Actions */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.actionButton} onPress={onClose}>
                            <Icon name="close-circle" size={20} color="#C62829" />
                            <Text style={styles.actionButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.primaryActionButton} onPress={onTrackRide}>
                            <Icon name="navigate" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
                            <Text style={styles.primaryActionButtonText}>Track Ride</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(74, 63, 53, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '92%',
        maxHeight: '90%',
        backgroundColor: '#f9f4ea',
        borderRadius: 28,
        overflow: 'hidden',
        shadowColor: "#C62829",
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 20,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E8C9B3',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    headerIconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#FFF8ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 18,
        color: '#4A3F35',
        marginBottom: 2,
    },
    headerSubtitle: {
        fontFamily: Fonts.Inter.regular,
        fontSize: 11,
        color: '#9B8B7E',
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFF8ED',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        padding: 20,
        paddingBottom: 30,
    },
    statusSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    statusLabel: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 13,
        color: '#6B5F52',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    statusText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 13,
        color: '#4CAF50',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 12,
        color: '#6B5F52',
        letterSpacing: 1,
        marginBottom: 12,
    },
    routeCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#DBC9A6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    locationInfo: {
        flex: 1,
    },
    locationLabel: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 10,
        color: '#9B8B7E',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    locationText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 15,
        color: '#4A3F35',
    },
    routeConnector: {
        width: 2,
        height: 20,
        backgroundColor: '#E8C9B3',
        marginLeft: 21,
        marginVertical: 8,
    },
    gridContainer: {
        marginBottom: 20,
    },
    gridRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    gridCard: {
        flex: 1,
        padding: 16,
        borderRadius: 18,
        alignItems: 'center',
    },
    gridLabel: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 11,
        color: '#6B5F52',
        marginTop: 8,
        marginBottom: 4,
    },
    gridValue: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 14,
        color: '#4A3F35',
    },
    purposeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    purposeInfo: {
        flex: 1,
    },
    purposeLabel: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 11,
        color: '#9B8B7E',
        marginBottom: 4,
    },
    purposeText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 14,
        color: '#4A3F35',
    },
    assignmentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    assignmentCard: {
        backgroundColor: '#E3F2FD',
        borderRadius: 20,
        padding: 18,
    },
    assignmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    assignmentIconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    assignmentLabel: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 10,
        color: '#2196F3',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    assignmentValue: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 15,
        color: '#4A3F35',
    },
    assignmentSubtext: {
        fontFamily: Fonts.Inter.regular,
        fontSize: 12,
        color: '#9B8B7E',
        marginTop: 2,
    },
    assignmentDivider: {
        height: 1,
        backgroundColor: '#BBDEFB',
        marginVertical: 16,
    },
    otpHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    otpInstruction: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 13,
        color: '#6B5F52',
        marginBottom: 16,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 12,
    },
    otpBox: {
        width: 44,
        height: 52,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#C62829',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    otpDigit: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 24,
        color: '#C62829',
    },
    otpNote: {
        fontFamily: Fonts.Inter.regular,
        fontSize: 11,
        color: '#9B8B7E',
        textAlign: 'center',
        lineHeight: 16,
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E8C9B3',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF8ED',
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#E8C9B3',
        gap: 8,
    },
    actionButtonText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 14,
        color: '#C62829',
    },
    primaryActionButton: {
        flex: 1,
        backgroundColor: '#C62829',
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    primaryActionButtonText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 14,
        color: '#FFFFFF',
    },
});

export default RideDetailsModal;
