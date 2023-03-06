import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getUser } from '../util/localstorage'
import Login from '../pages/Login'
import Detail from '../pages/Detail'
import Mainpage from '../pages/Mainpage'
import Signup from '../pages/Signup'
import Write from '../pages/Write'
import DetailRecruit from '../pages/DetailRecruit'
import Header from '../pages/Header'
import Recruit from '../pages/Recruit'
import Update from '../pages/Update'

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
          <Route path="/write" element={<Write />} />
          <Route path="/detail/recruit/:id" element={<DetailRecruit />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/update/:id" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
}
export default Router