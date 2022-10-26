import { useLoaderData, useParams } from "react-router-dom"
import { fetchPosts } from "../../services/post.service"
import { fetchAlbums } from "../../services/album.service"
import { Link } from 'react-router-dom'
import Modal from "../../components/Modal"
import { useState } from "react"

export const loader = async ({ params }) => {
  const [err, results] = await Promise.all([
    fetchPosts({ userId: params.userId }),
    fetchAlbums({ userId: params.userId }),
  ])
    .then(res => [null, res])
    .catch(err => [err])

  if (err) new Error({
    message: 'error',
    details: err.data.response
  })

  const [postsErr, posts] = results[0];
  const [albumsErr, albums] = results[1];

  return {
    posts,
    albums,
  }
}

const UserIndex = () => {
  const { posts, albums, } = useLoaderData()
  const { userId } = useParams()
  const [createPostModal, setCreatePostModal] = useState(false)


  const AlbumItem = ({ album }) => {
    return <Link to={`/user/${userId}/album/${album.id}`} className="album">
      {album.title}
    </Link>
  }

  const PostItem = ({ post }) => {
    return <div className="post">
      <Link className="title" to={`/user/${userId}/post/${post.id}`}>
        <h3 >{post.title}</h3>
      </Link>

      <p className="short-content">{post.body}</p>
    </div>
  }

  return <>
    <Modal title='Create Post' size='small' open={createPostModal} onClose={() => setCreatePostModal(false)}>
      <form>
        <div className="group">
          <span>Title</span>
          <input type="text" placeholder="Post title" />
        </div>

        <div className="group">
          <span>Content</span>
          <textarea rows="10" placeholder="Post content"></textarea>
        </div>

        <div className="group">
          <button type="submit">Save</button>
        </div>
      </form>
    </Modal>

    <div className="section">
      <div className="section-title">
        <h2>Posts ({posts.length})</h2>

        <div className="add-new" onClick={() => setCreatePostModal(!createPostModal)}>
          <i className="far fa-plus"></i>
        </div>
      </div>

      <div className="posts">
        {posts.map(post => <PostItem key={post.id} post={post} />)}
      </div>
    </div>

    <div className="section">
      <div className="section-title">
        <h2>Albums ({albums.length})</h2>
      </div>

      <div className="albums">
        {albums.map(album => <AlbumItem key={album.id} album={album} />)}
      </div>
    </div>
  </>
}

export default UserIndex