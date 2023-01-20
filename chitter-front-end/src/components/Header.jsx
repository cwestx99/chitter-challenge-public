import { Link } from "react-router-dom"
import logo from "../images/logo.png"

const Header = ({ loggedIn, setUser, user }) => {

    const handleLogout = () => {
        setUser({});
        sessionStorage.clear();
    };

    return (
        <>
            <div className="collapseOnSelect navbar-expand-lg bg-dark navbar-dark">



                <nav class="navbar navbar-expand-lg navbar-dark bg-dark  d-flex justify-content-between">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Chitter logo"
                            />
                        </Link>
                    </div>

                    <div className="container text-white text-bold h1 justify-content-center">CHITTER</div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="container collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link" to="/">Home</Link>
                            </li>
                            {!loggedIn &&
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/login">Log in</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/register">Register</Link>
                                    </li>
                                </>
                            }
                            {loggedIn &&
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link" onClick={handleLogout} reloadDocument>Log out</Link>
                                    </li>
                                    <li class="nav-item">
                                        <div className="rounded-circle text-white bg-danger p-2 ms-4">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</div>
                                    </li>
                                </>}

                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Header;