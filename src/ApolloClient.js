import { ApolloLink, from } from "apollo-link";
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';
import { setContext } from "apollo-link-context";
import { GetCartQuery } from "./Query";

const httpLink = new HttpLink({ uri: 'http://10.0.3.2:3000/api/graphql' });

const authMiddleware = setContext(async (req, { headers }) => {
  const token = await AsyncStorage.getItem('TOKEN');
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    },
  };
});

const resolvers = {};

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache,
  resolvers
});

client.query({query: GetCartQuery}).then(response => {
  client.writeData({ data: 
    {
     cart: {
      __typename: 'Cart',
      id: response.data.getCart.id,
      price: response.data.getCart.price,
      totalPrice: response.data.getCart.totalPrice,
      deliveryPrice: response.data.getCart.deliveryPrice,
      items: response.data.getCart.lineItems
     },
     cartCount: response.data.getCart.lineItems.length,
     cartItemIds: response.data.getCart.lineItems.map(item => item.product.id)
    }
  });
  }).catch(err => {
  client.writeData({ data: 
    {
     cart: {
      __typename: 'Cart',
      items: []
     },
     cartCount: 0,
     cartItemIds: []
    }
  });
});

export default client;