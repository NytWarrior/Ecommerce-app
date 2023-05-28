import React from 'react'
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {/* <NavLink className="navbar-brand">Navbar</NavLink> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link className="navbar-brand">🛒 Ecommerce App</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/category' className="nav-link">Category</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/register' className="nav-link">Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/login' className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/cart' className="nav-link">Cart {0}</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header