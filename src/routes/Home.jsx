import { useLoaderData, Link } from "react-router-dom"
import { fetchUsers } from "../services/user.service"

export const loader = async () => {
  const [err, data] = await fetchUsers()

  if (err) return new Error({
    message: 'error',
    details: err.response.data
  })

  return data
}

export default () => {
  const users = useLoaderData()

  const UserItem = ({ user }) => {
    return <Link to={`/user/${user.id}`} className="user">
      <img src={`https://i.pravatar.cc/300?img=${user.id}`} className="avatar" />
      <div className="name">{user.name}</div>
    </Link>
  }

  return <>
    <div id="page-title">
      <div className="container">
        <h1>Homepage</h1>
      </div>
    </div>

    <div id="list-users">
      <div className="container">
        <div className="users">
          {users.map(user => <UserItem key={user.id} user={user} />)}
        </div>
      </div>
    </div>
  </>
}
