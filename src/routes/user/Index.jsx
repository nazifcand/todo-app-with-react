import { fetchPosts, createPost } from "../../services/post.service"
import { useLoaderData, useParams } from "react-router-dom"
import { fetchAlbums } from "../../services/album.service"
import Modal from "../../components/Modal"
import { Link } from 'react-router-dom'
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'

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
  let { posts, albums } = useLoaderData()
  const { userId } = useParams()
  const [createPostModal, setCreatePostModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: 'Example Post Name',
      body: 'Example Post Body',
      userId
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Post basligi en az 5 karakter olmali!')
        .max(15, 'Post basligi en fazla 15 karakter olmai!')
        .required('Post basligi zorunlu bir alandir!'),

      body: Yup.string()
        .min(25, 'post body en az 25 karakter olmali')
        .required('Post body zorunlu bir alanadir')
    }),

    onSubmit: async values => {

      const [err, createdPost] = await createPost(values)

      if (err) {
        return alert('Bir hata meydana geldi!')
      }

      // posts = [
      //   ...posts,
      //   createdPost
      // ]
      posts.push(createdPost)
      setCreatePostModal(false)
    }
  }, { abortEarlt: false })


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
      <form onSubmit={formik.handleSubmit}>
        <div className="group">
          <span>Title</span>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            name='title'
            type="text"
            placeholder="Post title"
          />
          {formik.touched.title && formik.errors.title ? <span className="err-text">{formik.errors.title}</span> : null}
        </div>

        <div className="group">
          <span>Content</span>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.body}
            name='body'
            rows="10"
            placeholder="Post content"></textarea>
          {formik.touched.body && formik.errors.body ? <span className="err-text">{formik.errors.body}</span> : null}
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