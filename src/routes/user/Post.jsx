import { useLoaderData, useParams } from "react-router-dom"
import { fetchPosts } from "../../services/post.service"
import { fetchComments, createComment } from "../../services/comment.service"
import * as Yup from 'yup'
import { useFormik } from "formik"

export const loader = async ({ params }) => {

  const [err, results] = await Promise.all([
    fetchPosts({ id: params.userId }),
    fetchComments({ postId: params.postId })
  ])
    .then(res => [null, res])
    .catch(err => [err])

  const [postErr, post] = results[0]
  const [commentsErr, comments] = results[1]

  return { post: post[0], comments }
}


const Post = () => {
  const { post, comments } = useLoaderData()
  const { postId } = useParams()

  const formik = useFormik({
    initialValues: {
      name: 'Nazif Can DURGUT',
      email: 'nazifcandurgutt@gmail.com',
      body: 'React example comment',
      postId
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Post basligi en az 3 karakter olmali!')
        .max(25, validator => `Post basligi en fazla ${validator.max} karakter olmai! Suan ${validator.value.length} karakter kullaniyorsunuz!`)
        .required('Post basligi zorunlu bir alandir!'),

      email: Yup.string()
        .email('Lutfen gecerli bir eposta girin'),

      body: Yup.string()
        .min(25, 'post body en az 25 karakter olmali')
        .required('Post body zorunlu bir alanadir')
    }),
    onSubmit: async values => {
      const [err, createdComment] = await createComment(values)

      if (err) {
        return alert('Bir hata meydana geldi!')
      }

      // posts = [
      //   ...posts,
      //   createdComment
      // ]
      comments.push(createdComment)
      formik.resetForm()
    }
  })

  const CommentItem = ({ comment }) => {
    return <div className="comment">
      <p>{comment.body}</p>
      <span>- {comment.name}</span>
    </div>
  }

  return <div id="post-wrapper">
    <div id="post">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-content">{post.body}</p>
    </div>

    <div className="section">
      <div className="section-title">
        <h2>Comments ({comments.length})</h2>
      </div>

      <div id="comments">
        {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
      </div>
    </div>

    <div className="section">
      <div className="section-title">
        <h2>Create Comment</h2>
      </div>

      <div id="create-comment">
        <form onSubmit={formik.handleSubmit}>

          <div className="group">
            <span>Name</span>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? <span className="err-text">{formik.errors.name}</span> : null}
          </div>

          <div className="group">
            <span>E-mail</span>
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <span className="err-text">{formik.errors.email}</span> : null}
          </div>

          <div className="group">
            <span>Comment</span>
            <textarea
              type="text"
              name="body"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
            ></textarea>
            {formik.touched.body && formik.errors.body ? <span className="err-text">{formik.errors.body}</span> : null}
            <pre>
              {JSON.stringify(formik, null, 4)}
            </pre>
          </div>

          <div className="group">
            <button type="submit" disabled={formik.isSubmitting}>Send</button>
          </div>

        </form>
      </div>
    </div>

  </div>
}

export default Post