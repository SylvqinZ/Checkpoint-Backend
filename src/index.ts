// npm install @apollo/server graphql
import "reflect-metadata"; 
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import  dataSource  from "./lib/datasource";
import { CountryResolver } from "./resolvers/country.resolver";


const start = async () => {
  dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [CountryResolver],
     validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);

 
}

start();