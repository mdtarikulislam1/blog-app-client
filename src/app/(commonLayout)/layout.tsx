import Navbar from '@/routes/dynamicroute/NavbarWrapper'
import React from 'react'

export default function Commonlayout({children}:{children:React.ReactNode}) {
  return (
    <div>
         <Navbar/>
        {children}
    </div>
  )
}
