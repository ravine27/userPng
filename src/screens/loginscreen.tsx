import React, {useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../theme/colors';
import {Fonts} from '../theme/fonts';
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
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.brand.primary}
      />
      
      {/* Background Decor */}
      <View style={styles.headerBackground}>
        {/* You could add the plant leaf image here if available, or just use the color/shape */}
        <View style={styles.leafDecoration} />
      </View>

      <SafeAreaView style={styles.safeArea}>
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
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.splash.Lightred, // Using dominant color from logo
  },
  safeArea: {
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
    justifyContent: 'flex-end', // Push content to bottom
  },
  headerContent: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontFamily: Fonts.playfair?.heading || 'System',
    fontSize: 48,
    color: Colors.text.light,
    fontWeight: 'bold',
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
    fontWeight: '700',
  },
  plantPotDecoration: {
    position: 'absolute',
    right: 30,
    top: -40,
    width: 80,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantPotCircle: {
     width: 80,
     height: 80,
     borderRadius: 40,
     backgroundColor: Colors.ui.card,
     elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.backgrounds.soft || '#f0f0f0',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 14,
    color: Colors.text.primary,
    fontFamily: Fonts.Inter?.regular || 'System',
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.ui.borderLight || '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: Colors.text.secondary,
    fontSize: 12,
    fontFamily: Fonts.Inter?.regular || 'System',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.ui.borderLight || '#eee',
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
  },
});

export default LoginScreen;
