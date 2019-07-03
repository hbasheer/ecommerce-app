import React from "react";
import { Text, AsyncStorage, StyleSheet } from 'react-native';
import { Query } from "react-apollo";
import { getCartCountLocal } from ".././Query"

export default class NotiTabBarIcon extends React.Component {
  render() {
    return (
      <Query query={getCartCountLocal}>
        {({data}) => (
          data.cartCount ? <Text style={data.cartCount > 0 ? styles.badge : styles.hidden }>{data.cartCount}</Text> : null
        )}
      </Query>
    );
  }
}



const styles = StyleSheet.create({
  badge: {
    color: '#FFF',
    position:'absolute',
    top:1,
    right: -5,
    margin: 1,
    minWidth:15,
    height:15,
    borderRadius:7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3AB54A', 
    textAlign: "center",  
    fontSize: 9 
  },
  hidden: {
    display: "none",
  }
});