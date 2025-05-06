import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppNavigator from './src/routers/AppNavigator';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';

const AppContent = () => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <AppNavigator />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
