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

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'success' | 'alert';
    read: boolean;
}

interface NotificationsModalProps {
    visible: boolean;
    onClose: () => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ visible, onClose }) => {

    // Dummy Data
    const notifications: Notification[] = [
        {
            id: '1',
            title: 'Ride Approved',
            message: 'Your ride to Baner, Pune has been approved by the admin.',
            time: '2 mins ago',
            type: 'success',
            read: false,
        },
        {
            id: '2',
            title: 'Driver Arrived',
            message: 'Amartya is waiting at your pickup location.',
            time: '15 mins ago',
            type: 'info',
            read: true,
        },
        {
            id: '3',
            title: 'Payment Successful',
            message: 'Payment of ₹250 for your last ride was successful.',
            time: '1 hr ago',
            type: 'success',
            read: true,
        },
        {
            id: '4',
            title: 'System Alert',
            message: 'Scheduled maintenance tonight from 2 AM to 4 AM.',
            time: '5 hrs ago',
            type: 'alert',
            read: true,
        },
        {
            id: '5',
            title: 'New Feature',
            message: 'You can now share your live location with friends!',
            time: '1 day ago',
            type: 'info',
            read: true,
        },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return 'checkmark-circle';
            case 'alert': return 'warning';
            default: return 'information-circle';
        }
    };

    const getColor = (type: string) => {
        return '#FF0000';
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
                <View style={styles.popoverContainer}>
                    {/* Little Triangle/Arrow pointing up */}
                    <View style={styles.arrowUp} />

                    <View style={styles.popoverContent}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Notifications</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Icon name="close" size={20} color="#9B8B7E" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.body} showsVerticalScrollIndicator={true}>
                            {notifications.map((item) => (
                                <View key={item.id} style={[styles.notificationCard, !item.read && styles.unreadCard]}>
                                    <View style={[styles.iconContainer, { backgroundColor: `${getColor(item.type)}20` }]}>
                                        <Icon name={getIcon(item.type)} size={18} color={getColor(item.type)} />
                                    </View>
                                    <View style={styles.contentContainer}>
                                        <View style={styles.cardHeader}>
                                            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                                            <Text style={styles.time}>{item.time}</Text>
                                        </View>
                                        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.markReadText}>Mark all as read</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)', // Slight dimming
    },
    popoverContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 110 : 90, // Adjust based on header height
        right: 24,
        alignItems: 'flex-end',
    },
    arrowUp: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FFFFFF',
        marginRight: 12, // Align with bell icon roughly
        marginBottom: -1, // Connect to box
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    popoverContent: {
        width: 300,
        maxHeight: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 14,
        color: '#4A3F35',
    },
    body: {
        padding: 8,
    },
    notificationCard: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 12,
        marginBottom: 4,
    },
    unreadCard: {
        backgroundColor: '#FFF8ED',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    contentContainer: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    title: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 12,
        color: '#4A3F35',
        flex: 1,
    },
    time: {
        fontFamily: Fonts.Inter.regular,
        fontSize: 10,
        color: '#9B8B7E',
        marginLeft: 8,
    },
    message: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 11,
        color: '#6B5F52',
        lineHeight: 16,
    },
    footer: {
        padding: 12,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    markReadText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 12,
        color: '#C62829',
    },
});

export default NotificationsModal;
