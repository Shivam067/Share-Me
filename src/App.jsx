import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/Auth.js'
import { login, logout } from './store/AuthSlicer.js'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

import { addAllPosts } from './store/PostSlicer.js'
import databaseService from './Appwrite/Conf.js'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatched = useDispatch()
  useEffect(()=>{
    authService.currentSession()
    .then((res) => {
      if(res){
        dispatched(login(res))
      }
      else{
        dispatched(logout())
      }
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(()=>{
    databaseService.getAllPost()
    .then((res)=>{
      if(res){
        console.log(res.documents)
        dispatched(addAllPosts(res.documents))
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])

    return !isLoading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-[#000000] text-white'>
        <div className='w-full block'>
          <Header />
          <main>
          <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    ) : null
  }

  export default App
