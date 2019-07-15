import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { Container, Content, Text, Separator, View, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import OrderStatus  from ".././constants/Helper";
import ProductsList from '.././components/ProductsList';

export default class OrderScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: props.navigation.state.params.order,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: "عرض الطلب #" + navigation.state.params.order.id,
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  render() {
    return (
      <Container style={styles.container}>            
        <Content style={styles.content}>
            <List>
              <ListItem noIndent bordered style={styles.metalist}>
                <Left>
                  <Text style={styles.orderMeta}>حالة الطلب:</Text>
                </Left>
                <Right>
                  <Text style={{fontSize:14, textAlign: 'center', color: OrderStatus[this.state.order.status][1]}}>{OrderStatus[this.state.order.status][0]}</Text>
                </Right>
              </ListItem>
              <ListItem noIndent bordered style={styles.metalist}>
                <Left>
                  <Text style={styles.orderMeta}>تاريخ الطلب:</Text>
                </Left>
                <Right>
                  <Text style={styles.orderdate}>{this.state.order.createdAt}</Text>
                </Right>
              </ListItem>
              <ListItem noIndent bordered style={styles.metalist}>
                <Left>
                  <Text style={styles.orderMeta}>المجموع:</Text>
                </Left>
                <Right>
                  <Text style={styles.orderPrice}>{this.state.order.price} IQD </Text>
                </Right>
              </ListItem>
              <ListItem noIndent bordered style={styles.metalist}>
               <Left>
                  <Text style={styles.orderMeta}>سعر التوصيل:</Text>
                </Left>
                <Right>
                  <Text style={styles.orderPrice}>{this.state.order.deliveryPrice} IQD</Text>
                </Right>
              </ListItem>
              <ListItem noIndent bordered style={styles.metalist}>
                <Left>
                  <Text style={styles.orderMeta}>المجموع الكلي:</Text>
                </Left>
                <Right>
                  <Text style={styles.orderPrice}>{this.state.order.totalPrice} IQD</Text>
                </Right>
              </ListItem>
              <ProductsList products={this.state.order.items} />

            </List>
        </Content>
      </Container>
    );
  }
}

const styles={
  title: {fontWeight: '100'},
  container: {backgroundColor: '#fdfdfd'},
  content: {paddingRight: 0},
  addButton: {marginLeft: -25},
  orderPrice: {fontSize: 14, fontWeight: 'bold'},
  orderMeta: {fontSize: 14, fontWeight: 'bold'},
  orderdate: {fontSize: 12, fontWeight: 'bold'},
  metalist: { backgroundColor: "#fff", borderBottom: "#eeeeee" },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14, 
    fontWeight: 'bold',
    paddingTop:50
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  }

};
