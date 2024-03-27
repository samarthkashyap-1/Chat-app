import React,{useContext, useEffect} from 'react'
import { Context } from '../Apis/Context'

const Home = () => {
    const { setDataToSend } = useContext(Context);
    useEffect(() => {  
        setDataToSend("Message from home")
    }
    , [])

  return (
    <div>
      This is home
    </div>
  )
}

export default Home
