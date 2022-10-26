import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return <>
    <Header />
    <div className="content">
      <Outlet />
    </div>
    <Footer />
  </>
}

export default Root