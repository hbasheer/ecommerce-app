import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  Image,
  TouchableOpacity
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { Query } from "react-apollo";
import { ProductsQuery} from ".././Query";
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

export default class CategoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: props.navigation.state.params.item
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

  render() {
    const categoryId = this.state.category ? this.state.category.id : null;

    return (
      <Container >
        <Content >
          <Query query={ProductsQuery} variables={{id: categoryId }} >
            {({ loading, error, data }) => {
              if (loading) {
                  return  <ActivityIndicator size="large" color="#0000ff" />
              }
              if (error) {
                return <Text>{error}</Text>;
              }
              return(
                <FlatGrid
                  itemDimension={130}
                  items={data.products}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity 
                      style={[styles.productContainer]}
                      onPress={() => this.props.navigation.navigate('HomeStack')}
                    >
                      <Card>
                        <CardItem cardBody>
                          <Image source={{uri: item.imageUrl }} style={styles.productImage}/>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text> {item.arName} </Text>
                            <Text> {item.price} IQD </Text>
                          </Body>
                        </CardItem>
                      </Card>

                    </TouchableOpacity>
                  )}
                />
              )

            }}
          </Query>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#fff',
  },
    header: {
    fontSize: 12,
  },
  gridView: {
    flex: 1,
  },
  productContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,

  },
  categoryName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  productImage: {
    height: 150, 
    width: null, 
    flex: 1
  }
});
