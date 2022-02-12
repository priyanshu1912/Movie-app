import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Movie from './components/movie/Movie';
import Home from './components/home/Home';
import {useState} from 'react'
import Nav from './components/nav/Nav';
import SearchPage from './components/search/SearchPage';

function App() {
  const [search,setSearch] = useState('')
  console.log(search)

  return (
    <>
      {/* <Nav/> */}

      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/search' element={<SearchPage/>}/>
            <Route path='/movie' element={<Movie/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
