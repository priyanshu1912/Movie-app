import axios from "axios"
import React,{useState,useEffect} from "react"
import {useLocation} from 'react-router-dom'
import MovieCard from "../movieCard/MovieCard"
import './Movie.css'
import {BiTime,BiCalendarAlt} from 'react-icons/bi'
import {GoLocation} from 'react-icons/go'

function Movie(){
    const [details,setDetails] = useState(null)
    const [credits,setCredits] = useState(null)
    const [similar,setSimilar] = useState(null)

    const location = useLocation()
    const id = location.state

    useEffect(()=>{
        getDetails()
    },[])

    const getDetails = () => {

        let detailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        let creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
        let similarUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}`

        const detail = axios.get(detailUrl)
        const credit = axios.get(creditsUrl)
        const similar = axios.get(similarUrl)

        axios.all([detail,credit,similar]).then(
            axios.spread((...allData) => {
                const detailData = allData[0].data
                const creditData = allData[1].data
                const similarData = allData[2].data.results

                console.log({detailData},{creditData},{similarData})
                setDetails(detailData)
                setCredits(creditData)
                setSimilar(similarData)
            })
        )
    }

    return (
        <div className="movie-container">

            <div className="details">
                <div className="details-container">
                {
                    details &&
                    <>
                    <div className="movie-overview-container">
                        <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} className="movie-overview-poster"/>
                        <div className="movie-overview-info">
                            <div className="movie-overview-title">{details.title}</div>
                            <div className="movie-overview-overview">{details.overview}</div>
                            <div className="movie-overview-genres">
                                {
                                    details.genres.map(item => {
                                        return (
                                            <div key={item.id} className='movie-overview-genres-item'>
                                                {item.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className="movie-overview-ratings">{details.vote_average} Ratings</div>

                            <div className="movie-overview-date">
                                <BiCalendarAlt className="movie-overview-icons"/> 
                                <div>{details.release_date}</div>
                            </div>

                            <div className="movie-overview-date">
                                <BiTime className="movie-overview-icons"/> 
                                <div>{details.runtime}m</div>
                            </div>

                            <div className="movie-overview-date">
                                <GoLocation className="movie-overview-icons"/> 
                                {
                                    details.production_countries.map(item => {
                                        return (
                                            <span key={item.name}> {item.name}</span>
                                        ) 
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    </>
                }
                </div>
            </div>


            <div className="casts-container">
                <h1>Top Casts</h1>
                {
                    credits &&
                    <div className="cast-grid">
                    {
                        credits.cast.slice(0,8).map(item => {

                            let image = `https://image.tmdb.org/t/p/w500/${item.profile_path}`

                            return (
                                <div key={item.id} className="movie-cast">
                                    <img src={image} alt='cast-image' className="movie-cast-image" />
                                    <div>
                                        <div className="movie-cast-name">{item.name}</div>
                                        <div className="movie-cast-character">as {item.character}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                }
            </div>


            <div className="similar-container">
                <h1>You may also like</h1>
                {
                    similar &&
                    <div className="similar-movies-grid">
                        {
                            similar.slice(0,12).map(item => {
                                let id = item.id
                                let image = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                                let name = item.title

                                return (
                                    <MovieCard id={id} image={image} name={name} />
                                )
                            })
                        }
                    </div>
                }
            </div>

        </div>
    )
}

export default Movie