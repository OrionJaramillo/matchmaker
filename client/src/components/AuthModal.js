import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"


const AuthModal = ({ setShowModal, isSignUp }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    //set variable navigate so that we may use it below in our form submission function
    let navigate = useNavigate()

    //show form 
    const handleClick = () => {
        setShowModal(false)
    }

    //form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            //pasword matching check
            if( isSignUp && (password !== confirmPassword)) {
                setError("Passwords need to match")
                return 
            }

            //variable to the post of email and password
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup': 'login'}`, { email, password })
        
            //set cookies for future authentication
            //setCookie("Email", response.data.email)
            setCookie("UserId", response.data.userId)
            setCookie("AuthToken", response.data.token)

            //if post was successful send the user to the authentication page
            const success = response.status === 201
            if(success && isSignUp) navigate('/onboarding')
            if(success && !isSignUp) navigate('/dashboard')

            //refresh the page on submit
            window.location.reload()
        
        } catch (error){
            console.log(error)
        }
    }



    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>⨂</div>
            <h2>{isSignUp? 'CREATE ACCOUNT': 'LOG IN'}</h2>
            <p>By clicking Log In, you agree to our Terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="email" 
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="password" 
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input 
                    type="password" 
                    id="password-check" 
                    name="password-check" 
                    placeholder="confirm password" 
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p className="error">{error}</p>
            </form>
            <hr/>
            <h2>GET THE APP</h2>
            
        </div>
    )
}

export default AuthModal