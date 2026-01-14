import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    StatusBar,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { useProfile } from '../../context/ProfileContext';
import { useNavigation } from '@react-navigation/native';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import CustomToast from '../../components/common/CustomToast';

const { width } = Dimensions.get('window');

interface ProfileScreenProps {
    onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
    const navigation = useNavigation<any>();
    const { profile, updateProfile, logout } = useProfile();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('Male');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [language, setLanguage] = useState('English');
    const [profileImage, setProfileImage] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    // Load existing profile on mount
    useEffect(() => {
        if (profile) {
            setFirstName(profile.firstName || '');
            setLastName(profile.lastName || '');
            setUsername(profile.username || '');
            setEmail(profile.email || '');
            setPhone(profile.phone || '');
            setDob(profile.dob || '');
            setGender(profile.gender || 'Male');
            setAddress1(profile.address1 || '');
            setAddress2(profile.address2 || '');
            setCity(profile.city || '');
            setState(profile.state || '');
            setCountry(profile.country || '');
            setPincode(profile.pincode || '');
            setLanguage(profile.language || 'English');
            setProfileImage(profile.profileImage || '');
        }
    }, [profile]);

    const handleImagePick = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                maxWidth: 500,
                maxHeight: 500,
                quality: 0.8,
            });

            if (result.assets && result.assets[0]?.uri) {
                setProfileImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    const handleSaveProfile = async () => {
        try {
            await updateProfile({
                firstName,
                lastName,
                username,
                email,
                phone,
                dob,
                gender,
                address1,
                address2,
                city,
                state,
                country,
                pincode,
                language,
                profileImage,
            });
            setToastMessage('Profile saved successfully!');
            setToastType('success');
            setShowToast(true);
            setTimeout(() => {
                onBack();
            }, 1500);
        } catch (error) {
            setToastMessage('Failed to save profile');
            setToastType('error');
            setShowToast(true);
        }
    };

    const handleDateSelect = (date: Date) => {
        const formatted = date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
        setDob(formatted);
        setShowDatePicker(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62829" />

            {/* Aesthetic Warm Ambient Background Circles */}
            <View style={styles.ambientCircleTop} />
            <View style={styles.ambientCircleBottom} />
            <View style={styles.ambientCircleMiddle} />

            {/* Red Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Profile Picture Section - Redesigned as Card */}
                <View style={styles.profileCard}>
                    {/* Decorative Glare/Glow Effects */}
                    <View style={styles.glowEffect1} />
                    <View style={styles.glowEffect2} />
                    <View style={styles.patternOverlay} />

                    <View style={styles.profileImageContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImagePic} />
                        ) : (
                            <View style={styles.profileImage}>
                                <Icon name="person" size={50} color="#FFFFFF" />
                            </View>
                        )}
                        <TouchableOpacity style={styles.cameraButton} onPress={handleImagePick}>
                            <Icon name="camera" size={20} color="#C62829" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.uploadText}>Upload Profile Picture</Text>
                </View>

                {/* Personal Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="John"
                                placeholderTextColor="#9B8B7E"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Doe"
                                placeholderTextColor="#9B8B7E"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                    </View>

                    {/* <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="@johndoe"
                        placeholderTextColor="#9B8B7E"
                        value={username}
                        onChangeText={setUsername}
                    /> */}

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="john@example.com"
                        placeholderTextColor="#9B8B7E"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <View style={styles.row}>
                        <View style={[styles.halfInput, { flex: 0.3 }]}>
                            <Text style={styles.label}>Code</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="+91"
                                placeholderTextColor="#9B8B7E"
                                keyboardType="phone-pad"
                            />
                        </View>
                        <View style={[styles.halfInput, { flex: 0.7 }]}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="9876543210"
                                placeholderTextColor="#9B8B7E"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
                        <Text style={[styles.dateText, !dob && { color: '#9B8B7E' }]}>
                            {dob || 'DD / MM / YYYY'}
                        </Text>
                        <Icon name="calendar-outline" size={20} color="#C62829" />
                    </TouchableOpacity>

                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'Male' && styles.genderButtonActive]}
                            onPress={() => setGender('Male')}
                        >
                            <View style={[styles.radio, gender === 'Male' && styles.radioActive]}>
                                {gender === 'Male' && <View style={styles.radioDot} />}
                            </View>
                            <Text style={[styles.genderText, gender === 'Male' && styles.genderTextActive]}>
                                Male
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'Female' && styles.genderButtonActive]}
                            onPress={() => setGender('Female')}
                        >
                            <View style={[styles.radio, gender === 'Female' && styles.radioActive]}>
                                {gender === 'Female' && <View style={styles.radioDot} />}
                            </View>
                            <Text style={[styles.genderText, gender === 'Female' && styles.genderTextActive]}>
                                Female
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'Other' && styles.genderButtonActive]}
                            onPress={() => setGender('Other')}
                        >
                            <View style={[styles.radio, gender === 'Other' && styles.radioActive]}>
                                {gender === 'Other' && <View style={styles.radioDot} />}
                            </View>
                            <Text style={[styles.genderText, gender === 'Other' && styles.genderTextActive]}>
                                Other
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Address Section
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Address</Text>

                    <Text style={styles.label}>Address Line 1</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="House No., Street Name"
                        placeholderTextColor="#9B8B7E"
                        value={address1}
                        onChangeText={setAddress1}
                    />

                    <Text style={styles.label}>Address Line 2</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Apartment, Suite, Unit, etc. (optional)"
                        placeholderTextColor="#9B8B7E"
                        value={address2}
                        onChangeText={setAddress2}
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>City</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="City"
                                placeholderTextColor="#9B8B7E"
                                value={city}
                                onChangeText={setCity}
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>State</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="State"
                                placeholderTextColor="#9B8B7E"
                                value={state}
                                onChangeText={setState}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Country</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Country"
                                placeholderTextColor="#9B8B7E"
                                value={country}
                                onChangeText={setCountry}
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Pincode</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Pincode"
                                placeholderTextColor="#9B8B7E"
                                keyboardType="number-pad"
                                value={pincode}
                                onChangeText={setPincode}
                            />
                        </View>
                    </View>
                </View> */}

                {/* Preferences Section
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <Text style={styles.label}>Language</Text>
                    <View style={styles.dropdownInput}>
                        <Text style={styles.dropdownText}>{language}</Text>
                        <Icon name="chevron-down" size={20} color="#9B8B7E" />
                    </View>
                </View> */}

                {/* Save Profile Button */}
                <TouchableOpacity style={styles.completeButton} onPress={handleSaveProfile}>
                    <Text style={styles.completeButtonText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={() => {
                    logout();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    });
                }}>
                    <Icon name="log-out-outline" size={20} color="#E53935" />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Date Picker Modal */}
            <CustomDatePicker
                visible={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onDateSelect={(dateStr) => {
                    setDob(dateStr);
                    setShowDatePicker(false);
                }}
            />

            {/* Custom Toast Notification */}
            <CustomToast
                visible={showToast}
                message={toastMessage}
                type={toastType}
                onHide={() => setShowToast(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f4ea',
    },
    // Aesthetic Warm Ambient Circles
    ambientCircleTop: {
        position: 'absolute',
        top: -120,
        right: -100,
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: 'rgba(219, 201, 166, 0.3)',
        transform: [{ scale: 1.5 }],
    },
    ambientCircleBottom: {
        position: 'absolute',
        bottom: -80,
        left: -60,
        width: 380,
        height: 380,
        borderRadius: 190,
        backgroundColor: 'rgba(232, 201, 179, 0.35)',
    },
    ambientCircleMiddle: {
        position: 'absolute',
        top: '40%',
        left: -100,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(198, 40, 41, 0.08)',
    },
    header: {
        backgroundColor: '#C62829',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 20,
        color: '#FFFFFF',
    },
    placeholder: {
        width: 40,
    },
    scrollContainer: {
        flex: 1,
    },
    profileCard: {
        backgroundColor: '#C62829',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginBottom: 24,
        alignItems: 'center',
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.35,
        shadowRadius: 24,
        elevation: 15,
        position: 'relative',
        overflow: 'hidden',
    },
    glowEffect1: {
        position: 'absolute',
        top: -60,
        right: -60,
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    glowEffect2: {
        position: 'absolute',
        bottom: -40,
        left: -40,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    patternOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.05,
        backgroundColor: 'transparent',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 12,
        zIndex: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.4)',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
    },
    profileImagePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 10,
        zIndex: 10,
    },
    uploadText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 14,
        color: '#FFFFFF',
        zIndex: 1,
        letterSpacing: 0.5,
    },
    section: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 18,
        color: '#C62829',
        marginBottom: 16,
    },
    label: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 12,
        color: '#6B5F52',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#FFF8ED',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontFamily: Fonts.Inter.medium,
        fontSize: 14,
        color: '#4A3F35',
        borderWidth: 1,
        borderColor: '#E8C9B3',
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    halfInput: {
        flex: 1,
    },
    dateInput: {
        backgroundColor: '#FFF8ED',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#E8C9B3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 14,
        color: '#4A3F35',
        flex: 1,
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    genderButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF8ED',
        paddingVertical: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E8C9B3',
        gap: 8,
    },
    genderButtonActive: {
        borderColor: '#C62829',
        borderWidth: 2,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#9B8B7E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioActive: {
        borderColor: '#C62829',
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#C62829',
    },
    genderText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 14,
        color: '#6B5F52',
    },
    genderTextActive: {
        color: '#C62829',
    },
    dropdownInput: {
        backgroundColor: '#FFF8ED',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#E8C9B3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    dropdownText: {
        fontFamily: Fonts.Inter.medium,
        fontSize: 14,
        color: '#4A3F35',
    },
    completeButton: {
        backgroundColor: '#C62829',
        marginHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: 'center',
        shadowColor: '#C62829',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    completeButtonText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 16,
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#E53935',
        marginHorizontal: 20,
        borderRadius: 18,
        backgroundColor: '#FFF0F0',
        gap: 8,
    },
    logoutButtonText: {
        fontFamily: Fonts.Inter.boldHeading,
        fontSize: 16,
        color: '#E53935',
    },
});

export default ProfileScreen;
