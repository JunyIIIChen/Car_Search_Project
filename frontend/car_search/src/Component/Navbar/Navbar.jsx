import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import "./Navbar.css"; 

export const Navbar = () => {

    return (
        // logo
        <div className='navbar'>
             <div className='nav-logo'>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src={logo} alt="CarSearch Logo" />
            <p>CarSearch</p>
        </Link>
        </div>

            {/* login and cart */}
            <div className='nav-login-cart'>
                <Link to='/login' ><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>
                <div className='nav-cart-count'>0</div>
            </div>
        </div>
    );
};