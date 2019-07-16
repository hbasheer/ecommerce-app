import React, { Component } from 'react';
import { Text, View, Right, Left, Body, Title, ListItem, Thumbnail, Icon, Button } from 'native-base';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { Mutation } from "react-apollo";
import {  CartAddProductMutation, CartRemoveProductMutation, CartDeleteProductMutation } from ".././Mutation"
import client from '.././ApolloClient';

export default class CartProducts extends Component {
  _updateCartfromMutation = (data) => {
    if (data) {
      client.writeData({ data: 
        {
         cart: {
          __typename: 'Cart',
          id: data.id,
          price: data.price,
          totalPrice: data.totalPrice,
          deliveryPrice: data.deliveryPrice,
          items: data.lineItems
         },
         cartCount: data.lineItems.length,
        }
      });
    }
  }

  render() {
  	let products = this.props.products;
    let items = [];
    products.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={products.length === i+1}
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
  thumbnail: {width: 110, height: 90},
  quantity: {fontSize: 18, textAlign: 'left'},
  itemTitle: {fontSize: 16, fontWeight: 'bold', textAlign: 'left'},
  itemPrice: {fontSize: 16, fontWeight: 'bold', marginBottom: 10 ,textAlign: 'left'},
  addButton: {marginLeft: -25},
};
