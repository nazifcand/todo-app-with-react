import request from './base.service'

export const fetchPosts = (params) => {
  return request
    .get('/posts', { params: { ...params } })
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const createPost = (body) => {
  return request
    .post('/posts', { ...body })
    .then(res => [null, res.data])
    .catch(err => [err])
}