import React from 'react';
import { View, Text } from 'react-native';

export default function CourseCard({ course }) {
  return (
    <View className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <Text className="text-lg font-semibold text-gray-900">{course.title}</Text>
      <Text className="mt-1 text-sm text-gray-500">Instructor: {course.instructor}</Text>
      <View className="mt-3 h-2 w-full rounded-full bg-gray-200">
        <View className="h-full rounded-full bg-primary" style={{ width: `${Math.round((course.progress ?? 0) * 100)}%` }} />
      </View>
      <Text className="mt-2 text-xs text-gray-500">Progress: {Math.round((course.progress ?? 0) * 100)}%</Text>
    </View>
  );
}
