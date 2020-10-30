import { GraphQLServer } from 'graphql-yoga'
import { Query, Mutation, Post, User, Picture } from './graphQL/resolvers/index'

const server = new GraphQLServer({
    typeDefs:'./src/graphQL/schema.graphql',
    resolvers:{
        Query,
        Mutation,
        Post,
        User,
        Picture
    }
})

server.start(()=>{
        console.log("Server Start")
    }
)