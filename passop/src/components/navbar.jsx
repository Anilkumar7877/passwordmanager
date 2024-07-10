import React from 'react'

const navbar = () => {
  return (
    <div className='bg-slate-800 flex justify-around items-center h-12'>
      <span className='font-bold text-white text-2xl flex items-center'>passOP</span>
      <ul className='flex gap-8'>
        {/* <li className='hover:font-bold'><a href="/">Home</a></li>
        <li className='hover:font-bold'><a href="/">About</a></li>
        <li className='hover:font-bold'><a href="/">News</a></li>
        <li className='hover:font-bold'><a href="/">Contact</a></li> */}
      </ul>
    </div>
  ) 
}

export default navbar
