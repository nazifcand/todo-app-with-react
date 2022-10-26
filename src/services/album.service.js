import request from './base.service'

export const fetchAlbums = (params) => {
  return request
    .get('/albums', { params: { ...params } })
    .then(res => [null, res.data])
    .catch(err => [err])
}
