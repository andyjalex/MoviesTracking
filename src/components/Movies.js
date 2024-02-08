import React, {useState} from 'react';

const imagePerRow = 16;

const Movies = ({ movies }) => {
  const [next, setNext] = useState(16);

  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  return (
    <article>
    <section className='movies'>

      {movies?.slice(0,next)?.map((movie) => {
        console.log()
        const { imdbID: id, Poster: poster, Title: title, Year: year} = movie
        const url = movie["Imdb Link"];
        return (
            <div className ="movieContainer">
            <article className="movie">
              <img src={poster === 'N/A' ? url : poster} alt={title} />

            </article>
            <div className='movie-info'>
              <h4>{title}</h4>
              <p>{year}</p>
            </div>
            </div>
        )
      })}

    </section>
    <div className='footer'>
    {next < movies?.length && (
        <button
          className="btn"
          onClick={handleMoreImage}
        >
          Load more
        </button>
      )}
  </div>
  </article>
  );
};

export default Movies;
