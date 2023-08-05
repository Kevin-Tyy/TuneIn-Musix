import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div>
      hello world
      <Outlet/>
    </div>
  )
}

export default HomeLayout