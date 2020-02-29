import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const USER = await AsyncStorage.getItem('TOKEN');
    this.props.navigation.navigate(USER ? 'Home' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" /> 
        <StatusBar barStyle="default" />
      </View>
    );
  }
}