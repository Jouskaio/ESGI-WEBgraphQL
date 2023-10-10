import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./styles/global.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Brands from "./views/brands";
import NewShoe from "./views/new";
import Homepage from "./views/homepage";
import client from "./services/api/apolloClient";
import {ApolloProvider} from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <main className={'l-main'}>
      <ApolloProvider client={client}>
        <Router>
          <div className={'l-main__header'}>
            <h1>Dashboard</h1>
            <nav className={"l-main__titles"}>
              <a href={'/'} className={"l-main__link"}>Shoes</a>
              <a href={'/brands'} className={"l-main__link"}>Brand</a>
              <a href={'/new'} className={"l-main__link"}>New Shoe</a>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/new" element={<NewShoe />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </main>
  </React.StrictMode>
);

reportWebVitals();
