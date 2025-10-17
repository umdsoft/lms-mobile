import React from 'react';
import { View, Text } from 'react-native';

import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-3xl font-semibold text-gray-900">Profile</Text>

      <View className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900">{user?.name ?? 'Guest User'}</Text>
        <Text className="text-sm text-gray-500">{user?.email ?? 'guest@example.com'}</Text>
      </View>

      <Text className="mt-6 text-gray-600">
        Manage your learning experience, track course progress, and update personal information from this screen.
      </Text>

      <Button label="Log out" onPress={logout} className="mt-8" />
    </View>
  );
}
