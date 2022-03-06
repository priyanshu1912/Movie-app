import React from 'react'
import './Nav.css'
import {NavLink} from 'react-router-dom'

function Nav() {
    return (
        <div className='nav'>
            <div className='nav-options'>
                <NavLink activeClassName="active" className='link' to="/">Home</NavLink>
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