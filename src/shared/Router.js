import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getUser } from '../util/localstorage'
import Login from '../pages/Login'
import Detail from '../pages/Detail'
import Mainpage from '../pages/Mainpage'
import Signup from '../pages/Signup'
import Header from '../pages/Header'
import Recruit from '../pages/Recruit'

const Router = () => {
    const userInfo = getUser()
    return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Mainpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/recruit" element={<Recruit />} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
}
export default Router