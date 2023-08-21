import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import "../index.css"

function Nav() {
  return (
    <>
    <nav>
    <a href='/'>
    <div id="logo" className="subtitle white">
        KitchenBuddy
    </div>
    </a>
    <div className='fu-l'>
        <div className='l3'>
            <a href='/about' className='subtitle tdn'>About Us</a>
            <a href='/faqs' className='subtitle tdn'>FAQs</a>
            <a href='/contact' className='subtitle tdn'>Contact Us</a>
        </div>
        <div className='ctamain'>
        <Link to="/signin" className="subtitle">
            <button className='secondary'>Sign in</button>
        </Link>
        
        <Link to="/signup" className="subtitle">
            <button>Register</button>
        </Link>
        </div>
    </div>
    </nav>
    <Outlet />
    <footer>
        <div className="footer-i-1">
            <div className="footer-i-1-inner">
            <a href='/'>
            <div id="logo" className="subtitle white">
                KitchenBuddy
            </div>
            </a>
            </div>
            <div className="footer-i-i-inner">

            <a href='/about' className='subtitle tdn'>About Us</a>
            <a href='/faqs' className='subtitle tdn'>FAQs</a>
            <a href='/contact' className='subtitle tdn'>Contact Us</a>
            <a href='/signin' className='subtitle tdn'>signin</a>
            <a href='/signup' className='subtitle tdn'>Register</a>
            </div>
            <p className='cred'>© 2023 KitchenBuddy. All rights reserved.</p>

        <div>
                
            </div>
            </div>
    </footer>
    </>
  )
}

export default Nav