import React from 'react'
import './Nav.css'
import {Link} from 'react-router-dom'

function Nav() {
    return (
        <div className='nav'>
            <div className='nav-options'>
                <Link className='link' to="/">Home</Link>
                <div>Movies</div>
                <div>TV shows</div>
            </div>

            <div className='nav-profile'>
                <div className='login-button'>Login</div>
                <div className='signup-button'>Signup</div>
            </div>
        </div>
    )
}

export default Nav