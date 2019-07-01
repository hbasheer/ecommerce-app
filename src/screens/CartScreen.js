import React from 'react';
import { Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Content, Separator, View, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import { Mutation, Query } from "react-apollo";
import {  CartAddProductMutation, CartRemoveProductMutation, CartDeleteProductMutation } from ".././Mutation"
import { GetCartQuery } from ".././Query"

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
  
  constructor(props) {
    super(props);
    this.state = {
      cart: {
        id: 0,
        deliveryPrice: 0,
        price: 0,
        totalPrice: 0,
        items: [],
      },
      isFirstRender: true,
    };
  }
  
  _updateCartfromQuery = (data) => {
    if (data && this.state.isFirstRender) {
      this.setState({
        cart: {
          id: data.getCart.id,
          deliveryPrice: data.getCart.deliveryPrice,
          price: data.getCart.price,
          totalPrice: data.getCart.totalPrice,
          items: data.getCart.lineItems,
        },
        isFirstRender: false
      })
    }
  }

  _updateCartfromMutation = (data) => {
    if (data) {
      this.setState({
        cart: {
          id: data.id,
          deliveryPrice: data.deliveryPrice,
          price: data.price,
          totalPrice: data.totalPrice,
          items: data.lineItems,
        }
      })
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        <Query 
          query={GetCartQuery}
          onCompleted={data => this._updateCartfromQuery(data)}

          >
          {({ loading, error, data }) => {
            if (loading) {
                return  <ActivityIndicator size="large" color="#0000ff" />
            }
            if (error) {
              return <Text>{error}</Text>;
            }
            return (            
              <Content style={styles.content}>
                {this.state.cart.items.length > 0 ? 
                  <List>
                      {this.renderItems(this.state.cart)}
                    <Separator bordered>
                      <Text></Text>
                    </Separator>
                    <ListItem noIndent bordered style={styles.metalist}>
                      <Left>
                        <Text style={styles.cartMeta}>المجموع:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.cartPrice}>{this.state.cart.price} IQD </Text>
                      </Right>
                    </ListItem>
                    <ListItem noIndent bordered style={styles.metalist}>
                     <Left>
                        <Text style={styles.cartMeta}>سعر التوصيل:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.cartPrice}>{this.state.cart.deliveryPrice} IQD</Text>
                      </Right>
                    </ListItem>
                    <ListItem noIndent bordered style={styles.metalist}>
                      <Left>
                        <Text style={styles.cartMeta}>المجموع الكلي:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.cartPrice}>{this.state.cart.totalPrice} IQD</Text>
                      </Right>
                    </ListItem>
                    <Separator >
                      <Text></Text>
                    </Separator>
                    <ListItem>
                      <Grid style={{marginTop: 20, marginBottom: 10}}>
                        <Col style={{paddingLeft: 10,paddingRight: 5}}>
                          <Button onPress={() => this.checkout()} block iconLeft>
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

  renderItems(cart) {
    let items = [];
    cart.items.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={cart.items.length === i+1}
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
          <Right>
            <Mutation 
              mutation={CartAddProductMutation}
              onCompleted={data => this._updateCartfromMutation(data.cartAddProduct.cart)}
              >
              {(cartAddProduct, { loading, error }) => {

              
                if (loading) {
                  return(
                    <Button style={{marginLeft: -10}} transparent >
                      <ActivityIndicator size="small" color="#0000ff" style = {styles.activityIndicator} />
                    </Button>
                  )  

                }
                return (
                  <Button style={styles.addButton} transparent onPress={() => 
                    {
                      cartAddProduct({
                        variables: {
                          productId: item.product.id,
                        }
                      })
                    }
                  }>
                    <Icon active size={25} style={{fontSize: 25, color: '#2f95dc'}} name='md-add-circle' />
                  </Button>
                )
              }}
            </Mutation>
            <Mutation
              mutation={CartRemoveProductMutation}
              onCompleted={data => this._updateCartfromMutation(data.cartRemoveProduct.cart)}
            > 
              {(cartRemoveProduct, { loading, error }) => {
                if (loading) {
                  return(
                    <Button style={{marginLeft: -10}} transparent >
                      <ActivityIndicator size="small" color="#0000ff" style = {styles.activityIndicator} />
                    </Button>
                  )  

                }
                return (
                  <Button style={{marginLeft: -25}} transparent onPress={() => 
                    {
                      cartRemoveProduct({
                        variables: {
                          productId: item.product.id,
                        }
                      })
                    }
                  }>
                    <Icon active size={25} style={{fontSize: 25, color: '#e6683c'}} name='md-remove-circle' />
                  </Button>
                )
              }}
            </Mutation>
            <Mutation
              mutation={CartDeleteProductMutation}
              onCompleted={data => this._updateCartfromMutation(data.cartDeleteProduct.cart)}
            > 
              {(cartDeleteProduct, { loading, error }) => {
                if (loading) {
                  return(
                    <Button style={{marginLeft: -10}} transparent >
                      <ActivityIndicator size="small" color="#0000ff" style = {styles.activityIndicator} />
                    </Button>
                  )  

                }
                return (
                  <Button style={{marginLeft: -25}} transparent onPress={() => 
                    {
                      cartDeleteProduct({
                        variables: {
                          productId: item.product.id,
                        }
                      })
                    }
                  }>
                    <Icon active size={35} style={{color: '#e6683c'}} name='md-trash' />
                  </Button>
                )
              }}
            </Mutation>
          </Right>
        </ListItem>
      );
    });
    return items;
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







