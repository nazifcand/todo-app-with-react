import request from './base.service'

export const fetchPhotos = (params) => {
  return request
    .get('/photos', { params: { ...params } })
    .then(res => [null, res.data])
    .catch(err => [err])
}
