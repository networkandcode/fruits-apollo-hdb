import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';

import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import HdbApi from './datasource.js';

dotenv.config();
console.log(process.env)

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async({ req }) => {
    const { cache } = server;
    const token = req.headers.authorization;
    return {
      dataSources: {
        hdbApi: new HdbApi({ cache, token }),
      }
    }
  }
});

console.log(`🚀  Server ready at: ${url}`);
