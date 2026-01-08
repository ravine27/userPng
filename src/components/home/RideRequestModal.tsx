import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Fonts, FontSizes } from '../../theme/fonts';
import CustomDatePicker from '../common/CustomDatePicker';
import CustomTimePicker from '../common/CustomTimePicker';
import Icon from 'react-native-vector-icons/Ionicons';

interface RideRequestModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const RideRequestModal: React.FC<RideRequestModalProps> = ({ visible, onClose, onSubmit }) => {
    // Form States
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [date, setDate] = useState('dd-mm-yyyy');
    const [time, setTime] = useState('--:-- --');
    const [seats, setSeats] = useState('4 Seat');
    const [vehicleType, setVehicleType] = useState('Select type');
    const [purpose, setPurpose] = useState('');
    const [notes, setNotes] = useState('');

    const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
    const [showSeatsDropdown, setShowSeatsDropdown] = useState(false);

    // Picker Visibility States
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const vehicleOptions = ['Select type', 'Sedan', 'SUV'];
    const seatsOptions = ['4', '5', '6', '7'];

    const handleSendRequest = () => {
        const requestData = {
            pickup: pickupLocation,
            dropoff: dropoffLocation,
            date,
            time,
            seats,
            vehicle: vehicleType,
            purpose,
            notes
        };
        onSubmit(requestData);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Premium Header */}
                    <View style={styles.headerWrapper}>
                        <View style={styles.header}>
                            <View style={styles.headerGlow} />
                            <View style={styles.headerTitleContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="car-sport" size={26} color="#FFFFFF" />
                                    <View style={styles.iconGlow} />
                                </View>
                                <View style={styles.titleSection}>
                                    <Text style={styles.headerTitle}>New Ride Request</Text>
                                    <Text style={styles.headerSubtitle}>Fill in your ride details</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Icon name="close" size={22} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={styles.progressFill} />
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
                        {/* Location Section */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <View style={styles.sectionIconBox}>
                                    <Icon name="map" size={18} color="#C62829" />
                                </View>
                                <Text style={styles.sectionTitle}>Journey Details</Text>
                            </View>

                            {/* Pickup Location */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Pickup Location</Text>
                                <View style={styles.inputWrapper}>
                                    <Icon name="location" size={18} color="#C62829" style={{ marginRight: 12 }} />
                                    <TextInput
                                        style={styles.input}
                                        value={pickupLocation}
                                        onChangeText={setPickupLocation}
                                        placeholder="Enter pickup address"
                                        placeholderTextColor="#9B8B7E"
                                    />
                                </View>
                            </View>

                            {/* Drop-off Location */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Drop-off Location</Text>
                                <View style={styles.inputWrapper}>
                                    <Icon name="navigate" size={18} color="#DBC9A6" style={{ marginRight: 12 }} />
                                    <TextInput
                                        style={styles.input}
                                        value={dropoffLocation}
                                        onChangeText={setDropoffLocation}
                                        placeholder="Enter destination address"
                                        placeholderTextColor="#9B8B7E"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Schedule Section */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <View style={styles.sectionIconBox}>
                                    <Icon name="time" size={18} color="#C62829" />
                                </View>
                                <Text style={styles.sectionTitle}>Schedule</Text>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.halfInputContainer}>
                                    <Text style={styles.label}>Date</Text>
                                    <TouchableOpacity
                                        style={styles.inputWrapper}
                                        onPress={() => setShowDatePicker(true)}
                                    >
                                        <Icon name="calendar" size={18} color="#6B5F52" style={{ marginRight: 10 }} />
                                        <Text style={[styles.input, styles.pickerText]}>{date}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.halfInputContainer}>
                                    <Text style={styles.label}>Time</Text>
                                    <TouchableOpacity
                                        style={styles.inputWrapper}
                                        onPress={() => setShowTimePicker(true)}
                                    >
                                        <Icon name="alarm" size={18} color="#6B5F52" style={{ marginRight: 10 }} />
                                        <Text style={[styles.input, styles.pickerText]}>{time}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Vehicle Section */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <View style={styles.sectionIconBox}>
                                    <Icon name="car" size={18} color="#C62829" />
                                </View>
                                <Text style={styles.sectionTitle}>Vehicle Preferences</Text>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.halfInputContainer}>
                                    <Text style={styles.label}>Seats</Text>
                                    <TouchableOpacity
                                        style={styles.inputWrapper}
                                        onPress={() => setShowSeatsDropdown(!showSeatsDropdown)}
                                    >
                                        <Icon name="people" size={18} color="#6B5F52" style={{ marginRight: 10 }} />
                                        <Text style={[styles.input, styles.pickerText]}>{seats}</Text>
                                        <Icon name="chevron-down" size={16} color="#9B8B7E" />
                                    </TouchableOpacity>

                                    {showSeatsDropdown && (
                                        <View style={styles.dropdown}>
                                            {seatsOptions.map((option, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.dropdownOption}
                                                    onPress={() => {
                                                        setSeats(option + ' Seat');
                                                        setShowSeatsDropdown(false);
                                                    }}
                                                >
                                                    <Text style={[
                                                        styles.dropdownOptionText,
                                                        seats === option + ' Seat' && styles.selectedOptionText
                                                    ]}>
                                                        {option} Seat
                                                    </Text>
                                                    {seats === option + ' Seat' && (
                                                        <Icon name="checkmark" size={18} color="#C62829" />
                                                    )}
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>
                                <View style={styles.halfInputContainer}>
                                    <Text style={styles.label}>Vehicle Type</Text>
                                    <TouchableOpacity
                                        style={styles.inputWrapper}
                                        onPress={() => setShowVehicleDropdown(!showVehicleDropdown)}
                                    >
                                        <Icon name="car-sport" size={18} color="#6B5F52" style={{ marginRight: 10 }} />
                                        <Text style={[styles.input, styles.pickerText]}>{vehicleType}</Text>
                                        <Icon name="chevron-down" size={16} color="#9B8B7E" />
                                    </TouchableOpacity>

                                    {showVehicleDropdown && (
                                        <View style={styles.dropdown}>
                                            {vehicleOptions.map((option, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.dropdownOption}
                                                    onPress={() => {
                                                        setVehicleType(option);
                                                        setShowVehicleDropdown(false);
                                                    }}
                                                >
                                                    <Text style={[
                                                        styles.dropdownOptionText,
                                                        vehicleType === option && styles.selectedOptionText
                                                    ]}>
                                                        {option}
                                                    </Text>
                                                    {vehicleType === option && (
                                                        <Icon name="checkmark" size={18} color="#C62829" />
                                                    )}
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>

                        {/* Additional Info Section */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <View style={styles.sectionIconBox}>
                                    <Icon name="document-text" size={18} color="#C62829" />
                                </View>
                                <Text style={styles.sectionTitle}>Additional Information</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Purpose</Text>
                                <View style={styles.inputWrapper}>
                                    <Icon name="flag" size={18} color="#6B5F52" style={{ marginRight: 12 }} />
                                    <TextInput
                                        style={styles.input}
                                        value={purpose}
                                        onChangeText={setPurpose}
                                        placeholder="e.g., Airport transfer"
                                        placeholderTextColor="#9B8B7E"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Special Requirements (Optional)</Text>
                                <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                                    <TextInput
                                        style={[styles.input, styles.textArea]}
                                        value={notes}
                                        onChangeText={setNotes}
                                        placeholder="Any special requirements..."
                                        placeholderTextColor="#9B8B7E"
                                        multiline
                                        textAlignVertical="top"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.spacer} />
                    </ScrollView>

                    {/* Premium Footer */}
                    <View style={styles.footer}>
                        <View style={styles.footerGradient} />
                        <View style={styles.footerContent}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sendButton} onPress={handleSendRequest}>
                                <View style={styles.sendButtonGlow} />
                                <Text style={styles.sendButtonText}>Send Request</Text>
                                <Icon name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Custom Pickers */}
                    <CustomDatePicker
                        visible={showDatePicker}
                        onClose={() => setShowDatePicker(false)}
                        onDateSelect={setDate}
                        selectedDate={date}
                    />
                    <CustomTimePicker
                        visible={showTimePicker}
                        onClose={() => setShowTimePicker(false)}
                        onTimeSelect={setTime}
                        selectedTime={time}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(74, 63, 53, 0.7)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#f9f4ea',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        overflow: 'hidden',
        maxHeight: '94%',
        shadowColor: "#C62829",
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 25,
    },
    headerWrapper: {
        backgroundColor: '#C62829',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative',
    },
    headerGlow: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        position: 'relative',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    iconGlow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    titleSection: {
        flex: 1,
    },
    headerTitle: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 22,
        color: '#fff',
        marginBottom: 3,
        letterSpacing: 0.3,
    },
    headerSubtitle: {
        fontFamily: Fonts.Inter.regular,
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
        letterSpacing: 0.2,
    },
    closeButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    progressBar: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    progressFill: {
        height: '100%',
        width: '30%',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    body: {
        padding: 24,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 28,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionIconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowColor: '#DBC9A6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 16,
        color: '#4A3F35',
        letterSpacing: 0.3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    halfInputContainer: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 12,
        color: '#6B5F52',
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    inputWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1.5,
        borderColor: '#E8C9B3',
        shadowColor: "#DBC9A6",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    input: {
        flex: 1,
        fontFamily: Fonts.Inter.medium,
        fontSize: 15,
        color: '#4A3F35',
        height: '100%',
    },
    pickerText: {
        paddingVertical: 12,
    },
    textAreaWrapper: {
        height: 110,
        alignItems: 'flex-start',
        paddingTop: 14,
        paddingBottom: 14,
    },
    textArea: {
        height: '100%',
        textAlignVertical: 'top',
    },
    spacer: {
        height: 20,
    },
    dropdown: {
        position: 'absolute',
        top: 64,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 18,
        elevation: 12,
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        zIndex: 1000,
        padding: 8,
        borderWidth: 1.5,
        borderColor: '#E8C9B3',
    },
    dropdownOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF8ED',
        borderRadius: 8,
    },
    dropdownOptionText: {
        fontFamily: Fonts.Inter.regular,
        fontSize: 15,
        color: '#4A3F35',
    },
    selectedOptionText: {
        color: '#C62829',
        fontFamily: Fonts.Inter.boldHeading,
    },
    footer: {
        position: 'relative',
        backgroundColor: '#fff',
        borderTopWidth: 1.5,
        borderTopColor: '#E8C9B3',
    },
    footerGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#DBC9A6',
        opacity: 0.3,
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#FFF8ED',
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E8C9B3',
        shadowColor: '#DBC9A6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cancelButtonText: {
        fontFamily: Fonts.Inter.boldHeading,
        color: '#6B5F52',
        fontSize: 16,
        letterSpacing: 0.3,
    },
    sendButton: {
        flex: 1.6,
        backgroundColor: '#C62829',
        paddingVertical: 18,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
        position: 'relative',
        overflow: 'hidden',
    },
    sendButtonGlow: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    sendButtonText: {
        fontFamily: Fonts.Inter.boldHeading,
        color: '#fff',
        fontSize: 16,
        letterSpacing: 0.5,
        zIndex: 1,
    },
});

export default RideRequestModal;
