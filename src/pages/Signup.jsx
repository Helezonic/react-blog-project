
import { authserv } from "../appwrite/authServ";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login, logout } from "../app/authSlice";
import { Container, Button, Input} from "../components/index"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Signup () {
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm()
  const [error,setError] = useState("")
  const navigate = useNavigate()

  const signUpForm = async(data) => {
    try {
        setError("")
     /*  //Check whether logged in or session exists
      console.log(status, "check status") 
      if(status === true) dispatch(logout())
      if(await authserv.getUser()){
        const logoutsess = await authserv.logout()
        console.log(logoutsess, "DELETE SESSION RETURN")
      } */
    
      //Then create an account and start a session
      const sess = await authserv.createAccount(data)
      console.log(sess, "SESSION CREATE RETURN")
      if(sess) {
        const userData = await authserv.getUser()
        dispatch(login(userData))
        console.log(userData, "GET USER RETURN")
        navigate("/")
      }
      
    } catch (error) {
      setError(error.message)
    }
  }


  return (
    <> 
      <div>
        <Container title="SIGN UP" className="w-[480px]">
        
        {error && <p className="text-sm font-semibold mb-2 text-red-200 w-fit mx-auto">{error}</p>}
          <form className="flex flex-col gap-2 align-middle p-2" onSubmit={handleSubmit(signUpForm)}>
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

            <Button type="submit" className='bg-green-300'>
              Submit
            </Button>
            
          </form>
        
        </Container>
      </div>
         
    </>
  )
}