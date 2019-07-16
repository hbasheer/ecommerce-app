import React, { Component } from 'react';
import { Alert, AsyncStorage, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Container, Content, Separator, Image, View, Text, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col, Label, Card, CardItem, Form, Item, Input, Textarea} from 'native-base';
import { Query, Mutation } from "react-apollo";
import { getCartLocal, GetCartQuery } from ".././Query";
import { CreateOrderMutation } from ".././Mutation";
import client from ".././ApolloClient";
import { Dimensions } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class NewOrderScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        address: null,
        mobile: null,
        detail: null,
        mapRegion: { latitude: 35.569303586711975, longitude: 45.43674841290283, latitudeDelta: 0.05, longitudeDelta: 0.0421 },
        location: {coords: { latitude: 0, longitude: 0}},
        locationResult: null,
        getLocation: false,
        hasError: false,
        errors: []
      };
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, getLocation: true });
  };

  _update_location = new_coords => {
    console.log("before:" + this.state.location + new_coords)
    this.setState({ location: { coords: new_coords}, getLocation: true });
    console.log(this.state.getLocation)
  }

  static navigationOptions = ({ navigation }) => ({
    title: "طلب جديد",
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  afterCreate = result => {
      client.writeData({ data: 
        {
         cart: {
          __typename: 'Cart',
          id: 0,
          price: 0,
          totalPrice: 0,
          deliveryPrice: 0,
          items: []
         },
         cartCount: 0,
         cartItemIds: []
        }
      });

    let order = result.data.createOrder.order
    this.props.navigation.navigate('OrderDetail', {order})
  };

  render() {
    return (
      <Container style={styles.container}>
        <Query query={getCartLocal} >
          {({ data }) => {
            return (        
                <Mutation mutation={CreateOrderMutation} >
                  {(createOrder, { loading, error }) => (
                    <Content style={styles.content}>
                      <View style={styles.container}>
                        <MapView
                          style={ styles.map }
                          region={this.state.mapRegion}
                          draggable
                        >
                          <MapView.Marker
                            coordinate={this.state.getLocation ? this.state.location.coords : {latitude: 35.569303586711975, longitude: 45.43674841290283}}
                            onDragEnd={(e) => this.setState({ location: { coords: e.nativeEvent.coordinate}, getLocation: true }) }
                            draggable />

                        </MapView>
                      
                      </View>
                      <Form>

                        <CardItem>
                          <Body>
                            <Item >
                              <Label>latitude: </Label>
                              <Input disabled value={this.state.getLocation ? this.state.location.coords.latitude.toString() : ''} />
                            </Item>
                          </Body>
                        </CardItem>                         
                        <CardItem>
                          <Body>
                            <Item >
                              <Label>longitude: </Label>
                              <Input disabled value={this.state.getLocation ? this.state.location.coords.longitude.toString(): ''} />
                            </Item>
                          </Body>
                        </CardItem>                            
                        <CardItem>
                          <Body>
                            <Item >
                                <Label>العنوان: </Label>
                                <Input
                                  text={this.state.email}
                                  onChangeText={text => {
                                    this.setState({
                                      address: text
                                    });
                                  }}
                                />
                            </Item>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Item>
                                <Label>رقم الموبايل: </Label>
                                <Input
                                  onChangeText={text => {
                                    this.setState({
                                      mobile: text
                                    });
                                  }}
                                />
                            </Item>
                          </Body>
                        </CardItem>
                      </Form>
                      <Form style={{padding: 15}}>
                        <Label>التفاصيل: </Label>
                        <Textarea rowSpan={5} bordered 
                          onChangeText={text => {
                            this.setState({
                              detail: text
                            });
                          }}
                        />
                      </Form>

                      {this.state.hasError && this.state.errors &&  !loading? this.state.errors.map(({ message }, i) => (<Text key={i} style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{message}</Text>))
                        :null
                      }
                      { loading && 
                        <View style={styles.marginTop}>
                          <ActivityIndicator size="large" color="#0000ff"  />
                        </View>  }
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
                        <ListItem>
                          <Grid style={{marginTop: 20, marginBottom: 10}}>
                            <Col style={{paddingLeft: 10,paddingRight: 5}}>
                              <Button 
                               block 
                               iconLeft
                                onPress={() => {
                                  {
                                    createOrder({
                                      variables: {
                                        mobile: Number(this.state.mobile),
                                        lat: this.state.location.coords.latitude,
                                        lng: this.state.location.coords.longitude,
                                        address: this.state.address,
                                        detail: this.state.detail
                                      }
                                    })
                                    .then(res => this.afterCreate(res))
                                    .catch(err => this.setState({hasError: true, errors: err.graphQLErrors, success: false}))
                                  }
                                }}
                               >
                                <Icon active name='md-card' style={{marginRight: 10}} />
                                <Text style={{color: '#fff'}}> إنشاء طلب </Text>
                              </Button>
                            </Col>
                          </Grid>
                        </ListItem>
                      </List>
                    </Content>
                  )}
              </Mutation>
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
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
    flex: 1 
  }

};