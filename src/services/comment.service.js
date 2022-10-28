import request from './base.service'

export const fetchComments = (params) => {
  return request
    .get('/comments', { params: { ...params } })
    .then(res => [null, res.data])
    .catch(err => [err])
}

export const createComment = (body) => {
  return request
    .post('/comments', { ...body })
    .then(res => [null, res.data])
    .catch(err => [err])
}