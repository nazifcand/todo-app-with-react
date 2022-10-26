import { useLoaderData } from "react-router-dom"
import { fetchPhotos } from "../../services/photo.service"

export const loader = async ({ params }) => {
  const [err, photos] = await fetchPhotos({
    albumId: params.albumId
  })

  if (err) return new Error({
    message: 'error',
    details: err.response.data
  })

  return photos
}

const Albums = () => {
  const photos = useLoaderData()

  const PhotoItem = ({ photo }) => {
    return <div className="photo">
      <img src={photo.thumbnailUrl} alt={photo.title} />
      <div className="text">{photo.title}</div>
    </div>
  }

  return <div className="section">
    <div className="section-title">
      <h2>Photos ({photos.length})</h2>
    </div>

    <div className="photos">
      {photos.map(photo => <PhotoItem key={photo.id} photo={photo} />)}
    </div>
  </div>


}

export default Albums