import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
} from "@apollo/client";

export const client = new ApolloClient({
	cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.APIP_URL}/graphql`,
    fetch
  }),
  connectToDevTools: true,
});
export const clientSite = new ApolloClient({
	cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.APIS_URL}/graphql`,
    fetch
  }),
  connectToDevTools: true,
});
