import React from 'react'
import './MovieCard.css'
import {useNavigate} from 'react-router-dom'

function MovieCard(props) {

    const {id,image,name} = props

    const navigate = useNavigate()

    return (
        <div className='movie-card' onClick={() => navigate('/movie',{state: id})}>
            <img src={image} alt='movie-poster' className='movie-card-poster' />
            <div className='movie-card-title'>{name}</div>
        </div>
    )
}

export default MovieCard