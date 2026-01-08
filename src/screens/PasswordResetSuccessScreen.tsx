import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../theme/colors';
import {Fonts} from '../theme/fonts';
import { useNavigation } from '@react-navigation/native';


const PasswordResetSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.backgrounds.light}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {/* Success Icon Placeholder - Could be an Image or Vector Icon */}
          <View style={styles.iconContainer}>
              <Text style={styles.successIcon}>✓</Text>
          </View>

          <Text style={styles.title}>Password Reset</Text>
          <Text style={styles.message}>
            Your password has been successfully reset. You can now log in with your new password.
          </Text>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' as never }],
            })}
          >
            <Text style={styles.loginButtonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgrounds.light,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: Colors.splash.Lightred + '20', // Light red background with opacity
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
  },
  successIcon: {
      fontSize: 50,
      color: Colors.splash.Lightred,
      fontWeight: 'bold',
  },
  title: {
    fontFamily: Fonts.Inter?.boldHeading || 'System',
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
      fontFamily: Fonts.Inter?.regular || 'System',
      fontSize: 14,
      color: Colors.text.secondary,
      lineHeight: 22,
      marginBottom: 40,
      textAlign: 'center',
  },
  loginButton: {
    backgroundColor: Colors.splash.Lightred,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
    shadowColor: Colors.brand.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.Inter?.boldHeading || 'System',
  },
});

export default PasswordResetSuccessScreen;
