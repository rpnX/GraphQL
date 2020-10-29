import { GraphQLServer } from 'graphql-yoga'
import { Query, Post, User, Picture } from './graphQL/resolvers/index'

const server = new GraphQLServer({
    typeDefs:'./src/graphQL/schema.graphql',
    resolvers:{
        Query,
        Post,
        User,
        Picture
    }
})

server.start(()=>{
        console.log("Server Start")
    }
)