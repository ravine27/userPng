import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ProfileData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    language: string;
    profileImage: string;
}

interface ProfileContextType {
    profile: ProfileData | null;
    updateProfile: (data: ProfileData) => Promise<void>;
    loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const PROFILE_STORAGE_KEY = '@user_profile';

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const stored = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
            if (stored) {
                setProfile(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data: ProfileData) => {
        try {
            await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
            setProfile(data);
        } catch (error) {
            console.error('Error saving profile:', error);
            throw error;
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, loading }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within ProfileProvider');
    }
    return context;
};
