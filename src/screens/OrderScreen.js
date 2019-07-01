import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { Container, Content, Text, Separator, View, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';

const OrderStatus = {
    "executing": ["قيد التنفيذ", "#0275d8"],
    "completed": ["تم التسليم", "#5cb85c"],
    "cancelled": ["ملغي", "#d9534f"]
  }
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

  renderItems(order) {
    let items = [];
    order.items.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={order.items.length === i+1}
        >
          <Thumbnail square style={styles.thumbnail} source={{ uri: item.product.imageUrl }} />
          <Body style={{paddingLeft: 10}}>
            <Text style={styles.quantity}>
              {item.quantity > 1 ? item.quantity+ "x " : null}
              {item.title}
            </Text>
            <Text style={styles.itemTitle}>{item.product.arName}</Text>
            <Text style={styles.itemPrice}>{item.product.price} IQD</Text>
          </Body>
        </ListItem>
      );
    });
    return items;
  }
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
              {this.renderItems(this.state.order)}

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
  thumbnail: {width: 110, height: 90},
  quantity: {fontSize: 18, textAlign: 'left'},
  itemTitle: {fontSize: 16, fontWeight: 'bold', textAlign: 'left'},
  itemPrice: {fontSize: 16, fontWeight: 'bold', marginBottom: 10 ,textAlign: 'left'},
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
