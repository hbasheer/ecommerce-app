import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import {AsyncStorage} from 'react-native';

const cache = new InMemoryCache();
const token = AsyncStorage.getItem('TOKEN');

const URL = new HttpLink({
  uri: 'https://xerabazar.store/api/graphql',
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  }
})

const client = new ApolloClient({
  link: URL,
  cache
});

export default client;