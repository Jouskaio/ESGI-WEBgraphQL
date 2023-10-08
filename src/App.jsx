import {ApolloProvider} from "@apollo/client";
import client from "./services/api/apolloClient";
import Table from "./components/table";
import "./styles/global.scss";

function App() {
  return (
    <main className={'l-homepage'}>
      <ApolloProvider client={client}>
        <div className={'l-homepage__header'}>
          <h1>Dashboard</h1>
          <nav className={"l-homepage__titles"}>
            <a href={'/brands'} className={"l-homepage__link"}>Brand</a>
            <a href={'/new'} className={"l-homepage__link"}>New Shoes</a>
          </nav>
        </div>
        <Table/>
      </ApolloProvider>
    </main>
  );
}

export default App;
