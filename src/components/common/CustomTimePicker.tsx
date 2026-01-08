import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/fonts';
import { Spacing } from '../../theme/spacing';

interface CustomTimePickerProps {
    visible: boolean;
    onClose: () => void;
    onTimeSelect: (time: string) => void;
    selectedTime?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
const AMPM = ['AM', 'PM'];

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
    visible,
    onClose,
    onTimeSelect
}) => {
    const [selectedHour, setSelectedHour] = useState('12');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [selectedAmPm, setSelectedAmPm] = useState('AM');

    const handleConfirm = () => {
        onTimeSelect(`${selectedHour}:${selectedMinute} ${selectedAmPm}`);
        onClose();
    };

    const renderColumn = (items: string[], selectedItem: string, onSelect: (item: string) => void, label: string) => (
        <View style={styles.columnWrapper}>
            <Text style={styles.columnLabel}>{label}</Text>
            <ScrollView style={styles.column} showsVerticalScrollIndicator={false}>
                {items.map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.item,
                            selectedItem === item && styles.selectedItem
                        ]}
                        onPress={() => onSelect(item)}
                    >
                        <Text style={[
                            styles.itemText,
                            selectedItem === item && styles.selectedItemText
                        ]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <View style={styles.pickerContainer}>
                    <View style={styles.glowEffect} />

                    {/* Header */}
                    <View style={styles.headerSection}>
                        <View style={styles.iconBox}>
                            <Text style={styles.clockIcon}>⏰</Text>
                        </View>
                        <Text style={styles.title}>Select Time</Text>
                    </View>

                    {/* Preview Display */}
                    <View style={styles.previewBox}>
                        <Text style={styles.previewText}>
                            {selectedHour}:{selectedMinute} {selectedAmPm}
                        </Text>
                    </View>

                    {/* Picker Columns */}
                    <View style={styles.pickerWrapper}>
                        {renderColumn(HOURS, selectedHour, setSelectedHour, 'Hour')}
                        <View style={styles.separatorColumn}>
                            <Text style={styles.separator}>:</Text>
                        </View>
                        {renderColumn(MINUTES, selectedMinute, setSelectedMinute, 'Min')}
                        <View style={styles.separatorColumn}>
                            <Text style={styles.separator}> </Text>
                        </View>
                        {renderColumn(AMPM, selectedAmPm, setSelectedAmPm, 'Period')}
                    </View>

                    {/* Confirm Button */}
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <View style={styles.buttonGlow} />
                        <Text style={styles.confirmButtonText}>Confirm Time →</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(74, 63, 53, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        width: '85%',
        backgroundColor: '#f9f4ea',
        borderRadius: 28,
        padding: 24,
        alignItems: 'center',
        shadowColor: "#C62829",
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
        position: 'relative',
        overflow: 'hidden',
    },
    glowEffect: {
        position: 'absolute',
        bottom: -60,
        left: -60,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(219, 201, 166, 0.3)',
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowColor: '#DBC9A6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
    },
    clockIcon: {
        fontSize: 22,
    },
    title: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 20,
        color: '#4A3F35',
        letterSpacing: 0.3,
    },
    previewBox: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderRadius: 18,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#C62829',
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    previewText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 32,
        color: '#C62829',
        letterSpacing: 1,
    },
    pickerWrapper: {
        flexDirection: 'row',
        height: 160,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    columnWrapper: {
        flex: 1,
    },
    columnLabel: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 11,
        color: '#9B8B7E',
        textAlign: 'center',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    column: {
        height: '100%',
    },
    separatorColumn: {
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        fontSize: 24,
        fontFamily: Fonts.Inter.boldHeading,
        color: '#6B5F52',
    },
    item: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 2,
    },
    selectedItem: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E8C9B3',
        shadowColor: '#DBC9A6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    itemText: {
        fontSize: 16,
        fontFamily: Fonts.Inter.regular,
        color: '#9B8B7E',
    },
    selectedItemText: {
        color: '#C62829',
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 20,
    },
    confirmButton: {
        backgroundColor: '#C62829',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 18,
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    buttonGlow: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 16,
        letterSpacing: 0.5,
        zIndex: 1,
    },
});

export default CustomTimePicker;
