import request from './base.service'

export const fetchUsers = (params) => {
  return request
    .get('/users', { params: { ...params } })
    .then(res => [null, res.data])
    .catch(err => [err])
}
