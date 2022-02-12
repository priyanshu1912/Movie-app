import Raect,{useState,useEffect} from 'react'
import './Home.css'
import axios from 'axios'
import MovieCard from '../movieCard/MovieCard'

function Home(){
    const [latest,setLatest] = useState([])
    const [topRated,setTopRated] = useState(null)
    const [upcoming,setUpcoming] = useState(null)

    useEffect(() => {
        getData()
    },[])

    const getData = () => {
        const latestMoviesUrl = `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_TMDB_KEY}`
        const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}`
        const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}`

        const latestMoviesData = axios.get(latestMoviesUrl)
        const topRatedMoviesData = axios.get(topRatedMoviesUrl)
        const upcomingMoviesData = axios.get(upcomingMoviesUrl)

        axios.all([latestMoviesData,topRatedMoviesData,upcomingMoviesData]).then(
            axios.spread((...allData) => {
                const latestData = allData[0].data
                const topRatedData = allData[1].data.results
                const upcomingData = allData[2].data.results

                setLatest(latestData)
                setTopRated(topRatedData)
                setUpcoming(upcomingData)

                console.log({latestData},{topRatedData},{upcomingData})
            })
        )
        
    }

    return (
        <div className='home-container'>

        <div className='top-rated-container'>
            <h1>Top Rated</h1>
            {
                topRated ?
                <div className='movies-grid-container'>
                    {
                        topRated.slice(0,10).map(item => {

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

        
        <div className='upcoming-container'>
            <h1>Upcoming</h1>
            {
                upcoming ?
                <div className='movies-grid-container'>
                    {
                        upcoming.slice(0,10).map(item => {

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

        </div>
    )
}

export default Home