import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Fonts, FontSizes } from '../../theme/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

interface BookRideCardProps {
    onGoPress?: () => void;
}

const BookRideCard = ({ onGoPress }: BookRideCardProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={onGoPress} activeOpacity={0.92}>
                {/* Multiple decorative background glows for depth */}
                <View style={styles.glowEffect1} />
                <View style={styles.glowEffect2} />
                <View style={styles.patternOverlay} />

                <View style={styles.content}>
                    <View style={styles.leftSection}>
                        <View style={styles.iconCircle}>
                            <Icon name="car-sport" size={28} color="#FFFFFF" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Where to?</Text>
                            <Text style={styles.subtitle}>Plan your next journey</Text>
                            <View style={styles.quickInfoRow}>
                                <View style={styles.infoChip}>
                                    <Icon name="flash" size={10} color="#FFFFFF" />
                                    <Text style={styles.infoChipText}>Instant</Text>
                                </View>
                                <View style={styles.infoChip}>
                                    <Icon name="time" size={10} color="#FFFFFF" />
                                    <Text style={styles.infoChipText}>24/7</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.actionButton}>
                        <Icon name="arrow-forward" size={24} color="#C62829" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.lg,
        marginVertical: Spacing.md,
    },
    card: {
        backgroundColor: '#C62829',
        borderRadius: 32,
        padding: 26,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.35,
        shadowRadius: 24,
        elevation: 15,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 140,
    },
    glowEffect1: {
        position: 'absolute',
        top: -60,
        right: -60,
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    glowEffect2: {
        position: 'absolute',
        bottom: -40,
        left: -40,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    patternOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.05,
        backgroundColor: 'transparent',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
    },
    leftSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 4,
        letterSpacing: 0.3,
    },
    subtitle: {
        fontFamily: Fonts.Inter.regular,
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        marginBottom: 8,
        letterSpacing: 0.2,
    },
    quickInfoRow: {
        flexDirection: 'row',
        gap: 8,
    },
    infoChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.3)',
        gap: 4,
    },
    infoChipText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 10,
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    actionButton: {
        backgroundColor: '#f9f4ea',
        width: 56,
        height: 56,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.4)',
    },
});

export default BookRideCard;
