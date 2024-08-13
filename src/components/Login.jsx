import { Link } from "react-router-dom";
import Container from "./Container";
import {Input, Button } from "./index";
import { useState } from "react";


function Login() {
  const {error,setError} = useState()
  
  return ( 
    <>
      <div>
        <Container>
          <h1 className="text-3xl mx-auto w-full p-2 rounded-lg font-bold text-center text-white bg-violet-800">LOGIN</h1>
          <form className="flex flex-col gap-2 align-middle p-3">
            <Input
            label="Email:"
            type= "email"
            placeholder="email"/>
            
            <Input
            label="Password:"
            type="password"
            placeholder="password"/>
            <Button type="submit" className='bg-green-200'>Login</Button>
          </form>
          <p className="text-white w-fit mx-auto my-2">Don't have an account? Create one - 
            <Link to='/signup'
            className="font-medium text-primary transition-all duration-200 hover:underline hover:text-blue-800">
             Sign Up</Link>
          </p>
        </Container>
      </div>
    </>
   );
}

export default Login;
