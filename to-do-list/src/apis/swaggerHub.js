import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0'
})

export default instance