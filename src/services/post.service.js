import request from './base.service'

export const fetchPosts = (params) => {
  return request
    .get('/posts', { params: { ...params } })
    .then(res => [null, res.data])
    .catch(err => [err])
}
