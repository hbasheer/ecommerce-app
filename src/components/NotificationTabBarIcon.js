import React from "react";
import { Text, AsyncStorage, StyleSheet } from 'react-native';

export default class NotiTabBarIcon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
    }
  }

  componentDidMount(){
    setInterval(
      () => this.getCartItem(),
      1000
    );
  }

  async getCartItem(){
    await AsyncStorage.getItem("CART_ITEMS", (err, res) => {
      if (res)this.setState({count: JSON.parse(res)});
    });
  }

  render() {

    return (
      <Text 
        style={this.state.count > 0 ? styles.badge : styles.hidden }>{this.state.count}</Text>
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