"use client"

import { ChildrenType } from '@/types';
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link';
// import { createHttpLink } from "apollo-link-http";

const AppContextProviders = ({ children }: ChildrenType) => {

  const client = new ApolloClient({
    // uri: "https://flyby-router-demo.herokuapp.com/",
    link: ApolloLink.from([
      new MultiAPILink({
        endpoints: {
          flyby: "https://flyby-router-demo.herokuapp.com/",
          hygraph: "https://api-ap-south-1.hygraph.com/v2/cm0xextbc04ju07uxad0933o9/master",
        },
        httpSuffix: '',
        // createHttpLink: new HttpLink(),
        createHttpLink,
        
      })
    ]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default AppContextProviders
