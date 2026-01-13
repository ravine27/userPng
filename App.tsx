import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation';
import { ProfileProvider } from './src/context/ProfileContext';

function App() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <RootNavigator />
      </ProfileProvider>
    </SafeAreaProvider>
  );
}

export default App;
