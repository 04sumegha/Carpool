import React from "react";
import * as Components from './Components';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function Auth() {
    const [signIn, toggle] = React.useState(true);

    const [email, setEmail] = useState("");
    const [mobilenumber, setMobilenumber] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const navigate = useNavigate();

    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        try {
        const result = await axios.post("http://localhost:5000/user/register", {
            email,
            mobilenumber,
            firstname,
            lastname
        });

        window.localStorage.setItem("userID", result.data._id);
        navigate('/');
        
        } catch (error) {
        console.log(error);
        }
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
        const result = await axios.post("http://localhost:5000/user/login", {
            email
        });

        window.localStorage.setItem("userID", result.data._id);
        navigate('/');
        
        } catch (error) {
        console.log(error);
        }
    }


     return(
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='First Name' onChange={(event) => setFirstname(event.target.value)}/>
                     <Components.Input type='text' placeholder='Last Name' onChange={(event) => setLastname(event.target.value)}/>
                     <Components.Input type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
                     <Components.Input type='mobilenumber' placeholder='Mobile Number' onChange={(event) => setMobilenumber(event.target.value)}/>
                     <Components.Button onClick={handleSignupSubmit}>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
                      <Components.Button onClick={handleLoginSubmit}>Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
     )
}

export default Auth;