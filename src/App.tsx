import { ApolloProvider, gql, useQuery } from "@apollo/client";
import React from "react";
import { graphqlClient } from "./client";
import "./styles.css";

const GET_DOGS = gql`
  query GetDogs {
    dogs
    cats
  }
`;

const Compo1: React.FC = () => {
  const { data, error, loading, called } = useQuery(GET_DOGS);
  
  if(!loading && called) {
    console.log("[Compo1] Without explicit errorPolicy - ", data, error?.message);
  }
  
  return null;
};

const Compo2: React.FC = () => {
  const { data, error, loading, called } = useQuery(GET_DOGS, {
    errorPolicy: "all"
  });

  if(!loading && called) {
    console.log("[Compo2] With explicit errorPolicy - ", data, error?.message);
  }
  
  return null;
};

export default function App() {
  return (
    <ApolloProvider client={graphqlClient}>
      <div className="App">
        <Compo1 />
        <Compo2 />
        <h1>Check console</h1>
      </div>
    </ApolloProvider>
  );
}
