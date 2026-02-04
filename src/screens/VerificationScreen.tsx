import React, {useState, useRef, useEffect} from 'react';
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
  Alert,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../theme/colors';
import {Fonts} from '../theme/fonts';
import { useNavigation } from '@react-navigation/native';

const {} = Dimensions.get('window');

const VerificationScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  // Handle auto-navigation when OTP is full
  useEffect(() => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 4) {
       // Using a small timeout to allow the user to see the last digit entered
       const timeout = setTimeout(() => {
           navigation.navigate('PasswordResetSuccessScreen' as never);
       }, 500);
       return () => clearTimeout(timeout);
    }
  }, [otp, navigation]);

  const handleResend = () => {
      Alert.alert('Code Resent', 'The verification code has been resent to your email/phone.');
      setIsResendDisabled(true);
      setTimer(60);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key: string, index: number) => {
      if (key === 'Backspace' && !otp[index] && index > 0) {
          inputs.current[index - 1]?.focus();
      }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.backgrounds.light}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                 <Image 
                    source={require('../assets/images/back_arrow.png')} 
                    style={styles.backArrowImage} 
                />
            </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Verification</Text>
              <Text style={styles.description}>
                It is a long established fact that a reader will be distracted by the readable content.
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => { inputs.current[index] = ref; }}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
                  />
                ))}
              </View>

              <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>Didn't receive code? </Text>
                  <TouchableOpacity onPress={handleResend} disabled={isResendDisabled}>
                      <Text style={[styles.resendLink, isResendDisabled && styles.disabledLink]}>
                          {isResendDisabled ? `Resend in ${timer}s` : 'Resend Now'}
                      </Text>
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
    backgroundColor: Colors.backgrounds.light,
  },
  safeArea: {
    flex: 1,
  },
  header: {
      paddingHorizontal: 20,
      paddingTop: 10,
  },
  backButton: {
      padding: 10,
  },
  backArrowImage: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontFamily: Fonts.Inter?.boldHeading || 'System',
    fontSize: 28,
    color: Colors.splash.Lightred,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
      fontFamily: Fonts.Inter?.regular || 'System',
      fontSize: 14,
      color: Colors.text.secondary,
      lineHeight: 20,
      marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.backgrounds.soft || '#f0f0f0',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  resendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
  },
  resendText: {
      color: Colors.text.secondary,
      fontFamily: Fonts.Inter?.regular || 'System',
      fontSize: 14,
  },
  resendLink: {
      color: Colors.splash.Lightred,
      fontFamily: Fonts.Inter?.boldHeading || 'System',
      fontSize: 14,
      fontWeight: 'bold',
  },
  disabledLink: {
      color: Colors.text.muted,
  },
});

export default VerificationScreen;
