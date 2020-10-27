import axios from 'axios'
const API = "http://localhost:3004"

const Query = {
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
}
export {
    Query
}