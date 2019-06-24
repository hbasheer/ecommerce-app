import React from 'react';
import { Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Content, View, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import Text from '../components/Text';
import Navbar from '../components/Navbar';


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
  
  componentWillMount() {
    this.getCartItems()
  }

  async getCartItems() {
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
          <Container style={styles.container}>
            <Content style={styles.content}>
              <List>
                  {this.renderItems()}
              </List>
              <Grid style={{marginTop: 20, marginBottom: 10}}>
                <Col style={{paddingLeft: 10,paddingRight: 5}}>
                  <Button onPress={() => this.checkout()} block iconLeft>
                    <Icon active name='md-card' style={{marginLeft: 10}} />
                    <Text style={{color: '#fff'}}> إنشاء طلب </Text>
                  </Button>
                </Col>
              </Grid>
            </Content>
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
          <Thumbnail square style={styles.thumbnail} source={{ uri: item.imageUrl }} />
          <Body style={{paddingLeft: 10}}>
            <Text style={styles.quantity}>
              {item.quantity > 1 ? item.quantity+ "x " : null}
              {item.title}
            </Text>
            <Text style={styles.itemTitle}>{item.arName}</Text>
            <Text style={styles.itemPrice}>{item.price} IQD</Text>
          </Body>
          <Right>
            <Button style={styles.addButton} transparent onPress={() => this.addQuantity(item)}>
              <Icon active size={30} style={{fontSize: 30, color: '#2f95dc'}} name='md-add-circle' />
            </Button>
            <Button style={{marginLeft: -25}} transparent onPress={() => this.removeItem(item)}>
              <Icon active size={30} style={{fontSize: 30, color: '#e6683c'}} name='md-remove-circle' />
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
  title: {fontWeight: '100'},
  container: {backgroundColor: '#fdfdfd'},
  content: {paddingRight: 10},
  thumbnail: {width: 110, height: 90},
  quantity: {fontSize: 18, textAlign: 'left'},
  itemTitle: {fontSize: 14 ,fontWeight: 'bold', textAlign: 'left'},
  itemPrice: {fontSize: 16, fontWeight: 'bold', marginBottom: 10 ,textAlign: 'left'},
  addButton: {marginLeft: -25},

};







