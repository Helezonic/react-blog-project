import { Link, useNavigate } from "react-router-dom";
import { Container, Input, Button } from "../components/index";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authserv } from "../appwrite/authServ";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/authSlice";
import LoaderAnimation from "../components/LoaderAnimation";
import { loading, notloading } from "../app/loadSlice";


export default function Login() {
  const [error,setError] = useState("")
  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  /* const [isLoading, setLoading]  =useState(false) */
  const loadState = useSelector((state) => state.load.status)
  
  
  

  const loginForm = async(data) => {
    try {
      setError("")
      console.log(data)
      dispatch(loading())
      const sess = await authserv.login(data)
      if (sess) {
        const userData = await authserv.getUser()
        dispatch(login(userData))
        console.log("Session Started")
        navigate("/")
        dispatch(notloading())
      }
    } catch (error) {
      dispatch(notloading())
      setError(error.message)
    }
  }
  
  return !loadState? ( 
    <>
      <div>
        <Container title="LOGIN" className="w-[480px]">
          
          {error && <p className="text-sm font-semibold mb-2 text-red-200 w-fit mx-auto">{error}</p>}
          <form className="flex flex-col gap-2 align-middle p-2" onSubmit={handleSubmit(loginForm)}>
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
            
            <Button type="submit" className='bg-green-300' >Login</Button>
          </form>
          <p className="text-white w-fit mx-auto my-2">Don't have an account? Create one - 
            <Link to='/signup'
            className="font-medium transition-all hover:underline hover:text-yellow-400">
             Sign Up</Link>
          </p>
        </Container>
      </div>
    </>
   ) : (
    <LoaderAnimation/>
   )
}

