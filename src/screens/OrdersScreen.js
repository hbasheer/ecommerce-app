import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { Query } from "react-apollo";
import { OrdersQuery} from ".././Query";

export default class OrdersScrren extends Component {

  constructor(props) {
    super(props);
    this.state = {}
      
  }

  static navigationOptions = ({ navigation }) => ({
    title: "طلباتي",
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
  orderClickListener = (viewId) => {
    Alert.alert("alert", "order clicked");
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.container}>
        <Query query={OrdersQuery} >
          {({ loading, error, data }) => {
            if (loading) {
                return  <ActivityIndicator size="large" color="#0000ff" />
            }
            if (error) {
              return <Text>{error}</Text>;
            }
            return(
              <ListView enableEmptySections={true}
                style={styles.orderList}
                dataSource={ds.cloneWithRows(data.orders)}
                renderRow={(order) => {
                  return (
                    <TouchableOpacity onPress={() => this.orderClickListener("row")}>
                      <View style={styles.orderBox}>
                        <View style={styles.orderContent}>
                          <Text  style={styles.userName}>الزبون: {order.user.fullname}</Text>
                          <Text  style={styles.orderTime}>تاريخ الطلب: {order.createdAt}</Text>
                          <Text  style={styles.orderStatus}>حالة الطلب: {order.status}</Text>
                          <Text  style={styles.orderPrice}>الإجمالي: {order.price} IQD</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }}/>
            )

          }}

        </Query>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fff",
  },
  orderList:{
    marginTop:20,
  },
  orderBox: {
    padding:10,
    marginTop:5,
    marginBottom:5,
    flexDirection: 'row',
    
  },
  orderDate:{
    flexDirection: 'column',
  },
  orderId:{
    fontSize:18,
    color: "#0099FF",
    fontWeight: "600",
  },
  orderContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
    backgroundColor: "#DCDCDC",
    padding:10,
    borderRadius:10
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
  orderPrice:{
    fontSize:16,
    color:"#151515",
  },
  userName:{
    fontSize:16,
    color:"#151515",
  },
});
