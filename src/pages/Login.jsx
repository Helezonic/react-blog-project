import { Link, useNavigate } from "react-router-dom";
import { Container, Input, Button } from "../components/index";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authserv } from "../appwrite/authServ";
import { useDispatch } from "react-redux";
import { login } from "../app/authSlice";


export default function Login() {
  const [error,setError] = useState("")
  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginForm = async(data) => {
    try {
      setError("")
      console.log(data)
      const sess = await authserv.login(data)
      if (sess) {
        const userData = await authserv.getUser()
        dispatch(login(userData))
        console.log("Session Started")
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }
  
  return ( 
    <>
      <div>
        <Container>
          <h1 className="text-3xl mx-auto w-full p-2 rounded-lg font-bold text-center text-white bg-violet-800">LOGIN</h1>
          {error && <p className="text-sm font-semibold my-2 text-red-200 w-fit mx-auto">{error}</p>}
          <form className="flex flex-col gap-2 align-middle p-3" onSubmit={handleSubmit(loginForm)}>
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
            {...register(
              "password",
              {required : true} 
            )}
            />
            
            <Button type="submit" className='bg-green-200' >Login</Button>
          </form>
          <p className="text-white w-fit mx-auto my-2">Don't have an account? Create one - 
            <Link to='/signup'
            className="font-medium text-primary transition-all duration-200 hover:underline hover:text-blue-800">
             Sign Up</Link>
          </p>
        </Container>
      </div>
    </>
   )
}

