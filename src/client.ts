import { SchemaLink } from "@apollo/link-schema";
import { gql } from "@apollo/client";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { InMemoryCache, ApolloClient } from "@apollo/client/core";

const typeDefs = gql`
  type Query {
    dogs: String
    cats: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      dogs: () => {
        return "bark";
      },
      cats: () => {
        throw Error('Hail Satan')
      }
    }
  }
});

const apolloCache = new InMemoryCache();

export const graphqlClient = new ApolloClient({
  cache: apolloCache,
  link: new SchemaLink({ schema })
});
