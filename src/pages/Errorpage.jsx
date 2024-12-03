
import { Button } from '../components'
import MainText from '../components/MainText'
import { Link } from 'react-router-dom'


export default function Errorpage() {
  return (
    <>
        <MainText>Such post doesn't exist</MainText>
            <div className="w-fit mx-auto">  
           
                <Link to={'/allpost'} >
                    <Button className="w-fit text-yellow-200">
                    Go Back
                    </Button>
                </Link>
                
            </div>
    </>
    
  )
}
