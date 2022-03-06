import React,{useState,useEffect} from 'react'
import './Home.css'
import axios from 'axios'
import MovieCard from '../movieCard/MovieCard'
import ScaleLoader from "react-spinners/ScaleLoader";

function Home(){
    const [latest,setLatest] = useState([])
    const [popular,setPopular] = useState(null)
    const [topRated,setTopRated] = useState(null)
    const [upcoming,setUpcoming] = useState(null)

    useEffect(() => {
        window.scrollTo(0,0)
        getData()
    },[])

    const getData = () => {
        const latestMoviesUrl = `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_TMDB_KEY}`
        const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}`
        const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}`
        const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}`

        const latestMoviesData = axios.get(latestMoviesUrl)
        const popularMoviesData = axios.get(popularMoviesUrl)
        const topRatedMoviesData = axios.get(topRatedMoviesUrl)
        const upcomingMoviesData = axios.get(upcomingMoviesUrl)

        axios.all([latestMoviesData, popularMoviesData,topRatedMoviesData,upcomingMoviesData]).then(
            axios.spread((...allData) => {
                const latestData = allData[0].data
                const popularData = allData[1].data.results
                const topRatedData = allData[2].data.results
                const upcomingData = allData[3].data.results

                setLatest(latestData)
                setPopular(popularData)
                setTopRated(topRatedData)
                setUpcoming(upcomingData)

                console.log({latestData}, {popularData},{topRatedData},{upcomingData})
            })
        )
        
    }


    const [searchInput,setSearchInput] = useState('')

    const [search,setSearch] = useState(null)

    const searchMovie = (e) => {
        e.preventDefault()

        let searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${searchInput}`
        
        axios.get(searchMovieUrl)
        .then(res => {
            console.log(res.data.results)
            setSearch(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })

    }

    return (
        <div className='home-container'>

        <div style={{
            backgroundImage:'url("https://image.tmdb.org/t/p/w500/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
        }}>
            <div className='search-container'>
                <div className='search-welcome'>Welcome</div>
                <div className='search-text'>Explore millions of movies, tv shows and more</div>

                <form onSubmit={searchMovie}>       
                    <input onChange={e => setSearchInput(e.target.value)} className='search-input' type='text' placeholder='Search for movie, tv show....'/>
                </form>    
            </div>
        </div>


        {

            search ?


            <div className='movies-container'>
                {
                    popular ?
                    <div className='movies-grid-container'>
                        {
                            search.slice(0,12).map(item => {

                                let id = item.id
                                let image = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                                let name = item.title

                                return (
                                    <MovieCard id={id} image={image} name={name} />
                                )
                            })
                        }
                    </div>
                    :
                    null
                }
            </div>


            :


            <>
            <div className='movies-container'>
                <div className='heading'>Popular</div>
                {
                    popular ?
                    <div className='movies-grid-container'>
                        {
                            popular.slice(0,12).map(item => {

                                let id = item.id
                                let image = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                                let name = item.title

                                return (
                                    <MovieCard id={id} image={image} name={name} />
                                )
                            })
                        }
                    </div>
                    :
                    <div className='loader-container'>
                        <ScaleLoader className='loader'/>
                    </div>
                }
            </div>


            <div className='movies-container'>
                <div className='heading'>Top Rated</div>
                {
                    topRated ?
                    <div className='movies-grid-container'>
                        {
                            topRated.slice(0,12).map(item => {

                                let id = item.id
                                let image = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                                let name = item.title

                                return (
                                    <MovieCard id={id} image={image} name={name} />
                                )
                            })
                        }
                    </div>
                    :
                    <div className='loader-container'>
                        <ScaleLoader className='loader'/>
                    </div>
                }
            </div>

            
            <div className='movies-container'>
                <div className='heading'>Upcoming</div>
                {
                    upcoming ?
                    <div className='movies-grid-container'>
                        {
                            upcoming.slice(0,12).map(item => {

                                let id = item.id
                                let image = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                                let name = item.title

                                return (
                                    <MovieCard id={id} image={image} name={name} />
                                )
                            })
                        }
                    </div>
                    :
                    <div className='loader-container'>
                        <ScaleLoader className='loader'/>
                    </div>
                }
            </div>
            </>
        }

        </div>
    )
}

export default Home