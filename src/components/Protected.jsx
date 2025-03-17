import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LoaderAnimation from './LoaderAnimation'

export default function Protected({children, authentication}) {
    const authStatus = useSelector((state)=>state.auth.status)
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        //If user is not logged in and authentication is required, redirect to login page
        if(authentication && !authStatus) {
            navigate('/login')
        //If user is logged in and authentication is not required, redirect to home page
        } else if (!authentication && authStatus) {
            navigate('/')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader? <LoaderAnimation /> : <>{children}</>
}
