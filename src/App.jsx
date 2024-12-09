import { useState } from 'react'
import Header from './Components/Header'
import{Routes , Route} from "react-router"
import Login from './Components/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes >
            <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  )
}

export default App
