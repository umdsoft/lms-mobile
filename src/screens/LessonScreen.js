import React, { useState } from 'react';
import { View, Text } from 'react-native';

import VideoPlayer from '../components/VideoPlayer';
import Button from '../components/Button';

export default function LessonScreen({ route }) {
  const { lesson, course } = route.params;
  const [completed, setCompleted] = useState(false);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-sm text-gray-500">{course?.title}</Text>
      <Text className="text-2xl font-semibold text-gray-900 mt-1">{lesson?.title}</Text>

      <View className="mt-4 aspect-video w-full overflow-hidden rounded-xl bg-black">
        <VideoPlayer
          source={{ uri: lesson?.videoUrl ?? 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        />
      </View>

      <Text className="mt-4 text-gray-600">
        {lesson?.description ??
          'Follow along with the video lesson. Once you complete the video, mark the lesson as completed to keep track of your progress.'}
      </Text>

      <Button
        label={completed ? 'Completed' : 'Mark as completed'}
        onPress={() => setCompleted(true)}
        disabled={completed}
        className="mt-6"
      />
    </View>
  );
}
