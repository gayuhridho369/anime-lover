import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co/",
  cache: new InMemoryCache(),
});

function ProviderApollo(props) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

export default ProviderApollo;
