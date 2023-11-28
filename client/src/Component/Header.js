import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () =>{

    const user = localStorage.getItem('user');
    const parseData = JSON.parse(user)

    const navigate = useNavigate()

    const logoutSubmit = ()=>{
        localStorage.setItem('login', '')
        localStorage.setItem('loginStatus', 'Logged out successfully!')
        navigate('/');
    }

    return(
        <>
            <nav className='navbar navbar-expand-lg border-bottom border-body'>
                <div className='container'>
                    <Link className='navbar-brand' to='/home'>Employees</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' aria-current='page' to='/home'>Home</NavLink>
                            </li>

                            {
                                !parseData ? (
                                    <>
                                    </>
                                ) : 
                                (
                                    <>
                                        <li className='nav-item'>
                                            <NavLink className='nav-link' to='employee/list'>List</NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink className='nav-link' to='employee/create'>Add Employee</NavLink>
                                        </li>
                                    </>
                                )
                            }

                            
                        </ul>
                        {
                            !parseData ? (
                                <>
                                </>
                            ) : 
                            (
                                <>
                                <ul className='nav justify-content-end'>
                                    <button className='btn btn-outline-primary' type='submit' onClick={logoutSubmit}>Logout</button>
                                </ul>
                                </>
                            )
                        }
                        
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header