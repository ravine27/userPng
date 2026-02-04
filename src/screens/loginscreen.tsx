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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { useNavigation } from '@react-navigation/native';
// SVG transformer issues causing crash. Using PNG directly as the SVG was just a wrapper.
// import PNGLOGO from '../assets/icons/PNGLOGO.svg';

const {height} = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Validation State
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
      let hasError = false;

      if (!email.trim()) {
          setEmailError(true);
          hasError = true;
      }
      if (!password.trim()) {
          setPasswordError(true);
          hasError = true;
      }
      if (!termsAccepted) {
          setTermsError(true);
          hasError = true;
      }

      if (hasError) {
          // Clear errors after 2 seconds
          setTimeout(() => {
              setEmailError(false);
              setPasswordError(false);
              setTermsError(false);
          }, 2000);
          return;
      }
      
      // Proceed with login logic here (e.g., API call)
      Alert.alert('Success', 'Logged in successfully!');
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
            
            {/* Header Content Removed */}
            <View style={styles.logoSpacer} />

            {/* Login Form Card */}
            <View style={styles.formCard}>
   
              <Text style={styles.loginTitle}>Login</Text>
              
  
             

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, emailError ? styles.inputError : undefined]}
                  placeholder="Email"
                  placeholderTextColor={Colors.text.muted}
                  value={email}
                  onChangeText={(text) => {
                      setEmail(text);
                      if (emailError) setEmailError(false);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, passwordError ? styles.inputError : undefined]}
                  placeholder="Password"
                  placeholderTextColor={Colors.text.muted}
                  value={password}
                  onChangeText={(text) => {
                      setPassword(text);
                      if (passwordError) setPasswordError(false);
                  }}
                  secureTextEntry
                />
              </View>

               <View style={styles.optionsContainer}>
                   <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} activeOpacity={1} style={styles.rememberRow}>
                         <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                             {rememberMe && <Text style={styles.checkboxLabel}>✓</Text>}
                         </View>
                         <Text style={styles.optionText}>Remember me</Text>
                     </TouchableOpacity>

                  <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('ForgotPasswordScreen' as never)}>
                    <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.checkboxContainer}>
                  <TouchableOpacity 
                    style={{flexDirection: 'row', alignItems: 'center'}} 
                    activeOpacity={1}
                    onPress={() => {
                        setTermsAccepted(!termsAccepted);
                        if (termsError) setTermsError(false);
                    }}
                  >
                      <View style={[
                          styles.checkbox, 
                          termsAccepted ? styles.checkboxChecked : undefined,
                          termsError ? styles.checkboxError : undefined // Apply error style
                      ]}>
                          {termsAccepted ? <Text style={styles.checkboxLabel}>✓</Text> : null}
                      </View>
                      <Text style={[styles.optionText, termsError ? {color: Colors.splash.Lightred} : undefined]}>I agree to </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert('Terms & Conditions', 'Here are the terms...')}>
                      <Text style={styles.linkText}>Terms & Conditions</Text>
                  </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              
              {/* Social Buttons */}
             
              
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
    backgroundColor: Colors.splash.Lightred, // Using dominant color from logo
  },
  gradient: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: Colors.splash.Lightred,
  },
  leafDecoration: {
    // Styling to mimic the leaf shape if using pure CSS, or just a place for an image
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)', // Subtle overlay
    position: 'absolute',
    top: -50,
    left: -50,
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
    fontSize: 18,
    color: Colors.text.light,
    marginTop: 5,
    opacity: 0.9,
  },
  formCard: {
    backgroundColor: Colors.ui.cardBackground, // White/Card color
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 30,
    minHeight: height * 0.65,
    // Shadow for elevation
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  loginTitle: {
    fontFamily: Fonts.Inter?.boldHeading || 'System',
    fontSize: 32,
    color: '#000000',
    marginBottom: 30,
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
  inputError: {
      borderWidth: 1,
      borderColor: Colors.splash.Lightred,
  },
  optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
  },
  checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },
  checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: Colors.ui.borderLight || '#E0E0E0',
      borderRadius: 5,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  checkboxChecked: {
      backgroundColor: Colors.splash.Lightred,
      borderColor: Colors.splash.Lightred,
  },
  checkboxError: {
      borderWidth: 1,
      borderColor: Colors.splash.Lightred,
      backgroundColor: '#FFEBEE', // Light red background
  },
  checkboxLabel: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
  },
  optionText: {
      color: Colors.text.secondary,
      fontSize: 14,
      fontFamily: Fonts.Inter?.regular || 'System',
  },
  logoSpacer: {
    height: 100,
  },
  logoImage: {
    width: 120, 
    height: 60, 
    resizeMode: 'contain',
  },
  rememberRow: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  linkText: {
      color: Colors.splash.Lightred,
      fontSize: 14,
      fontFamily: Fonts.Inter?.boldHeading || 'System',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
  },
  forgotPasswordContainer: {
    // Moved styles to be inline with options or adjust here
  },
  forgotPasswordText: {
    color: Colors.splash.Lightred,
    fontSize: 12,
    fontFamily: Fonts.Inter?.regular || 'System',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: Colors.splash.Lightred,
    borderRadius: 25,
    paddingVertical: 16,
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
  socialText: {
      fontSize: 20,
      fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: Colors.text.secondary,
    fontSize: 14,
    fontFamily: Fonts.Inter?.regular || 'System',
  },
  signupLink: {
    color: Colors.splash.Lightred,
    fontSize: 14,
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
