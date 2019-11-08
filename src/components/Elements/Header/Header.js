import React, { Component } from 'react'
import './Header.css'
import {Link} from 'react-router-dom'


class Header extends Component{
    state = {

    }

    render() {
        return (
            <div className="rmdb-header">
                <div className="rmdb-header-content">
                    <Link to="/">
                        <img className="rmdb-logo" src="./images/reactMovie_logo.png" alt="rmdb Logo" />
                    </Link>
                    <img className="rmdb-tmdb-logo" src="./images/tmdb_logo.png" alt="tmdb Logo" />
                </div>
            </div>
        )
    }
}

export default Header