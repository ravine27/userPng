import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../../theme/fonts';

const { width } = Dimensions.get('window');

interface CustomToastProps {
    visible: boolean;
    message: string;
    type?: 'success' | 'error';
    onHide?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
    visible,
    message,
    type = 'success',
    onHide
}) => {
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Show animation
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto hide after 3 seconds
            const timer = setTimeout(() => {
                hideToast();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (onHide) onHide();
        });
    };

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <View style={[
                styles.toast,
                type === 'success' ? styles.successToast : styles.errorToast
            ]}>
                <View style={[
                    styles.iconContainer,
                    type === 'success' ? styles.successIcon : styles.errorIcon
                ]}>
                    <Icon
                        name={type === 'success' ? 'checkmark-circle' : 'alert-circle'}
                        size={24}
                        color="#FFFFFF"
                    />
                </View>
                <Text style={styles.message}>{message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        zIndex: 9999,
        alignItems: 'center',
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 40,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
        gap: 12,
    },
    successToast: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    errorToast: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#C62829',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successIcon: {
        backgroundColor: '#4CAF50',
    },
    errorIcon: {
        backgroundColor: '#C62829',
    },
    message: {
        flex: 1,
        fontFamily: Fonts.Inter.medium,
        fontSize: 14,
        color: '#4A3F35',
        letterSpacing: 0.3,
    },
});

export default CustomToast;
