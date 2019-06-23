import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import {AsyncStorage} from 'react-native';

const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxfSwiZXhwIjoxNTc3MDQxMDkzfQ.x5eG2wn38UNuk8eef7MF7zi8CDajYiyl542FZuWnuAs";

const httpLink = new HttpLink({ 
	uri: 'http://10.0.3.2:3000/api/graphql',
	headers: {
	  authorization: token ? `Bearer ${token}` : ''
	}
});

//const token = AsyncStorage.getItem('TOKEN').then((token) => {console.log(token)})
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;