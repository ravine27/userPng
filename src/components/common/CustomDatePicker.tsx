import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/fonts';
import { Spacing } from '../../theme/spacing';

interface CustomDatePickerProps {
    visible: boolean;
    onClose: () => void;
    onDateSelect: (date: string) => void;
    selectedDate?: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    visible,
    onClose,
    onDateSelect,
    selectedDate
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };

    const generateCalendar = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const days = daysInMonth(month, year);
        const firstDay = firstDayOfMonth(month, year);

        const calendar: (number | null)[] = [];

        for (let i = 0; i < firstDay; i++) {
            calendar.push(null);
        }

        for (let i = 1; i <= days; i++) {
            calendar.push(i);
        }

        return calendar;
    }, [currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDatePress = (day: number) => {
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayStr = day.toString().padStart(2, '0');
        const monthStr = (selected.getMonth() + 1).toString().padStart(2, '0');
        const yearStr = selected.getFullYear();
        onDateSelect(`${dayStr}-${monthStr}-${yearStr}`);
        onClose();
    };

    const isToday = (day: number) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

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
                            <Text style={styles.calendarIcon}>📅</Text>
                        </View>
                        <Text style={styles.headerTitle}>Select Date</Text>
                    </View>

                    {/* Month & Year Controls */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handlePrevMonth} style={styles.arrowButton}>
                            <Text style={styles.arrowText}>‹</Text>
                        </TouchableOpacity>
                        <View style={styles.monthYearBox}>
                            <Text style={styles.monthYearText}>
                                {MONTHS[currentDate.getMonth()]}
                            </Text>
                            <Text style={styles.yearText}>
                                {currentDate.getFullYear()}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handleNextMonth} style={styles.arrowButton}>
                            <Text style={styles.arrowText}>›</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Days of Week Header */}
                    <View style={styles.weekDaysContainer}>
                        {DAYS.map((day) => (
                            <View key={day} style={styles.weekDayBox}>
                                <Text style={styles.weekDayText}>{day}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    <View style={styles.calendarGrid}>
                        {generateCalendar.map((day, index) => (
                            <View key={index} style={styles.dayCell}>
                                {day !== null && (
                                    <TouchableOpacity
                                        style={[
                                            styles.dayButton,
                                            isToday(day) && styles.todayButton
                                        ]}
                                        onPress={() => handleDatePress(day)}
                                    >
                                        <Text style={[
                                            styles.dayText,
                                            isToday(day) && styles.todayText
                                        ]}>
                                            {day}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
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
        width: '90%',
        backgroundColor: '#f9f4ea',
        borderRadius: 28,
        padding: 24,
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
        top: -60,
        right: -60,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(219, 201, 166, 0.3)',
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
    calendarIcon: {
        fontSize: 22,
    },
    headerTitle: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 20,
        color: '#4A3F35',
        letterSpacing: 0.3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        shadowColor: '#DBC9A6',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    monthYearBox: {
        alignItems: 'center',
    },
    monthYearText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 18,
        color: '#C62829',
        letterSpacing: 0.5,
    },
    yearText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 13,
        color: '#6B5F52',
        marginTop: 2,
    },
    arrowButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FFF8ED',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8C9B3',
    },
    arrowText: {
        fontSize: 28,
        color: '#C62829',
        fontFamily: Fonts.Inter.boldHeading,
    },
    weekDaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
    },
    weekDayBox: {
        width: 40,
        alignItems: 'center',
    },
    weekDayText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 11,
        color: '#9B8B7E',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    dayButton: {
        width: 38,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8C9B3',
    },
    todayButton: {
        backgroundColor: '#C62829',
        borderColor: '#C62829',
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    dayText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 14,
        color: '#4A3F35',
    },
    todayText: {
        color: '#FFFFFF',
        fontFamily: Fonts.Inter.boldHeading,
    },
});

export default CustomDatePicker;
