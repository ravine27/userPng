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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../theme/colors';
import {Fonts} from '../theme/fonts';
import { useNavigation } from '@react-navigation/native';

const {height} = Dimensions.get('window');

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.brand.primary}
      />
      
      {/* Background Decor */}
      <View style={styles.headerBackground}>
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
            <View style={{height: 100}} />

            {/* Logo Placeholder */}
            <View style={styles.logoSpacer} />
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../assets/icons/logo.png')} 
                    style={styles.logoImage}
                />
            </View>
            {/* Form Card */}
            <View style={styles.formCard}>
              <Text style={styles.loginTitle}>Sign Up</Text>
              
              <View style={styles.plantPotDecoration}>
                 {/* Placeholder for the plant pot image */}
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

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={Colors.text.muted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('ProfileSetupScreen' as never)}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </TouchableOpacity>
             
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)}>
                  <Text style={styles.signupLink}>Login</Text>
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
    backgroundColor: Colors.splash.Lightred,
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
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
    top: -50,
    left: -50,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
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
    backgroundColor: Colors.ui.cardBackground,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 30,
    minHeight: height * 0.65,
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
      alignItems: 'center',
      marginBottom: 40,
  },
  logoSpacer: {
      height: 100,
  },
  logoImage: {
      width: 120,
      height: 60,
      resizeMode: 'contain',
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
  loginButton: {
    backgroundColor: Colors.splash.Lightred,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
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

export default SignUpScreen;
