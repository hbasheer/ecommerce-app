import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoading from '../screens/AuthLoadingScreen'

export default createAppContainer(createSwitchNavigator(
  {
	Main: MainTabNavigator,
	Auth: AuthNavigator,
	AuthLoading: AuthLoading,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));