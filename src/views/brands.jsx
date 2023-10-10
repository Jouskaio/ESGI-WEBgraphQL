import {ApolloProvider} from "@apollo/client";
import client from "../services/api/apolloClient";
import "../styles/global.scss";

function Brands() {
  return (
    <main>
      <ApolloProvider client={client}>
        BRANDS
      </ApolloProvider>
    </main>
  );
}

export default Brands;
