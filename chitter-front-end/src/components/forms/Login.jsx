import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser: setCurrentUser, loggedIn, setLoggedIn }) => {

    const [errorMessage, setErrorMessage] = useState()

    const [loginUser, setLoginUser] = useState({
        userName: "",
        password: ""
    });


    const handleChange = e => {
        const { name, value } = e.target;
        setLoginUser({
            ...loginUser,
            [name]: value
        });
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/login", loginUser);
            setCurrentUser(res.data.user);
            setLoggedIn(res.data.user ? true : false);
            sessionStorage.setItem("user", JSON.stringify(res.data.user))
            setLoginUser({ userName: "", password: "" });
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }
    return (
        <>
            {loggedIn && <Navigate to="/" />}

            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" >
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                        <form onSubmit={login}>
                                            <div className="form-outline form-white mb-4">
                                                <input type="userName" id="sign-in-userName" name="userName" value={loginUser.userName} onChange={handleChange} className="form-control form-control-lg" />

                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="sign-in-password" name="password" value={loginUser.password} onChange={handleChange} className="form-control form-control-lg" />

                                            </div>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" value="Login">Login</button>
                                        </form>
                                        {errorMessage ?
                                            <div className="container text-danger text-capitalize pt-3">
                                                {errorMessage}
                                            </div>
                                            :
                                            null
                                        }
                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;