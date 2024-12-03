import { Link, useNavigate } from "react-router-dom";
import { Container, Input, Button, LoaderAnimation } from "../components/index";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authserv } from "../appwrite/authServ";
import { login } from "../app/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [error,setError] = useState("")
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)  
  const dispatch = useDispatch()

  const loginForm = async(data) => {
    try {
      setError("")
      setLoading(true)
      console.log("Login Form Data", data)
      const sess = await authserv.login(data)
      if (sess) {
        console.log("Session Started")
        const userData = await authserv.getUser()
        dispatch(login(userData))
        console.log("User Data dispatched to Redux")
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return !isLoading? ( 
    <>
      <div>
        <Container title="LOGIN" className="sm:w-[400px] sm:min-h-[350px] w-[300px] min-h-[350px] ">
          
          {error && <p className="text-sm font-semibold sm:mb-2 mb-1 text-red-200 w-fit mx-auto">{error}</p>}
          <form className="flex flex-col sm:gap-2 gap-1 align-middle p-2" onSubmit={handleSubmit(loginForm)}>
            <Input
            label="Email:"
            type= "email"
            placeholder="email"
            
           {...register("email", {required: true})}
           />
            
            <Input
            label="Password:"
            type="password"
            placeholder="password"
            autoComplete = 'true'
            {...register(
              "password",
              {required : true} 
            )}
            />
            
            <Button type="submit" className='bg-green-300' >Login</Button>
          </form>
          <p className="text-white w-fit mx-auto sm:my-2 my-1 sm:text-md text-sm">Don't have an account? Create one - 
            <Link to='/signup'
            className="font-medium transition-all hover:underline hover:text-yellow-400 ml-1">
             Sign Up</Link>
          </p>
        </Container>
      </div>
    </>
   ) : (
    <LoaderAnimation/>
   )
}

