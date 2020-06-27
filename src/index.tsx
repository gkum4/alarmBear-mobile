import React from 'react';
import { StatusBar, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { AlarmProvider } from './hooks/alarm';

import Routes from './routes';

import PushNotificationManager from './services/PushNotificationsManager';

import changeNavigationBarColor from 'react-native-navigation-bar-color';

const App: React.FC = () => {
  changeNavigationBarColor('#000000');
  if (Platform.OS === 'ios') {
    return (
      <AlarmProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#052C10" />
          <Routes />
        </NavigationContainer>
      </AlarmProvider>
    );
  } else {
    return (
      <PushNotificationManager>
        <AlarmProvider>
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#052C10" />
            <Routes />
          </NavigationContainer>
        </AlarmProvider>
      </PushNotificationManager>
    );
  }
};

export default App;
