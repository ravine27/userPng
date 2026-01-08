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

const {} = Dimensions.get('window');

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

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
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.description}>
                It is a long established fact that a reader will be distracted by the readable content.
              </Text>

              <View style={styles.inputContainer}>
                {/* Icon placeholder could go here */}
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email or Phone"
                  placeholderTextColor={Colors.text.muted}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('VerificationScreen' as never)}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.borderLight || '#E0E0E0',
    marginBottom: 30,
    paddingBottom: 5,
  },
  inputIcon: {
      fontSize: 18,
      marginRight: 10,
      color: Colors.splash.Lightred,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    fontFamily: Fonts.Inter?.regular || 'System',
    paddingVertical: 10,
  },
  sendButton: {
    backgroundColor: Colors.splash.Lightred,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.brand.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sendButtonText: {
    color: Colors.text.light,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.Inter?.boldHeading || 'System',
  },
});

export default ForgotPasswordScreen;
