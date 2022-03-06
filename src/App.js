import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Movie from './components/movie/Movie';
import Home from './components/home/Home';
import {useState} from 'react'
import Nav from './components/nav/Nav';
import SearchPage from './components/search/SearchPage';
import Footer from './components/footer/Footer';

function App() {
  const [search,setSearch] = useState('')
  console.log(search)

  return (
    <>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/movie' element={<Movie/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
