import React from "react";
import * as Components from './Components';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import validationSchema from "./validationSchema";
function Auth() {
    const [signIn, toggle] = React.useState(true);

    const [email, setEmail] = useState("");
    const [mobilenumber, setMobilenumber] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        try {
            await validationSchema.validate({
                firstname,
                lastname,
                email,
                mobilenumber
            }, { abortEarly: false });

            const result = await axios.post("http://localhost:5000/user/register", {
                email,
                mobilenumber,
                firstname,
                lastname
            });

            window.localStorage.setItem("userID", result.data._id);
            navigate('/');
        
        } catch (error) {
            if (error.name === 'ValidationError') {
                const newErrors = {};
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            } else {
                console.log(error);
            }
        }
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            await validationSchema.validate({
                email
            }, { abortEarly: false });

            const result = await axios.post("http://localhost:5000/user/login", {
                email
            });

            window.localStorage.setItem("userID", result.data._id);
            navigate('/');
        
        } catch (error) {
            if (error.name === 'ValidationError') {
                const newErrors = {};
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            } else {
                console.log(error);
            }
        }
    }

    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='First Name' onChange={(event) => setFirstname(event.target.value)}/>
                    {errors.firstname && <div style={{ color: 'red' }}>{errors.firstname}</div>}
                    <Components.Input type='text' placeholder='Last Name' onChange={(event) => setLastname(event.target.value)}/>
                    {errors.lastname && <div style={{ color: 'red' }}>{errors.lastname}</div>}
                    <Components.Input type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                    <Components.Input type='mobilenumber' placeholder='Mobile Number' onChange={(event) => setMobilenumber(event.target.value)}/>
                    {errors.mobilenumber && <div style={{ color: 'red' }}>{errors.mobilenumber}</div>}
                    <Components.Button onClick={handleSignupSubmit}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
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
    );
}

export default Auth;
