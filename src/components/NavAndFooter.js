import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Nav() {
  return (
    <>
    <nav>
    <a href='/Home'>
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
        <Link to="/login" className="subtitle">
            <button className='secondary'>Login</button>
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
            <a href='/Home'>
            <div id="logo" className="subtitle white">
                KitchenBuddy
            </div>
            </a>
            </div>
            <div className="footer-i-i-inner">

            <a href='/about' className='subtitle tdn'>About Us</a>
            <a href='/faqs' className='subtitle tdn'>FAQs</a>
            <a href='/contact' className='subtitle tdn'>Contact Us</a>
            <a href='/login' className='subtitle tdn'>Login</a>
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