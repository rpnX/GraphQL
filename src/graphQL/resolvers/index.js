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

const Mutation = {
    createUser: async(parent,args,context,info) => {
        const response  = await axios.post(`${API}/users`,{
            name: args.name,
            age: args.age,
            maried: args.maried
        })
        return response.data
    },
    createPost: async(parent,args,context,info) => {
        const response  = await axios.post(`${API}/posts`,{
            title: args.title,
            content: args.content,
        })
        return response.data
    },
    delelePost: async(parent,args,context,info) => {
        const response  = await axios.delete(`${API}/posts/${args.id}`)
        if(Object.keys(response.data).length === 0){
            return true
        }
        return false
    },
}

const Post = {
    author: async(parent,args,context,info) => {
        const response  = await axios.get(`${API}/users/${parent.author}`)
        return response.data
    },
    picture: async(parent,args,context,info) => {
        const response  = await axios.get(`${API}/pictures/${parent.picture}`)
        return response.data
    }
}

const User = {
    posts: async(parent,args,context,info) => {
        const response  = await axios.get(`${API}/posts?author=${parent.id}`)
        return response.data
    },
    pictures: async(parent,args,context,info) => {
        const response  = await axios.get(`${API}/pictures?author=${parent.id}`)
        return response.data
    }
}

const Picture = {
    author: async(parent,args,context,info) => {
        const response  = await axios.get(`${API}/users/${parent.author}`)
        return response.data
    },
    post: async(parent,args,context,info) => {
        const response  = await axios.get(`${API}/post/${parent.post}`)
        return response.data
    }
}
export {
    Query,
    Mutation,
    Post,
    User,
    Picture
}