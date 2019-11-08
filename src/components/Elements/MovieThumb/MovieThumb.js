import React from 'react'
import "./MovieThumb.css"
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function MovieThumb(props) {
    
    return (
        <div className="rmdb-moviethumb">
            {props.clickable ?
                <Link to={`/movie/${props.movieId}`}>
                    <img src={props.image} alt="movieThumb" />
                </Link>
                : <img src={props.image} alt="movieThumb" /> }
            
        </div>
    )
}

// creating a object to check propTypes we are getting here
MovieThumb.propTypes = {
    image : PropTypes.string,
    movieId: PropTypes.number,
    movieName: PropTypes.string

}

export default MovieThumb