import React, { Component } from 'react';
import { Text, View, Body, Title, ListItem, Thumbnail } from 'native-base';
import { StyleSheet } from 'react-native';

export default class ProductsList extends React.Component {

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
};
