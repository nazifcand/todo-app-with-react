import { Link } from "react-router-dom";

const Header = () => {
  return <header>
    <div className="container">
      <Link to={'/'}>Homepage</Link>
    </div>
  </header>
}

export default Header;