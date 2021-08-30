import React ,{useRef, useState} from 'react'
import { sendReq } from '../utils/sendReq'
import { DashBoard } from './DashBoard';
export const Login = ({msg})=>{
    const inputUser = useRef('')
    const inputPass = useRef('')
    const [dispMsg, setdispMsg] = useState('') 
    const [user, setUser] = useState({})
                                                                                
    //-----------------------------------------------------------------------------------------------------------------
    function doLogin(){
        const username = inputUser.current.value
        const password = inputPass.current.value
        const reqBody = {"username":username, "password":password}
        const promise = sendReq(process.env.REACT_APP_PREPEND + '/user/login', 'POST', reqBody)


        promise.then((result)=>{
            result.json()
            .then((data)=>{
                console.log(data.message)
                if (data.message.startsWith('Welcome')){
                    setdispMsg(data.message)
                    setUser(data.user)
                }
                else{
                    setdispMsg(data.message)
                }
            })
            .catch((err)=>{
                console.log('INVALID JSON : ', err)
            })
        })
        .catch((err)=>{
            console.log('REQUEST NOT SENT')
        })
    }
    //-----------------------------------------------------------------------------------------------------------------------------------
    if(dispMsg.startsWith('Welcome')){
        return <DashBoard msg={dispMsg} isAdmin={user.isAdmin} user={user}/>
    }
    else{
    return(
        <div style={{margin : '0px 80px'}}>
        <h2 style={{color : 'blue', textDecoration : 'underline'}}>LOGIN </h2>
        <h6 style={{color : 'green'}}>{msg}</h6>
        <h2 style={{color : 'red'}}>{dispMsg}</h2>
        <div className = 'form-group'>
            <label for = 'username'>Username</label>
            <input ref = {inputUser} id = 'username' className = 'form-control'type = 'text' placeholder='Enter your username'/>
        </div>
        <div className = 'form-group'>
            <label for = 'password'>Password</label>
            <input ref = {inputPass} id = 'password' className = 'form-control' type = 'password' placeholder='Enter your password'/>
        </div>
        <div className = 'form-group'>
            <button onClick = {doLogin}className = 'btn btn-success'>LOGIN</button>
        </div> 
        </div>
    )
    }

}