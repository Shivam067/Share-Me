import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/Auth'
import { login, logout } from './store/AuthSlicer'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

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
