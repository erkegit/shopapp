import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='w-full flex justify-between px-4 py-2 bg-black items-center'>
        <Link className='text-white text-2xl font-bold'>BereckeShop <span>Admin</span></Link>
    </header>
  )
}

export default Header