import React, { useState, useContext } from "react";
import { database } from "../../main";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const RegisterAndLogin = () => {
    const [login, setLogin] = useState(false);
    const { setUserEmail } = useContext(UserContext); 
    const history = useNavigate();

    const notifyError = (errorMessage) => {
        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "#252749",
        });
    }

    const handleSubmit = (e, type) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (type === "signup") {
            createUserWithEmailAndPassword(database, email, password)
                .then((data) => {
                    setUserEmail(email); 
                    console.log(data, "authData");
                    history("/");
                })
                .catch((err) => {
                    notifyError(err.code);
                    setLogin(true);
                });
        } else {
            signInWithEmailAndPassword(database, email, password)
                .then((data) => {
                    setUserEmail(email); 
                    console.log(data, "authData");
                    history("/");
                })
                .catch((err) => {
                    notifyError(err.code);
                });
        }
    };

    const handleReset = () => {
        history("/reset");
    }


    return (
        <div className="loginContainer">
            <div className="loginBox">
                <div className="loginSetup">
                    <form className="formDisplay" onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
                        <h1>{login ? "Sign In" : "Register"}</h1>
                        <input name="email" placeholder="Email" />
                        <input name="password" type="password" placeholder="Password" />
                        <p onClick={handleReset}>Forgot Password?</p>
                        <button>{login ? "Sign In" : "Register"}</button>
                        <div className="loginDisplay">
                            <div className='setButton' onClick={() => setLogin(true)}>Sign In</div>
                            <div className='setButton' onClick={() => setLogin(false)}>Register</div>
                        </div>
                    </form>
                    {login ? <img className="imgLogin" src="../../../public/img/LoginImg/Img1Login.PNG" alt="" /> : <img className="imgLogin" src="../../../public/img/LoginImg/img2Login.jpg" alt="" />}
                </div>

            </div>
            <ToastContainer className={"notificationStyle"}/>
        </div>
    );
}
export default RegisterAndLogin;