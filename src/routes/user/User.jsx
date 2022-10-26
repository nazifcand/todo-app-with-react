import { Outlet, useLoaderData, useParams, Link } from "react-router-dom"
import { fetchUsers } from "../../services/user.service"
import { fetchTodos } from "../../services/todo.service"
import Modal from "../../components/Modal"
import { useState } from "react"
import classNames from "classnames"

export const loader = async ({ params }) => {
  const [err, results] = await Promise.all([
    fetchUsers({ id: params.userId }),
    fetchTodos({ userId: params.userId }),
  ])
    .then(res => [null, res])
    .catch(err => [err])

  if (err) new Error({
    message: 'error',
    details: err.data.response
  })

  const [userErr, user] = results[0];
  const [todosErr, todos] = results[1];

  return {
    user: user[0],
    todos,
  }
}

const User = () => {
  const { user, todos } = useLoaderData()
  const [previewAvatarModal, setPreviewAvatarModal] = useState(false)
  const { userId } = useParams()

  const TodoItem = ({ todo }) => {
    return <div className={classNames({
      todo: true,
      completed: todo.completed
    })}>{todo.title}</div>
  }

  return <>
    <div id="page-title">
      <div className="container">
        <h1>{user.name}</h1>
      </div>
    </div>

    <div id="user-detail">
      <div className="container">
        <div id="user">

          <div className="sidebar">
            <div className="avatar" onClick={() => setPreviewAvatarModal(true)} >
              <img src={`https://i.pravatar.cc/360?img=${user.id}`} className="image" />
            </div>

            <div className="detail">
              <span>Name: </span>
              <strong>{user.name}</strong>
            </div>

            <div className="detail">
              <span>Username: </span>
              <strong>{user.username}</strong>
            </div>

            <div className="detail">
              <span>E-mail: </span>
              <strong>{user.email}</strong>
            </div>

            <div className="detail">
              <span>Phone: </span>
              <strong>{user.phone}</strong>
            </div>

            <div className="detail">
              <span>Website: </span>
              <strong>{user.website}</strong>
            </div>
          </div>

          <div id="details">
            <Outlet />
          </div>

          <div className="sidebar">
            <div className="section">
              <div className="section-title">
                <h2>Todos ({todos.length})</h2>
              </div>

              <div className="todos">
                {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <Modal title={`${user.name} avatar`} size='small' open={previewAvatarModal} onClose={() => setPreviewAvatarModal(false)}>
      <img src={`https://i.pravatar.cc/360?img=${user.id}`} style={{ width: '100%' }} />
    </Modal>
  </>
}

export default User