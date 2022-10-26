import request from './base.service'

export const fetchTodos = (params) => {
  return request
    .get('/todos', { params: { ...params } })
    .then(res => [null, res.data])
    .catch(err => [err])
}
