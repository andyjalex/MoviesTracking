import React, { useState } from 'react'

const Search = ({ searchTerm, filterData}) => {
  //const [searchTerm, setSearchTerm] = useState('');


  const handleInputChange = (event) => {
    const { value } = event.target;
    //setSearchTerm(value);
    console.log(value)
    filterData(value);
  };



  return (
    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className='form-input'
        placeholder="search..."
        value={searchTerm}
        onChange={handleInputChange}
        />
    </form>
  )

}

export default Search;
