import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';//generates an unique id 
import { ToastContainer, toast } from 'react-toastify';//makes toasts
import 'react-toastify/dist/ReactToastify.css';

const manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [isvisible, setisvisible] = useState()
  // const [iscopied, setiscopied] = useState(false)
  const [passwordsArray, setpasswordsArray] = useState([])
  const ref = useRef()

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    let passwordsArray;
    if (passwords) {
      setpasswordsArray(JSON.parse(passwords))
    }
  }, [])

  
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: [e.target.value] })
  }

  //logic to show password
  const showpassword = (params) => {
    //we can use "ref.current.src" same as we use "e.target.src", we have used it in changing copy,tickmark image
    if (ref.current.src == "http://localhost:5173/eye-off.svg") {
      ref.current.src = "http://localhost:5173/eye-on.svg"
      setisvisible(!isvisible)

    } else {
      ref.current.src = "http://localhost:5173/eye-off.svg"
      setisvisible(!isvisible)
    }
  }
  
  //logic to save password
  const savepassword = (params) => {
    if (form.site[0].length > 3) {
      setpasswordsArray([...passwordsArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordsArray, form])
      setform({ site: "", username: "", password: "" })
    }
    else{
      toast('🦄 Length of site should be > 3', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  //logic to copy passwords
  const copytext = (text,e) => {
    console.log(e)
    if(e.target.src=="http://localhost:5173/copy.svg"){
      e.target.src="http://localhost:5173/tickmark.svg"
    }
    toast('🦄 Copied to clipboard', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
    // setiscopied(!iscopied)
  }

  const handleedit = (id) => {
    // console.log(id)
    setform(passwordsArray.filter(item => item.id === id)[0])//codewithharry logic
    //mylogic
    // passwordsArray.filter(item => {item.id === id
    //   setform({ site: item.site, username: item.username, password: item.password })  
    // })
    setpasswordsArray(passwordsArray.filter(item => item.id !== id))
  }

  const handledelete = (id) => {
    // console.log(id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setpasswordsArray(passwordsArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item => item.id !== id)))
    }
    toast('🦄 Password Deleted!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }


  return (
  <>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    {/* for the background template */}
    {/*<div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-indigo-200 bg-[linear-gradient(to_right,#8080800a_1px,transparent_2px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    </div>*/}
    <div className='flex flex-col items-center min-h-screen border'>

      <div className='mt-10'>
        <div className='font-bold text-4xl flex items-center justify-center'>passOP</div>
        <div className='flex justify-center text-lg'>Your own password manager.</div>
      </div>

      <div className=' w-3/4 flex flex-col gap-2 pt-8 bg-slate-700 my-10 rounded-lg'>

        <div className='flex justify-center'>
          <input value={form.site} onChange={handlechange} type="text" name="site" id="idsite" className='border border-slate-600 w-5/6 rounded-lg py-1 px-4 focus:outline-none' placeholder='Enter URL'/>
        </div>
        
        <div className='flex justify-center gap-4'>
          <input value={form.username}  onChange={handlechange} type="text" name="username" id="idusername" className='border border-slate-600 w-2/5 py-1 px-4 rounded-lg focus:outline-none' placeholder='Username'/>
          <div className='relative flex items-center justify-start border bg-white border-slate-600 w-2/5 rounded-lg'>
            <input value={form.password}  onChange={handlechange} type={isvisible?"text":"password"} name="password" id="idpassword" className='h-full w-5/6 px-2 bg-transparent text-black focus:outline-none' placeholder='Password'/>
            <span className='absolute right-2'><img ref={ref} src="/eye-off.svg" alt="" width={25} onClick={showpassword}/></span>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div onClick={savepassword} className='flex justify-center items-center bg-slate-400 w-fit p-1 rounded-xl border-2 border-slate-900 hover:bg-slate-500'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon> 
            <span>Add password</span>
          </div>
        </div>
        <div>
          <h2 className='text-xl text-white font-bold ml-4'>Your Passwords</h2>
          {passwordsArray.length===0&&<div className='text-white text-base ml-4'>No passwords to show :(</div>}

          {passwordsArray.length!=0&&<div>
            <table className="table-auto w-full rounded-lg overflow-hidden">
              <thead className='bg-slate-600 p-1 text-white'>
                <tr>
                  <th className='py-1'>Site</th>
                  <th className='py-1'>Username</th>
                  <th className='py-1'>Password</th>
                  <th className='py-1'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-slate-200'>
                {passwordsArray.map(item=>{
                  return (
                  <tr key={item.id}>
                    <td className='text-center py-1'>
                      <div className='flex gap-4 justify-center py-2'>
                        <a href={item.site} target="_blank">{item.site}</a>
                        <div className='hover:bg-slate-400 p-1 rounded-full'><img src="/copy.svg" alt="" width={20} onClick={(e)=>{copytext(item.site,e)}}/></div>
                        {/* {iscopied?"/tickmark.svg":"/copy.svg"} */}
                      </div>
                    </td>
                    <td className='text-center py-1'>
                      <div className='flex gap-4 justify-center py-2'>
                        <a href={item.site} target="_blank">{item.username}</a>
                        <div className='hover:bg-slate-400 p-1 rounded-full'><img src="/copy.svg" alt="" width={20} onClick={(e)=>{copytext(item.username,e)}}/></div>
                      </div>
                    </td>
                    <td className='text-center py-1'>
                      <div className='flex gap-4 justify-center py-2'>
                        <a href={item.site} target="_blank">{item.password}</a>
                        <div className='hover:bg-slate-400 p-1 rounded-full'><img src="/copy.svg" alt="" width={20} onClick={(e)=>{copytext(item.password,e)}}/></div>
                      </div>
                    </td>
                    <td className='text-center py-1 flex justify-center'>
                      <div className='flex gap-4 justify-center py-2'>
                        <div className='hover:bg-slate-400 p-1 rounded-full'><img src="/edit.svg" alt="" width={20} onClick={()=>{handleedit(item.id)}}/></div>
                        <div className='hover:bg-red-400 p-1 rounded-full'><img src="/delete.svg" alt="" width={20} onClick={()=>{handledelete(item.id)}}/></div>
                      </div>
                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
          </div>}

        </div>
      </div>

    </div>
    </>
  )
}

export default manager
