import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [errorMessage, setErrorMessage] = useState()

    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    }

    const register = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, userName, password, confirmPassword
        } = newUser;
        try {
            const res = await axios.post("http://localhost:4000/register", newUser);

            setNewUser({
                firstName: "",
                lastName: "",
                email: "",
                userName: "",
                password: "",
                confirmPassword: ""
            })
            navigate("/login");
        } catch (error) {
            const err = error.response.data.error
            console.log(err)
            let errorArray = [];
            for (let i = 0; i < err.length; i++) {
                errorArray.push(err[i].msg)
                errorArray.join("<br>")
            }
            setErrorMessage(errorArray)
        }

    }






    return (
        <>
            <section className="vh-75 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" >
                                <div className="card-body p-5 ">

                                    <div className="mb-md-5 mt-md-4  text-center">

                                        <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                        <p className="text-white-50 mb-5">Please enter your details!</p>
                                        <form onSubmit={register}>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="sign-in-firstName" name="firstName" placeholder="First Name" onChange={handleChange} className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="sign-in-lastName" name="lastName" placeholder="Last Name" onChange={handleChange} className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="sign-in-email" name="email" placeholder="Email" onChange={handleChange} className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="text" id="sign-in-userName" name="userName" placeholder="Username" onChange={handleChange} className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="sign-in-password" name="password" placeholder="Password" onChange={handleChange} className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="sign-in-password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="form-control form-control-lg" />
                                            </div>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" value="Register">Register</button>
                                        </form>
                                    </div>
                                    {errorMessage ?
                                        <div className="container text-danger text-capitalize pb-5">
                                            {errorMessage.map((errors) => (
                                                <p >{errors}</p>
                                            ))}
                                        </div>
                                        :
                                        null
                                    }
                                    <div>
                                        <p className="mb-0">Already have an account? <a href="/login" className="text-white-50 fw-bold">Log in</a>
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
export default Register;