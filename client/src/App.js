import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchItems from "./pages/SearchItems";
import Home from "./pages/Home";
import SavedItems from "./pages/SavedItems";
import Footer from "./components/Footer";
import AppNavBar from "./components/NavBar";
import Auth from "./utils/auth";

import "./app.css";

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "/graphql"
      : "http://localhost:3002/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) =>
      console.error("GraphQL error:", message),
    );
  }

  if (networkError) {
    console.error("Network error:", networkError);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchItems />} />
          <Route path="/saved" element={<SavedItems />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>404! This page doesn't exist</h1>} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
