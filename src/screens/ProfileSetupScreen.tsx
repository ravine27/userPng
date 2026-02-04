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
import {launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../theme/colors';
import {Fonts} from '../theme/fonts';
import { useNavigation } from '@react-navigation/native';

const {height} = Dimensions.get('window');

const ProfileSetupScreen = () => {
  const navigation = useNavigation();
  
  // State for all fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const [dob, setDob] = useState('');
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [gender, setGender] = useState('Male');
  
  // Address
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  
  // Preferences
  const [language, setLanguage] = useState('English');

  const handleImageSelection = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.splash.Lightred}
      />
      
      {/* Dynamic Header Background */}
      <View style={styles.headerBackground}>
          <View style={styles.headerDecoration} />
      </View>

      <SafeAreaView style={styles.safeArea}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                 <Image 
                    source={require('../assets/images/back_arrow.png')} 
                    style={[styles.backArrowImage, {tintColor: '#fff'}]} 
                />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile Setup</Text>
            <View style={{width: 40}} /> 
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            
            {/* Avatar Placeholder */}
            <TouchableOpacity style={styles.avatarContainer} onPress={handleImageSelection}>
                <View style={styles.avatarCircle}>
                    {profileImage ? (
                      <Image source={{uri: profileImage}} style={styles.avatarImage} />
                    ) : (
                      <Icon name="camera-alt" size={40} color={Colors.splash.Lightred} />
                    )}
                </View>
                <Text style={styles.avatarLabel}>{profileImage ? 'Change Profile Picture' : 'Upload Profile Picture'}</Text>
            </TouchableOpacity>

            {/* Form Section */}
            <View style={styles.formContainer}>
                
                <Text style={styles.sectionTitle}>Personal Details</Text>
                <View style={styles.row}>
                    <View style={[styles.inputWrapper, {flex: 1, marginRight: 10}]}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="John"
                            placeholderTextColor={Colors.text.muted}
                        />
                    </View>
                    <View style={[styles.inputWrapper, {flex: 1}]}>
                         <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Doe"
                             placeholderTextColor={Colors.text.muted}
                        />
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                     <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="@johndoe"
                        placeholderTextColor={Colors.text.muted}
                        autoCapitalize="none"
                    />
                </View>

                 <View style={styles.inputWrapper}>
                     <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="john@example.com"
                        placeholderTextColor={Colors.text.muted}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                 <View style={styles.row}>
                    <View style={[styles.inputWrapper, {width: 80, marginRight: 10}]}>
                         <Text style={styles.label}>Code</Text>
                        <TextInput
                            style={styles.input}
                            value={countryCode}
                            onChangeText={setCountryCode}
                            placeholder="+91"
                             placeholderTextColor={Colors.text.muted}
                             keyboardType="phone-pad"
                        />
                    </View>
                    <View style={[styles.inputWrapper, {flex: 1}]}>
                         <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="9876543210"
                             placeholderTextColor={Colors.text.muted}
                             keyboardType="phone-pad"
                        />
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                     <Text style={styles.label}>Date of Birth</Text>
                     <TouchableOpacity style={styles.datePickerButton} onPress={() => setOpenDatePicker(true)}>
                        <Text style={dob ? styles.dateText : styles.placeholderText}>
                            {dob || 'DD / MM / YYYY'}
                        </Text>
                        <Icon name="calendar-today" size={20} color={Colors.text.muted} />
                     </TouchableOpacity>
                     
                     <DatePicker
                        modal
                        open={openDatePicker}
                        date={date}
                        mode="date"
                        onConfirm={(selectedDate) => {
                          setOpenDatePicker(false);
                          setDate(selectedDate);
                          setDob(selectedDate.toLocaleDateString('en-GB')); // DD/MM/YYYY format
                        }}
                        onCancel={() => {
                          setOpenDatePicker(false);
                        }}
                      />
                </View>

                <View style={styles.inputWrapper}>
                     <Text style={styles.label}>Gender</Text>
                     <View style={styles.radioContainer}>
                        {['Male', 'Female', 'Other'].map((option) => (
                            <TouchableOpacity 
                                key={option} 
                                style={[styles.radioButton, gender === option && styles.radioButtonSelected]}
                                onPress={() => setGender(option)}
                            >
                                <View style={[styles.radioCircle, gender === option && styles.radioCircleSelected]}>
                                    {gender === option && <View style={styles.radioInnerCircle} />}
                                </View>
                                <Text style={[styles.radioText, gender === option && styles.radioTextSelected]}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                     </View>
                </View>

                <Text style={styles.sectionTitle}>Address</Text>
                <View style={styles.inputWrapper}>
                     <Text style={styles.label}>Address Line 1</Text>
                    <TextInput
                        style={styles.input}
                        value={addressLine1}
                        onChangeText={setAddressLine1}
                        placeholder="House No., Street Name"
                         placeholderTextColor={Colors.text.muted}
                    />
                </View>
                <View style={styles.inputWrapper}>
                     <Text style={styles.label}>Address Line 2</Text>
                    <TextInput
                        style={styles.input}
                        value={addressLine2}
                        onChangeText={setAddressLine2}
                        placeholder="Apartment, Suite, Unit, etc. (optional)"
                         placeholderTextColor={Colors.text.muted}
                    />
                </View>

                 <View style={styles.row}>
                    <View style={[styles.inputWrapper, {flex: 1, marginRight: 10}]}>
                         <Text style={styles.label}>City</Text>
                        <TextInput
                            style={styles.input}
                            value={city}
                            onChangeText={setCity}
                            placeholder="City"
                             placeholderTextColor={Colors.text.muted}
                        />
                    </View>
                    <View style={[styles.inputWrapper, {flex: 1}]}>
                         <Text style={styles.label}>State</Text>
                        <TextInput
                            style={styles.input}
                            value={state}
                            onChangeText={setState}
                            placeholder="State"
                             placeholderTextColor={Colors.text.muted}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputWrapper, {flex: 1, marginRight: 10}]}>
                         <Text style={styles.label}>Country</Text>
                        <TextInput
                            style={styles.input}
                            value={country}
                            onChangeText={setCountry}
                            placeholder="Country"
                             placeholderTextColor={Colors.text.muted}
                        />
                    </View>
                    <View style={[styles.inputWrapper, {flex: 1}]}>
                         <Text style={styles.label}>Pincode</Text>
                        <TextInput
                            style={styles.input}
                            value={pincode}
                            onChangeText={setPincode}
                            placeholder="Pincode"
                             placeholderTextColor={Colors.text.muted}
                             keyboardType="number-pad"
                        />
                    </View>
                </View>

                 <Text style={styles.sectionTitle}>Preferences</Text>
                 <View style={styles.inputWrapper}>
                     <Text style={styles.label}>Language</Text>
                    <TextInput
                        style={styles.input}
                        value={language}
                        onChangeText={setLanguage}
                        placeholder="English"
                         placeholderTextColor={Colors.text.muted}
                    />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
                    <Text style={styles.saveButtonText}>Complete Setup</Text>
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
    height: 200,
    backgroundColor: Colors.splash.Lightred,
  },
  headerDecoration: {
      position: 'absolute',
      top: -50,
      right: -50,
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: 'rgba(255,255,255,0.1)',
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 20,
  },
  backButton: {
      padding: 10,
  },
  backArrowImage: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
  },
  headerTitle: {
      fontSize: 20,
      color: '#fff',
      fontFamily: Fonts.Inter?.boldHeading || 'System',
      fontWeight: 'bold',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  avatarContainer: {
      alignItems: 'center',
      marginBottom: 30,
  },
  avatarCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      // Shadow
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 8,
      overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarText: {
      fontSize: 40,
      color: Colors.splash.Lightred,
      fontWeight: '300',
  },
  avatarIcon: {
      fontSize: 32,
      color: Colors.splash.Lightred,
  },
  avatarLabel: {
      color: '#fff',
      fontSize: 14,
      fontFamily: Fonts.Inter?.regular || 'System',
      opacity: 0.9,
  },
  formContainer: {
      backgroundColor: Colors.backgrounds.light, // White card
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 25,
      paddingTop: 30,
      paddingBottom: 40,
      minHeight: height * 0.6,
  },
  sectionTitle: {
      fontSize: 18,
      color: Colors.splash.Lightred,
      fontFamily: Fonts.Inter?.boldHeading || 'System',
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 10,
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  inputWrapper: {
      marginBottom: 15,
  },
  label: {
      fontSize: 12,
      color: Colors.text.secondary,
      marginBottom: 8,
      fontFamily: Fonts.Inter?.regular || 'System',
      marginLeft: 5,
  },
  input: {
      backgroundColor: Colors.backgrounds.soft || '#f5f5f5',
      borderRadius: 15,
      paddingVertical: 12,
      paddingHorizontal: 15,
      fontSize: 14,
      color: Colors.text.primary,
      fontFamily: Fonts.Inter?.regular || 'System',
      borderWidth: 1,
      borderColor: Colors.ui.borderLight || '#eee',
  },
  datePickerButton: {
      backgroundColor: Colors.backgrounds.soft || '#f5f5f5',
      borderRadius: 15,
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: Colors.ui.borderLight || '#eee',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  dateText: {
      color: Colors.text.primary,
      fontFamily: Fonts.Inter?.regular || 'System',
      fontSize: 14,
  },
  placeholderText: {
      color: Colors.text.muted,
      fontSize: 14,
  },
  calendarIcon: {
      fontSize: 16,
  },
  radioContainer: {
      flexDirection: 'row',
      gap: 15,
  },
  radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.ui.borderLight || '#eee',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
  },
  radioButtonSelected: {
      borderColor: Colors.splash.Lightred,
      backgroundColor: '#FFF0F0', // Light red tint
  },
  radioCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: Colors.text.muted,
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  radioCircleSelected: {
      borderColor: Colors.splash.Lightred,
  },
  radioInnerCircle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: Colors.splash.Lightred,
  },
  radioText: {
      fontSize: 13,
      color: Colors.text.secondary,
      fontFamily: Fonts.Inter?.regular || 'System',
  },
  radioTextSelected: {
      color: Colors.splash.Lightred,
      fontWeight: 'bold',
  },
  saveButton: {
      backgroundColor: Colors.splash.Lightred,
      borderRadius: 25,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 30,
      shadowColor: Colors.brand.primary,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
  },
  saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: Fonts.Inter?.boldHeading || 'System',
  },
});

export default ProfileSetupScreen;
