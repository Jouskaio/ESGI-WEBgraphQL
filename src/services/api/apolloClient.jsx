import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `http://localhost:4000/graphql`
});
const client = new ApolloClient({
  cache,
  link
});

export default client; // Assurez-vous d'exporter le client Apollo en tant que default
