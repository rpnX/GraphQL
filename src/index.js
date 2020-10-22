import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'

const server = new GraphQLServer({
    typeDefs:`
        type Query {
            agent(id:ID!): User!
            agents: [User!]!
            
        },
        type User {
            id: ID!
            name: String!
            age: Int
            married: Boolean!
            average: Float
        }
    `,
    resolvers:{
        Query: {
            agents: async() => { 
                const response  = await axios.get('http://localhost:3004/users')
                return response.data
            },
            agent: async(rest,args) => {
                const response  = await axios.get(`http://localhost:3004/users/${args.id}`)
                return response.data
            }
        }
    }

})

server.start(
    ()=>{
        console.log("Server Start")
    }
)