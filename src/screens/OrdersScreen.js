import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  View
} from 'react-native';
import { Container, Header, Content, Grid, Row, Col, Text, Left, Body, Right, Button, Card, CardItem } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import { Query } from "react-apollo";
import { OrdersQuery} from ".././Query";
import OrderStatus from ".././constants/Helper";
 
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

  renderItems(orders) {
    let items = [];
    orders.map((order, i) => {
      items.push(
      <CardItem 
        bordered key={i} 
        button
        onPress={() => this.props.navigation.navigate('OrderDetail', {order})}
        >
        <Grid>
          <Row>
            <Col>
                <Text style={styles.Rtext}>رقم الطلب</Text>
                <Text style={styles.Rtext}>السعر الكلي:</Text>
                <Text style={styles.Rtext}>سعر التوصيل:</Text>
                <Text style={styles.Rtext}>حالة الطلب:</Text>
            </Col>
            <Col>
              <Text style={styles.text}>#{order.id}</Text>
              <Text style={styles.text}>{order.price} IQD</Text>
              <Text style={styles.text}>{order.deliveryPrice} IQD</Text>
              <Text style={{fontSize:16, textAlign: 'center', color: OrderStatus[order.status][1]}}>{OrderStatus[order.status][0]}</Text>
            </Col>
          </Row>
        </Grid>
       </CardItem>
      );
    });
    return items;
  }


  render() {
    return (
      <Container style={styles.container}>
        <Query query={OrdersQuery} >
          {({ loading, error, data }) => {
            if (loading) {
                return  <ActivityIndicator size="large" color="#0000ff" />
            }
            if (error) {
              return <Text>{error}</Text>;
            }
            return(
              <Content padder>
                <Card>
                  {this.renderItems(data.orders)}
                </Card>
              </Content>
            )

          }}

        </Query>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fff",
  },
  text:{
   fontSize:16,
   textAlign: 'center'
  },
  Rtext:{
   fontSize:16,
   textAlign: 'left'
  },
});