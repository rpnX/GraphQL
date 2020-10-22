import { GraphQLServer } from 'graphql-yoga'

const server = new GraphQLServer({
    typeDefs:`
        type Query {
            id :ID
            name: String
            age: Int
            married: Boolean
            average: Float
        }
    `,
    resolvers:{
        Query: {
            id(){
                return 1
            },
            name(){
                return"John"
            },
            age(){
                return 50
            },
            married(){
                return true
            },
            average(){
                return 3.5
            }
        }
    }

})

server.start(
    ()=>{
        console.log("run run")
    }
)