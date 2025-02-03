import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import "./Navbar.css"; // 确保路径正确
import { LoginSignup } from "../../Pages/LoginSignup";

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制菜单的显示与隐藏

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='navbar'>
             <div className='nav-logo'>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src={logo} alt="CarSearch Logo" />
            <p>CarSearch</p>
        </Link>
        </div>

            {/* 汉堡菜单按钮
            <div className='hamburger-menu' onClick={toggleMenu}>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
            </div> */}

            {/* 导航菜单 */}
            {/* <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                <li onClick={() => { setMenu("shop"); setIsMenuOpen(false); }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>Car</Link>
                    {menu === "shop" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("mens"); setIsMenuOpen(false); }}>
                    <Link to='/mens' style={{ textDecoration: 'none' }}>Bike</Link>
                    {menu === "mens" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("womens"); setIsMenuOpen(false); }}>
                    <Link to='/womens' style={{ textDecoration: 'none' }} >Scooter</Link>
                    {menu === "womens" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("kids"); setIsMenuOpen(false); }}>
                    <Link to='/kids' style={{ textDecoration: 'none' }}>More</Link>
                    {menu === "kids" ? <hr /> : <></>}
                </li>
            </ul> */}

            {/* 登录和购物车 */}
            <div className='nav-login-cart'>
                <Link to='/login' ><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>
                <div className='nav-cart-count'>0</div>
            </div>
        </div>
    );
};