import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'
import { Query } from './graphQL/resolvers/index'

const API = "http://localhost:3004"


const server = new GraphQLServer({
    typeDefs:'./src/graphQL/schema.graphql',
    resolvers:{
        Query,
        Post:{
            author: async(parent,args,context,info) => {
                const response  = await axios.get(`${API}/users/${parent.author}`)
                return response.data
            },
            picture: async(parent,args,context,info) => {
                const response  = await axios.get(`${API}/pictures/${parent.picture}`)
                return response.data
            }
        },
        User:{
            posts: async(parent,args,context,info) => {
                const response  = await axios.get(`${API}/posts?author=${parent.id}`)
                return response.data
            },
            pictures: async(parent,args,context,info) => {
                const response  = await axios.get(`${API}/pictures?author=${parent.id}`)
                return response.data
            }
        },
        Picture: {
            author: async(parent,args,context,info) => {
                const response  = await axios.get(`${API}/users/${parent.author}`)
                return response.data
            },
            post: async(parent,args,context,info) => {
                const response  = await axios.get(`${API}/post/${parent.post}`)
                return response.data
            },
        }

    }

})

server.start(()=>{
        console.log("Server Start")
    }
)