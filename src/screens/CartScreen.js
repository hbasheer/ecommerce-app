import React from 'react';
import { Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Content, Separator, View, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import { Query } from "react-apollo";
import { getCartLocal } from ".././Query"
import CartProducts from "../components/CartProducts"

export default class CartScreen extends React.Component {
  static navigationOptions = {
    title: 'سلة المشتريات',
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  
  render() {
    return (
      <Container style={styles.container}>
        <Query query={getCartLocal} >
          {({ data }) => {
            return (            
              <Content style={styles.content}>
                {data.cart.items.length > 0  ? 
                  <List>
                    <ListItem noIndent bordered style={styles.metalist}>
                      <Left>
                        <Text style={styles.cartMeta}>المجموع:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.cartPrice}>{data.cart.price} IQD </Text>
                      </Right>
                    </ListItem>
                    <ListItem noIndent bordered style={styles.metalist}>
                     <Left>
                        <Text style={styles.cartMeta}>سعر التوصيل:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.cartPrice}>{data.cart.deliveryPrice} IQD</Text>
                      </Right>
                    </ListItem>
                    <ListItem noIndent bordered style={styles.metalist}>
                      <Left>
                        <Text style={styles.cartMeta}>المجموع الكلي:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.cartPrice}>{data.cart.totalPrice} IQD</Text>
                      </Right>
                    </ListItem>
                    <Separator >
                      <Text></Text>
                    </Separator>
                    <CartProducts products={data.cart.items} />
                    <Separator bordered>
                      <Text></Text>
                    </Separator>
                    <ListItem>
                      <Grid style={{marginTop: 20, marginBottom: 10}}>
                        <Col style={{paddingLeft: 10,paddingRight: 5}}>
                          <Button 
                           onPress={() => this.props.navigation.navigate('NewOrder')} 
                            block iconLeft>
                            <Icon active name='md-card' style={{marginRight: 10}} />
                            <Text style={{color: '#fff'}}> إنشاء طلب </Text>
                          </Button>
                        </Col>
                      </Grid>
                    </ListItem>
                  </List>
                : 
                 <View style={styles.centerView}>
                   <Text style={styles.emptyText}> سلة المشتريات فارغة</Text>
                 </View>
                }
              </Content>
            )
          }}
        </Query>
      </Container>
    )
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
  cartPrice: {fontSize: 14, fontWeight: 'bold'},
  cartMeta: {fontSize: 14, fontWeight: 'bold'},
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







