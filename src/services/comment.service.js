import request from './base.service'

export const fetchComments = (params) => {
  return request
    .get('/comments', { params: { ...params } })
    .then(res => [null, res.data])
    .catch(err => [err])
}
