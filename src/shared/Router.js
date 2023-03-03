import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Detail from '../pages/Detail'
import Mainpage from '../pages/Mainpage'
import Signup from '../pages/Signup'
import Write from '../pages/Write'

const Router = () => {

    return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
    )
}
export default Router