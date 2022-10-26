import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

export default axios