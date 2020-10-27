import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'

const API = "http://localhost:3004"

const server = new GraphQLServer({
    typeDefs:`
        type Query {
            user(id:ID!): User!
            users(name:String,age:Int): [User!]!
            msg(values:[String!]!): String!
            posts: [Post!]!
            post(id: ID!): Post!
            pictures: [Picture!]!            
        },

        type Picture {
            id: ID!
            path: String!
            author: User!
            post: Post!
        },

        type User {
            id: ID!
            name: String!
            age: Int
            married: Boolean!
            average: Float
            posts: [Post!]!
            pictures: [Picture!]!
        },
        type Post {
            id: ID!
            title: String!
            content: String!
            author: User!
            picture: Picture!
        }
    `,
    resolvers:{
        Query: {
            users: async(parent,args,context,info) => { 

                const name = args.name != null ? `name=${args.name}` : ''
                const age = args.age != null ? `age=${args.age}` : ''

                const response  = await axios.get(`${API}/users?${name}&${age}`)
                return response.data
            },
            user: async(parent,args,context,info) => {
                const response  = await axios.get(`${API}/users/${args.id}`)
                return response.data
            },
            msg: (parent,args,context,info) => {
                if (args.values.length === 0){
                    return("Wrong values")
                }
                return (`Hello my friend, yuo say: ${args.values[0]} and ${args.values[1]}` )
            },
            posts: async(parent,args,context,info) => {
                const response  = await axios.get(`${API}/posts`)
                return response.data
            },
            pictures: async(parent,args,context,info) => {
                const response  = await axios.get(`${API}/pictures`)
                return response.data
            },
        },
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