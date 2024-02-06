
import { FunctionComponent } from 'react'
import Header from "./Header"
import LogOut from "./LogOut"

const loginOutfun:FunctionComponent<{auth:number}> = ({auth}) => {

    if(auth==0){
        return(<Header/>)   
    }
    else if(auth==1){
        return<LogOut/>
    }
  return (
    <div>
       
    </div>
  )
}

export default loginOutfun
