import React from 'react';
import { Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Content, View, Header, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import {Icon} from 'expo';

const items = [
  {id: 1, quantity:1, title: 'Black Hat', categoryId: 5, categoryTitle: 'MEN', price: '2200',quantity: 5, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 2, quantity:3, title: 'V Neck T-Shirt', categoryId: 2, categoryTitle: 'WOMEN', price: '12$',quantity: 2, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 10, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$',quantity: 1, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 9, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$',quantity: 1, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 8, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$',quantity: 1, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 7, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$',quantity: 1, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 6, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$',quantity: 1, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 5, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$',quantity: 1, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 4, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$',quantity: 1, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 3, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$',quantity: 1, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 11, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$',quantity: 1, image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
];

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
      cartItems: [],
      isloading: true
    };
  }

  async  componentWillMount() {
    await AsyncStorage.getItem("CART", (err, res) => {
      if (!res) this.setState({cartItems: []});
      else this.setState({cartItems: JSON.parse(res)});
      this.setState({ isLoadingComplete: true });
    });
  }

  render() {
    if (!this.state.isLoadingComplete){
      return  <ActivityIndicator size="large" color="#0000ff" />     
    }else{
      return (
        <Container style={{backgroundColor: '#fdfdfd'}}>
            {this.state.cartItems.length <=0 ?
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon.Ionicons name="md-cart" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}} />
                <Text style={{color: '#95a5a6'}}>Your cart is empty</Text>
              </View>
              :
              <Content style={{paddingRight: 10}}>
                <List>
                    {this.renderItems()}
                </List>
                <Grid style={{marginTop: 20, marginBottom: 10}}>
                  <Col style={{paddingLeft: 10,paddingRight: 5}}>
                    <Button onPress={() => this.checkout()} style={{backgroundColor: '#2f95dc'}} block iconLeft>
                      <Icon.Ionicons name='md-card' style={{marginLeft: 10}} />
                      <Text style={{color: '#fff'}}> إنشاء طلب </Text>
                    </Button>
                  </Col>
                </Grid>
              </Content>
            }
        </Container>
      )
    }
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={this.state.cartItems.length === i+1}
          onPress={() => this.itemClicked(item)}
        >
          <Thumbnail square style={{width: 110, height: 90}} source={{ uri: item.image }} />
          <Body style={{paddingLeft: 10}}>
            <Text style={{fontSize: 18, textAlign: 'left'}}>
              {item.quantity > 1 ? item.quantity+"x " : null}
              {item.title}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10 ,textAlign: 'left'}}>{item.price} IQD</Text>
            <Text style={{fontSize: 14 ,fontWeight: 'bold', textAlign: 'left'}}>الالون: {item.color}</Text>
            <Text style={{fontSize: 14 ,fontWeight: 'bold', textAlign: 'left'}}>الحجم: {item.size}</Text>
          </Body>
          <Right>
            <Button style={{marginLeft: -25}} transparent onPress={() => this.addQuantity(item)}>
              <Icon.Ionicons size={30} style={{fontSize: 30, color: '#2f95dc'}} name='md-add-circle' />
            </Button>
            <Button style={{marginLeft: -25}} transparent onPress={() => this.removeItem(item)}>
              <Icon.Ionicons size={30} style={{fontSize: 30, color: '#e6683c'}} name='md-remove-circle' />
            </Button>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  removeItemPressed(item) {
    Alert.alert(
      'Remove '+item.title,
      'Are you sure you want this item from your cart ?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.removeItem(item)},
      ]
    )
  }

  addQuantity(quantityToItem) {
    let items = [];
    this.state.cartItems.map((item) => {
      if(JSON.stringify(item) == JSON.stringify(quantityToItem) ){
        item.quantity += 1
        items.push(item);
      }else{
        items.push(item);
      }
    });
    this.setState({cartItems: items});
    AsyncStorage.setItem("CART", JSON.stringify(items));
    AsyncStorage.setItem("CART_ITEMS", JSON.stringify(items.length));
  }

  removeItem(itemToRemove) {
    let items = [];
    this.state.cartItems.map((item) => {
      if(JSON.stringify(item) !== JSON.stringify(itemToRemove) ){
        items.push(item);
      }
      else{
        if(item.quantity > 1){
          item.quantity -= 1
          items.push(item);
        }
      }
    });
    this.setState({cartItems: items});
    AsyncStorage.setItem("CART", JSON.stringify(items));
    AsyncStorage.setItem("CART_ITEMS", JSON.stringify(items.length));
  }

  removeAllPressed() {
    Alert.alert(
      'Empty cart',
      'Are you sure you want to empty your cart ?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.removeAll()}
      ]
    )
  }

  removeAll() {
    this.setState({cartItems: []})
    AsyncStorage.setItem("CART",JSON.stringify([]));
  }

  checkout() {
  }

  itemClicked(item) {
  }

}

const styles={
  title: {
    fontWeight: '100'
  }
};







