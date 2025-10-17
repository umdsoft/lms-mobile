import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  return {
    ...reactNative,
    AppState: {
      addEventListener: jest.fn(() => ({
        remove: jest.fn()
      }))
    }
  };
});

import App from '../App';

jest.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({
    token: null,
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    isHydrated: false
  })
}));

jest.mock('expo-updates', () => ({
  checkForUpdateAsync: jest.fn(),
  fetchUpdateAsync: jest.fn(),
  reloadAsync: jest.fn()
}));

describe('App', () => {
  it('renders loading state while authentication store hydrates', async () => {
    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText('Loading...')).toBeTruthy();
    });
  });
});
