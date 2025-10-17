import React, { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Video } from 'expo-av';

export default function VideoPlayer({ source }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({ isLoaded: false, isPlaying: false });

  return (
    <View className="relative h-full w-full">
      <Video
        ref={videoRef}
        source={source}
        style={{ width: '100%', height: '100%' }}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={(nextStatus) => setStatus(nextStatus)}
      />
      {!status.isLoaded && (
        <View className="absolute inset-0 items-center justify-center bg-black/40">
          <ActivityIndicator color="#ffffff" />
        </View>
      )}
      <Pressable
        className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1"
        onPress={() => {
          if (!status.isLoaded) {
            return;
          }
          if (status.isPlaying) {
            videoRef.current?.pauseAsync();
          } else {
            videoRef.current?.playAsync();
          }
        }}
      >
        <Text className="text-xs font-semibold uppercase tracking-wide text-white">
          {status.isPlaying ? 'Pause' : 'Play'}
        </Text>
      </Pressable>
    </View>
  );
}
