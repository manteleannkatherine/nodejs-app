import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { resolvers } from "./generated/typegraphql-prisma";
import { ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core";
import * as tq from 'type-graphql';

const prisma = new PrismaClient()

const PORT = process.env.PORT || 4000

const app = async () => {
  const schema = await tq.buildSchema({ resolvers });

  const context = () => {
    return {
      prisma
    }
  }
  
  new ApolloServer({ 
    schema, 
    context, 
    plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false})],
    introspection: true
  }).listen({ port: PORT }, () =>
    console.log(`app running on port ${PORT}`)
  )
}

app()