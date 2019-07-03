import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import {AsyncStorage} from 'react-native';
import { Query } from "react-apollo";

import { GetCartQuery } from "./Query"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxfSwiZXhwIjoxNTc3MDQxMDkzfQ.x5eG2wn38UNuk8eef7MF7zi8CDajYiyl542FZuWnuAs";

const httpLink = new HttpLink({ 
	uri: 'http://10.0.3.2:3000/api/graphql',
	headers: {
	  authorization: token ? `Bearer ${token}` : ''
	}
});

const resolvers = {};

//const token = AsyncStorage.getItem('TOKEN').then((token) => {console.log(token)})
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers
});

client.query({query: GetCartQuery}).then(response => {
  cache.writeData({ data: 
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
    }
  });
});


export default client;