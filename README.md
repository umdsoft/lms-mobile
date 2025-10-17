# LMS Mobile

A modern Expo-managed LMS mobile application skeleton built with React Native and JavaScript.

## Getting started

```bash
npm install
npx expo start
```

The project ships with navigation, authentication state management, React Query caching, secure token storage, OTA updates, and a basic UI toolkit powered by NativeWind.

### Styling with NativeWind

Tailwind CSS is configured with the `nativewind` preset. If you see an error such as `Tailwind CSS has not been configured with the NativeWind preset`, ensure the preset is present inside `tailwind.config.js`:

```js
presets: [require('nativewind/preset')]
```

### Running tests

This project uses Jest together with Testing Library for unit tests:

```bash
npm test
```

The default test suite validates that the application renders the loading state while the authentication store hydrates.
