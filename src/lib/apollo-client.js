import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { BASE_URL_GQL, BASE_URL_WS } from '../configs/constants';
import { getUserToken } from './utils';

const httpLink = new HttpLink({
  uri: BASE_URL_GQL,
});

const wsLink = new WebSocketLink({
  uri: BASE_URL_WS,
  options: {
    reconnect: true,
  },
});

const authorizationLink = setContext((request, prevContext) => ({
  headers: {
    ...prevContext.headers,
    authorization: getUserToken(),
  },
}));

const cache = new InMemoryCache();

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  authorizationLink.concat(httpLink),
);

const client = new ApolloClient({
  link,
  cache,
});

export default client;
