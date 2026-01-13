import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { useProfile } from '../../context/ProfileContext';

interface ProfileHeaderProps {
    onProfilePress: () => void;
    onNotificationPress: () => void;
}

const ProfileHeader = ({ onProfilePress, onNotificationPress }: ProfileHeaderProps) => {
    const { profile } = useProfile();

    // Default placeholder if no image is available
    const defaultImage = 'https://ui-avatars.com/api/?name=User&background=random';
    const profileImage = profile?.profileImage || defaultImage;
    const userName = profile?.firstName || 'User';

    return (
        <View style={styles.container}>
            {/* Left Side: Profile Info */}
            <TouchableOpacity
                style={styles.profileSection}
                onPress={onProfilePress}
                activeOpacity={0.8}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: profileImage }}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>Welcome back</Text>
                    <Text style={styles.nameText}>{userName}!</Text>
                </View>
            </TouchableOpacity>

            {/* Right Side: Notification Bell */}
            <TouchableOpacity
                style={styles.notificationButton}
                onPress={onNotificationPress}
                activeOpacity={0.8}
            >
                <Icon name="notifications-outline" size={24} color="#FF0000" />
                {/* Optional: multiple decorative effects to match premium feel */}
                <View style={[styles.notificationBadge, { opacity: 0 }]} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? 20 : 0,
        paddingBottom: 20,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    imageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#FF0000',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.status.online,
        borderWidth: 2,
        borderColor: '#f9f4ea', // Match background usually, or white
    },
    textContainer: {
        justifyContent: 'center',
    },
    welcomeText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 14,
        color: Colors.text.secondary,
        letterSpacing: 0.5,
    },
    nameText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 18,
        color: Colors.text.primary,
        marginTop: 2,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 14, // Squircle-ish
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08, // Subtle shadow
        shadowRadius: 12,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    notificationBadge: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.brand.primary,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    }
});

export default ProfileHeader;
