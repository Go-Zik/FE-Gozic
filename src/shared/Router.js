import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Detail from '../pages/Detail'
import Mainpage from '../pages/Mainpage'
import Signup from '../pages/Signup'

const Router = () => {

    return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
    )
}
export default Router