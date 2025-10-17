import React from 'react';
import { FlatList, Pressable, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import CourseCard from '../components/CourseCard';
import Button from '../components/Button';
import api from '../services/api';

const fetchCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    return [
      {
        id: '1',
        title: 'React Native Basics',
        instructor: 'Jane Doe',
        progress: 0.3
      },
      {
        id: '2',
        title: 'Advanced JavaScript',
        instructor: 'John Smith',
        progress: 0.75
      }
    ];
  }
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const { data: courses = [], isLoading } = useQuery({ queryKey: ['courses'], queryFn: fetchCourses });

  return (
    <View className="flex-1 bg-white p-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-semibold text-gray-900">Welcome back!</Text>
        <Button label="Profile" onPress={() => navigation.navigate('Profile')} size="sm" />
      </View>

      {isLoading ? (
        <Text className="text-gray-500">Loading...</Text>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('Course', { courseId: item.id, course: item })}>
              <CourseCard course={item} />
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
