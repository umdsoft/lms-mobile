import React, { useEffect } from 'react';
import { ActivityIndicator, AppState, View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { TailwindProvider } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';

import AppNavigator from './src/navigation/AppNavigator';
import { useAuth } from './src/hooks/useAuth';

const queryClient = new QueryClient();

function useAppUpdates() {
  useEffect(() => {
    if (__DEV__) {
      return;
    }

    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log('Failed to check for updates', error);
      }
    };

    checkForUpdates();
  }, []);
}

function useReactQueryAppState() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      focusManager.setFocused(status === 'active');
    });

    return () => {
      subscription.remove();
    };
  }, []);
}

function AppContent() {
  const { isHydrated } = useAuth();

  if (!isHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  return <AppNavigator />;
}

export default function App() {
  useAppUpdates();
  useReactQueryAppState();

  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={DefaultTheme}>
            <AppContent />
          </NavigationContainer>
        </SafeAreaProvider>
      </TailwindProvider>
    </QueryClientProvider>
  );
}
