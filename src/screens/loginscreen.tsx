import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../context/ProfileContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PNGLogo from '../assets/icons/png.png';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigation = useNavigation<any>();

  const { profile } = useProfile();

  // Load saved credentials on mount
  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('@saved_email');
      const savedPassword = await AsyncStorage.getItem('@saved_password');
      const wasRemembered = await AsyncStorage.getItem('@remember_me');

      if (wasRemembered === 'true' && savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    }
  };

  const handleLogin = async () => {
    // Save credentials if remember me is checked
    try {
      if (rememberMe) {
        await AsyncStorage.setItem('@saved_email', email);
        await AsyncStorage.setItem('@saved_password', password);
        await AsyncStorage.setItem('@remember_me', 'true');
      } else {
        await AsyncStorage.removeItem('@saved_email');
        await AsyncStorage.removeItem('@saved_password');
        await AsyncStorage.removeItem('@remember_me');
      }
    } catch (error) {
      console.error('Error saving credentials:', error);
    }

    // Navigate based on whether profile exists
    if (profile) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'CreateProfileScreen' }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f9f4ea', '#ffffff']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#f9f4ea"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>

            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Image source={PNGLogo} style={{ width: 180, height: 120 }} resizeMode="contain" />
              </View>
            </View>

            {/* Headers */}
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>Welcome to PNG-Fleet APP</Text>
              <Text style={styles.subWelcomeText}>Enter your email and password to Login</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Icon name="mail-outline" size={20} color="#9B8B7E" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, emailFocused && styles.inputFocused]}
                    placeholder="Email"
                    placeholderTextColor="#9B8B7E"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Icon name="lock-closed-outline" size={20} color="#9B8B7E" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, passwordFocused && styles.inputFocused]}
                    placeholder="Password"
                    placeholderTextColor="#9B8B7E"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#9B8B7E"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Row 1: Remember Me & Forgot Password */}
              <View style={styles.rowSpaceBetween}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Icon name="checkmark" size={12} color="#fff" />}
                  </View>
                  <Text style={styles.checkboxLabel}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowForgotPasswordModal(true)}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Row 2: Terms */}
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                  {agreedToTerms && <Icon name="checkmark" size={12} color="#fff" />}
                </View>
                <View style={styles.termsTextContainer}>
                  <Text style={styles.checkboxLabel}>I agree to the </Text>
                  <Text style={styles.termsLink}>Terms & Conditions</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity
                style={[
                  styles.loginButton,
                  (!email || !password || !agreedToTerms) && styles.loginButtonDisabled
                ]}
                onPress={handleLogin}
                disabled={!email || !password || !agreedToTerms}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>

      {/* Forgot Password Modal */}
      <Modal
        visible={showForgotPasswordModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowForgotPasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.forgotPasswordCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reset Password</Text>
              <TouchableOpacity onPress={() => setShowForgotPasswordModal(false)}>
                <Icon name="close" size={24} color="#4A3F35" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>

            <View style={styles.modalInputWrapper}>
              <Icon name="mail-outline" size={20} color="#9B8B7E" style={styles.modalInputIcon} />
              <TextInput
                style={styles.modalInput}
                placeholder="Email"
                placeholderTextColor="#9B8B7E"
                value={resetEmail}
                onChangeText={setResetEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[styles.sendLinkButton, !resetEmail && styles.sendLinkButtonDisabled]}
              onPress={() => {
                if (resetEmail) {
                  setShowForgotPasswordModal(false);
                  setResetEmail('');
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }
              }}
              disabled={!resetEmail}
            >
              <Text style={styles.sendLinkButtonText}>Send Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Toast Notification */}
      {showToast && (
        <View style={styles.toast}>
          <Icon name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text style={styles.toastText}>Link has been sent to change password</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f4ea',
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 220,
    height: 150,
    borderRadius: 20,
    backgroundColor: '#C62829',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C62829',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  headerContent: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  welcomeText: {
    fontFamily: Fonts.Inter?.boldHeading || 'System',
    fontSize: 26,
    color: '#4A3F35',
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.5,
    width: '100%',
    textAlign: 'left',
  },
  subWelcomeText: {
    fontFamily: Fonts.Inter?.regular || 'System',
    fontSize: 16,
    color: '#9B8B7E',
    letterSpacing: 0.5,
    width: '100%',
    textAlign: 'left',
  },
  formContainer: {
    flex: 1,

  },
  inputContainer: {
    marginBottom: 18,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingLeft: 48,
    paddingRight: 48,
    fontSize: 15,
    color: '#4A3F35',
    fontFamily: Fonts.Inter?.regular || 'System',
    borderWidth: 1,
    borderColor: '#E8C9B3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputFocused: {
    borderColor: '#C62829',
    borderWidth: 2,
    shadowColor: '#C62829',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#FFF8ED',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8C9B3',
  },
  checkboxChecked: {
    backgroundColor: '#C62829',
    borderColor: '#C62829',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#6B5F52',
    fontFamily: Fonts.Inter?.regular || 'System',
  },
  forgotPasswordText: {
    color: '#C62829',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Fonts.Inter?.medium || 'System',
  },
  termsTextContainer: {
    flexDirection: 'row',
  },
  termsLink: {
    color: '#C62829',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: Fonts.Inter?.medium || 'System',
  },
  loginButton: {
    backgroundColor: '#C62829',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#C62829',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#F5A5A5',
    shadowColor: '#F5A5A5',
    shadowOpacity: 0.2,
    elevation: 2,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.Inter?.boldHeading || 'System',
    letterSpacing: 1,
  },
  // Forgot Password Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  forgotPasswordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: Fonts.Inter?.boldHeading || 'System',
    fontSize: 22,
    color: '#4A3F35',
    fontWeight: 'bold',
  },
  modalDescription: {
    fontFamily: Fonts.Inter?.regular || 'System',
    fontSize: 14,
    color: '#9B8B7E',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalInputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalInputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  modalInput: {
    flex: 1,
    backgroundColor: '#FFF8ED',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingLeft: 48,
    fontSize: 15,
    color: '#4A3F35',
    fontFamily: Fonts.Inter?.regular || 'System',
    borderWidth: 1,
    borderColor: '#E8C9B3',
  },
  sendLinkButton: {
    backgroundColor: '#C62829',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#C62829',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  sendLinkButtonDisabled: {
    backgroundColor: '#F5A5A5',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  sendLinkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.Inter?.boldHeading || 'System',
    letterSpacing: 0.5,
  },
  // Toast Notification Styles
  toast: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Fonts.Inter?.medium || 'System',
    flex: 1,
  },
});

export default LoginScreen;
