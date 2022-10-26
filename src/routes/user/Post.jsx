import { useLoaderData } from "react-router-dom"
import { fetchPosts } from "../../services/post.service"
import { fetchComments } from "../../services/comment.service"

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
  console.log({ post, comments })

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

  </div>
}

export default Post