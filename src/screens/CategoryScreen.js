import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
  AsyncStorage
} from 'react-native';
import {Icon} from 'expo';
import { Mutation, Query } from "react-apollo";
import { CartAddProductMutation } from ".././Mutation"
import { ProductsQuery, GetCartQuery} from ".././Query";

export default class CategoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: props.navigation.state.params.item,
      cartItems: []
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.arName,
    headerStyle: {
      backgroundColor: '#2f95dc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  async getCartItems() {
    await AsyncStorage.getItem("CART", (err, res) => {
      if (!res) this.setState({cartItems: []});
      else this.setState({cartItems: JSON.parse(res)});
    });
  }

   addItemToCart(product){
      // Get current list of products
      this.getCartItems();
      let products = this.state.cartItems
      let idx = this.state.cartItems.indexOf(product)
      
      if (this.state.cartItems.indexOf(product) !== -1) {
        products[idx].quantity += 1;
      } else {
        let new_product = Object.assign(product, {quantity: 1});
        products.push(new_product);
      }
      
      // Update the state
      this.setState({
        cartItems: products,
      })
      AsyncStorage.setItem("CART", JSON.stringify(products));
      AsyncStorage.setItem("CART_ITEMS", JSON.stringify(products.length));
      Alert.alert('تنبيه!', 'تم إضافة المنتج للسلة بنجاح');
    }

  render() {
    const categoryId = this.state.category ? this.state.category.id : null;
    return (
      <View style={styles.container}>
        <Query query={ProductsQuery} variables={{id: categoryId }} >
          {({ loading, error, data }) => {
            if (loading) {
                return  <ActivityIndicator size="large" color="#0000ff" />
            }
            if (error) {
              return <Text>{error}</Text>;
            }

          return(
            <FlatList style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={data.products}
              horizontal={false}
              numColumns={2}
              keyExtractor= {(item) => {
                return item.id;
              }}
              ItemSeparatorComponent={() => {
                return (
                  <View style={styles.separator}/>
                )
              }}
              renderItem={(product) => {
                const item = product.item;
                return (
                  <View style={styles.card}>
                   <View style={styles.cardHeader}>
                      <View style={styles.row}>
                        <Text style={styles.title}>{item.arName}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.price}>{item.price} IQD</Text>
                      </View>
                    </View>

                    <Image style={styles.cardImage} source={{uri:item.imageUrl}}/>
                    
                    <View style={styles.cardFooter}>
                      <View style={styles.buttonContainer}>
                        <Mutation 
                          mutation={CartAddProductMutation}
                          refetchQueries={() => {
                             return [{
                                query: GetCartQuery,
                            }];
                          }}
                          >
                          {(cartAddProduct, { loading, error }) => {

                            if (loading) {
                              return <ActivityIndicator size="large" color="#0000ff" style = {styles.activityIndicator} />
                            }

                            return (
                              <TouchableOpacity style={styles.socialBarButton} onPress={() => 
                                {
                                  cartAddProduct({
                                    variables: {
                                      productId: item.id,
                                    }
                                  })
                                }
                              }>
                                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/nolan/96/3498db/add-shopping-cart.png'}}/>
                                <Text style={[styles.socialBarLabel, styles.addToCart]}>أضف إلى السلة</Text>
                              </TouchableOpacity>
                            )
                          }}
                        </Mutation>
                      </View>
                    </View>
                  </View>
                )
              }}
            />
          )
          }}
        </Query>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 5,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 5,
    backgroundColor:"white",
    flexBasis: '47%',
    marginHorizontal: 5,
    borderColor: "#e3e3e3",
    borderWidth: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeader: {
    paddingVertical: 12.5,
    paddingHorizontal: 12.5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flex: 1,
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 12.5,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 12.5,
    paddingHorizontal: 10,
    borderTopColor: "#e3e3e3",
    borderTopWidth: 1,
    backgroundColor: '#f5f5f5',
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:14,
  },
  price:{
    fontSize:16,
    color: "green",
    marginTop: 5,
    fontWeight: "bold",
  },
  addToCart:{
    color: "#2f95dc",
  },
  icon: {
    width:25,
    height:25,
  },
  /******** button Container ******************/
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});   