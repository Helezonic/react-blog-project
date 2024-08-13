
import { authserv } from "../appwrite/authServ";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login, logout } from "../app/authSlice";
import {Container, Button, Input} from "./index"
import { useState } from "react";


export default function Signup () {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.status)
  const {register,handleSubmit} = useForm()
  const [error,setError] = useState("")

  const loginForm = async(data) => {
    try {
        setError("")
      //Check whether logged in or session exists
      console.log(status, "check status") 
      if(status === true) dispatch(logout())
      const logoutsess = await authserv.logout()
      console.log(logoutsess, "DELETE SESSION RETURN")
    
      //Then create an account and start a session
      const sess = await authserv.createAccount(data)
      console.log(sess, "SESSION CREATE RETURN")
      if(sess) {
        const userData = await authserv.getUser()
        dispatch(login(userData))
        console.log(userData, "GET USER RETURN")
      }
      
    } catch (error) {
      setError(error.message)
    }
  }


  return (
    <> 
      <div>
        <Container>
        <h1 className="text-3xl mx-auto w-full p-2 rounded-lg font-bold text-center text-white bg-violet-800">SIGN UP</h1>
        {error && <p className="text-sm font-semibold my-2 text-red-200 w-fit mx-auto">{error}</p>}
          <form className="flex flex-col gap-2 align-middle p-3" onSubmit={handleSubmit(loginForm)}>
            <Input
            label="Email:"
            type='email'
            placeholder= 'Enter email'
            {...register(
              "email",
              {
                required : true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address"
                }
              } 
            )}
            
            />

            <Input
            label="Password:"
            type='password'
            placeholder= 'Enter password'
            {...register(
              "password",
              {required : true} 
            )}
            />

            <Button type="submit" className='bg-green-200'>
              Submit
            </Button>
            
          </form>
        
        </Container>
      </div>
         
    </>
  )
}