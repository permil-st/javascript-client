import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

import { BASE_URL_GQL } from '../configs/constants';

const link = new HttpLink({
  uri: BASE_URL_GQL,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;
