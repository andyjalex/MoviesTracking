import React, { useState, useEffect } from 'react'
import Loading from './components/Loading'
import Movies from './components/Movies'
import Search from './components/Search'
import Dropdown from './components/Dropdown'

const url = 'https://raw.githubusercontent.com/almaeconomics/movies_database/main/movies.json'


function App() {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [deDupping, setDeDupping] = useState(true)
  const [deDuppedMovies, setDeDuppedMovies] =useState([])
  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [filteringData, setFilteringData] = useState(true)
  const [allData, setAllData] = useState([])
  const [genreArray, setGenreArray] = useState([])
  const [genre, setGenre ] = useState([])


  const [ genreObject, setGenreObject ] = useState({})

  const filterGenre = () => {
    console.log(genre)
    setFilteringData(true)
    if(genre.length !==0) {


    //simplify to an array
    var genreArray = genre.map((obj) => {
      return obj.value
    })

    console.log(genreArray)

    const newData = filteredData.filter(item => genreArray.includes(item.Genre))
    console.log(newData)

    setFilteredData(newData);
    setFilteringData(false)

  } else {
    setFilteredData(allData);
    setFilteringData(false)
  }





  }


  const filterData = (searchTerm) => {
    setQuery(searchTerm)

    if(!deDupping) {
      const filteredData = deDuppedMovies.filter((item) =>
      item.Title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filteredData);
    setAllData(filteredData)
    setFilteringData(false)

    console.log(genreArray)

    const res = genreArray.map(data => {
      return {label: data, value: data}
    })
    setGenreObject(res)

    }



  }



  const removeDuplicates =  () => {

    let newMovies = movies.filter( (ele, ind) => ind === movies.findIndex( elem => elem.imdbId === ele.imdbId ))
    let newMovies2 = newMovies.filter(movie => typeof movie.Title === 'string')
     setDeDuppedMovies(newMovies2)

     //get genre
     let getuniqueGenres =  (newMovies2) => {
       let unique_values = newMovies2
        .map((item) => item.Genre)
        .filter(
          (value, index, current_value) => current_value.indexOf(value) === index);

       return unique_values;
     }
      console.log(newMovies2)
      let genres = getuniqueGenres(newMovies2)

      console.log(genres)

      setGenreArray(genres)



      //
      //
      //  console.log(tmp)
      //
      // if(tmp.length !== 0) {
      //   console.log(tmp)
      //  let genObject = tmp.reduce((a, v) => ({...a, [v]: v}, {}))
      //  console.log(genObject)
      // }



  }

  const fetchmovies = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const movies = await response.json()

      setLoading(false)
      setMovies(movies)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleGenre = (newGenre) => {
    console.log(newGenre)

    var newData = [...genre];
    var index = newData.indexOf(newGenre)
    if (index !== -1) { //already selected
      newData.splice(index, 1);
      setGenre(newData);
    } else {
      newData.push(newGenre);
      setGenre(newData)
    }

  }

  useEffect(() => {

    filterGenre()

  }, [genre])

  useEffect(() => {
    fetchmovies()
  }, [])

  useEffect(() => {
    if(movies) {

      removeDuplicates()
      console.log('setting deduping')
      setDeDupping(false)
    }
  }, [movies])

  useEffect(() => {

    if(deDuppedMovies.length !==0 ) {
      console.log('filtering' )
    filterData(query)



    }
  },[deDuppedMovies])


  if (filteredData.length === 0 ) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  return (
    <main>
    <div className="title">
      <h2>movie tracking system</h2>
      <div className="underline"></div>
    </div>
    <div className='selections-container'>
      <Search searchTerm={query} filterData={filterData} />

      <Dropdown
        multiple
        label="Select a Genre"
        selected={genre}
        onSelectedChange={handleGenre}
        options={genreObject}
      />
      </div>
      <Movies movies={filteredData} />
    </main>
  )

}

export default App
