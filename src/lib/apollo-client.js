import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

import { BASE_URL_GQL } from '../configs/constants';
import { getUserToken } from './utils';

const httpLink = new HttpLink({
  uri: BASE_URL_GQL,
});

const authorizationLink = setContext((request, prevContext) => ({
  headers: {
    ...prevContext.headers,
    authorization: getUserToken(),
  },
}));

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authorizationLink.concat(httpLink),
  cache,
});

export default client;
