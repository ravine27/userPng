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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../theme/colors';
import {Fonts} from '../theme/fonts';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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
            
            {/* Header Content */}
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>Hello!</Text>
              <Text style={styles.subWelcomeText}>Welcome to plantland</Text>
            </View>

            {/* Login Form Card */}
            <View style={styles.formCard}>
              <Text style={styles.loginTitle}>Login</Text>
              
              {/* Plant Pot Decoration (absolute positioned) */}
              <View style={styles.plantPotDecoration}>
                 {/* Placeholder for the plant pot image */}
                 <View style={styles.plantPotCircle} />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={Colors.text.muted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={Colors.text.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or login with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Buttons */}
              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialButton}>
                  {/* Icon placeholder */}
                  <Text style={styles.socialText}>f</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                   {/* Icon placeholder */}
                  <Text style={styles.socialText}>G</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                   {/* Icon placeholder */}
                  <Text style={styles.socialText}>🍎</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have account? </Text>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: Colors.brand.primary, // Using primary brand color as background
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
    backgroundColor: Colors.brand.primary,
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
  loginTitle: {
    fontFamily: Fonts.Inter?.boldHeading || 'System',
    fontSize: 32,
    color: Colors.brand.primary,
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: Colors.brand.primary,
    fontSize: 12,
    fontFamily: Fonts.Inter?.regular || 'System',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: Colors.brand.primary,
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
  },
  signupText: {
    color: Colors.text.secondary,
    fontSize: 14,
    fontFamily: Fonts.Inter?.regular || 'System',
  },
  signupLink: {
    color: Colors.brand.primary,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Fonts.Inter?.boldHeading || 'System',
  },
});

export default LoginScreen;
