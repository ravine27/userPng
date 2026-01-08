import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Fonts } from '../../theme/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProfile } from '../../context/ProfileContext';

interface ProfileHeaderProps {
  onProfilePress?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onProfilePress }) => {
  const { profile } = useProfile();

  const displayName = profile?.firstName
    ? `${profile.firstName} ${profile.lastName}`
    : 'John Doe';

  return (
    <View style={styles.container}>
      {/* Profile Section - Left */}
      <TouchableOpacity style={styles.profileSection} onPress={onProfilePress} activeOpacity={0.7}>
        <View style={styles.profileContainer}>
          {profile?.profileImage ? (
            <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
          ) : (
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.profileImage}
            />
          )}
          <View style={styles.onlineBadge} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.userName}>{displayName}</Text>
        </View>
      </TouchableOpacity>

      {/* Notification Bell - Top Right */}
      <TouchableOpacity style={styles.notificationButton}>
        <Icon name="notifications" size={22} color="#C62829" />
        <View style={styles.notificationDot} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative',
    marginRight: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8C9B3',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#C62829',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#f9f4ea',
  },
  profileInfo: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: Fonts.Inter.regular,
    fontSize: 12,
    color: '#9B8B7E',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  userName: {
    fontFamily: Fonts.Inter.boldHeading,
    fontSize: 16,
    color: '#4A3F35',
    letterSpacing: 0.3,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#DBC9A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C62829',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});

export default ProfileHeader;
