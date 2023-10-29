import { Routes, Route } from 'react-router-dom'

import { Home } from './Home'
import { Register } from './Register'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
