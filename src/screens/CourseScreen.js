import React from 'react';
import { FlatList, View, Text, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import api from '../services/api';

const fetchLessons = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}/lessons`);
    return response.data;
  } catch (error) {
    return [
      { id: 'l1', title: 'Introduction', duration: '5:32' },
      { id: 'l2', title: 'Setting up the environment', duration: '8:45' },
      { id: 'l3', title: 'Building the first screen', duration: '12:10' }
    ];
  }
};

export default function CourseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseId, course } = route.params;

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['lessons', courseId],
    queryFn: () => fetchLessons(courseId)
  });

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-3xl font-semibold text-gray-900">{course?.title ?? 'Course'}</Text>
      <Text className="text-gray-500 mt-1">Instructor: {course?.instructor ?? 'Unknown'}</Text>

      <Text className="mt-6 text-lg font-semibold text-gray-900">Lessons</Text>

      {isLoading ? (
        <Text className="text-gray-500 mt-4">Loading...</Text>
      ) : (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              className="mt-3 rounded-lg border border-gray-200 bg-white p-4"
              onPress={() =>
                navigation.navigate('Lesson', {
                  lessonId: item.id,
                  lesson: item,
                  course
                })
              }
            >
              <Text className="text-base font-semibold text-gray-900">{item.title}</Text>
              <Text className="text-sm text-gray-500">Duration: {item.duration}</Text>
            </Pressable>
          )}
          ListEmptyComponent={<Text className="text-gray-500 mt-4">Lessons coming soon.</Text>}
        />
      )}
    </View>
  );
}
